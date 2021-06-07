from flask import Flask, render_template, Blueprint
from flask import jsonify, request
from flask_jwt_extended import create_access_token
from ..run import db, jwt, bcrypt
from ..HitungVIKOR.CobaVikorDB import CobaHitungVIKOR

grafik = Blueprint('grafik',__name__)

# Grafik matriks keputusan
@grafik.route('/grafik_rata_rata', methods=['GET'])
def get_grafik_matriks_keputusan():
    cur = db.connection.cursor()
    # cur.execute("SELECT id_buku, kelayakan_isi, kebahasaan, penyajian, kegrafikaan FROM tbl_nilai_buku")
    cur.execute("SELECT id_buku, AVG(kelayakan_isi) as kelayakan_isi, "
                "AVG(kebahasaan) as kebahasaan, "
                "AVG(penyajian) as penyajian, "
                "AVG(kegrafikaan) as kegrafikaan "
                "FROM tbl_nilai_buku GROUP BY id_buku")
    rv = cur.fetchall()
    return jsonify(rv)

# Grafik Bobot Kriteria
@grafik.route('/grafik_bobot_kriteria', methods=['GET'])
def get_grafik_bobot_kriteria():
    cur = db.connection.cursor()
    cur.execute("SELECT id_kriteria, nama_kriteria, bobot FROM tbl_kriteria")
    rv = cur.fetchall()
    return jsonify(rv)

# Grafik Total Buku
@grafik.route('/grafik_total_buku', methods=['GET'])
def get_grafik_total_buku():
    cur = db.connection.cursor()
    cur.execute("SELECT COUNT(id_buku) as total, tenaga_kesehatan "
                "FROM tbl_buku as b "
                "INNER JOIN tbl_nakes as n "
                "ON b.id_nakes = n.id_nakes "
                "GROUP BY tenaga_kesehatan")
    rv = cur.fetchall()
    return jsonify(rv)

# Grafik Total Nilai Buku
@grafik.route('/grafik_nilai_buku', methods=['GET'])
def get_grafik_nilai_buku():
    cur = db.connection.cursor()
    # cur.execute("SELECT COUNT(id_nilai_buku) as total, id_buku FROM tbl_nilai_buku GROUP BY id_buku")
    cur.execute("SELECT COUNT(id_user) as total, kode_buku "
                "FROM tbl_nilai_buku as nb "
                "INNER JOIN tbl_buku as b "
                "ON nb.id_buku = b.id_buku "
                "GROUP BY kode_buku")
    rv = cur.fetchall()
    return jsonify(rv)


# Grafik Ranking
@grafik.route('/grafik_ranking_buku', methods=['GET'])
def get_grafik_ranking_buku():
    ObjekVikor = CobaHitungVIKOR()
    alternatif = ObjekVikor.data_IdBuku()
    kriteria = ObjekVikor.data_Kriteria()
    tipe_kriteria = ObjekVikor.data_TipeKriteria()
    bobot_kriteria = ObjekVikor.data_Bobot()
    matriks_keputusan = ObjekVikor.data_matriks_keputusan()

    arrayData = ObjekVikor.hitung_vikor(alternatif, kriteria, tipe_kriteria, bobot_kriteria, matriks_keputusan)
    data = [str(int) for int in arrayData]
    res = ",".join(data)

    cur = db.connection.cursor()
    # cur.execute("SELECT (id_buku) as ranking, kode_buku, "
    #             "FROM tbl_buku as b "
    #             "WHERE id_buku in (" + res + ") "
    #             "ORDER BY FIELD(id_buku," + res + ")")
    cur.execute("SELECT (id_buku) as ranking, kode_buku "
                "FROM tbl_buku as b "
                "WHERE id_buku in (" + res + ") "
                                             "ORDER BY FIELD(id_buku," + res + ")")
    rv = cur.fetchall()
    return jsonify(rv)

