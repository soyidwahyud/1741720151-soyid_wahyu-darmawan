from flask import Flask, render_template, Blueprint
from flask import jsonify, request
from flask_jwt_extended import create_access_token
from ..TabelVikor.TabelDB import TabelVikor
from ..HitungVIKOR.CobaVikorDB import CobaHitungVIKOR
from ..run import db, jwt, bcrypt
import numpy as np

tabel = Blueprint('tabel',__name__)

# Read kelayakan isi
@tabel.route('/kelayakan_isi_data', methods=['GET'])
def get_kelayakan_isi_data():
    cur = db.connection.cursor()
    cur.execute("SELECT id_buku, kelayakan_isi FROM tbl_nilai_buku")
    rv = cur.fetchall()
    return jsonify(rv)

# Read Test
@tabel.route('/test', methods=['GET'])
def get_test():
    kelayakan_isi = request.get_json()['kelayakan_isi']
    kebahasaan = request.get_json()['kebahasaan']
    penyajian = request.get_json()['penyajian']
    kegrafikaan = request.get_json()['kegrafikaan']
    cur = db.connection.cursor()
    cur.execute("SELECT * FROM tbl_nilai_buku ORDER BY id_nilai_buku ASC ")
    if(cur.rowcount > 0):
        rv = cur.fetchall()
        # for tes in rv:
            # if kelayakan_isi == 10:



    return jsonify(rv)

# Read Nilai Maks
@tabel.route('/nilai_maks', methods=['GET'])
def get_nilai_maks():
    cur = db.connection.cursor()
    cur.execute("SELECT MAX(kelayakan_isi) as kelayakan_isi, MAX(kebahasaan) as kebahasaan, MAX(penyajian) as penyajian, MAX(kegrafikaan) as kegrafikaan "
                " FROM tbl_nilai_buku Order BY id_buku")
    rv = cur.fetchall()
    return jsonify(rv)

# Read Nilai Min
@tabel.route('/nilai_min', methods=['GET'])
def get_nilai_min():
    cur = db.connection.cursor()
    cur.execute("SELECT MIN(kelayakan_isi) as kelayakan_isi, MIN(kebahasaan) as kebahasaan, MIN(penyajian) as penyajian, MIN(kegrafikaan) as kegrafikaan "
                " FROM tbl_nilai_buku Order BY id_buku")
    rv = cur.fetchall()
    return jsonify(rv)

# Read Tabel Ranking
@tabel.route('/tabel_ranking', methods=['GET'])
def get_tabel_ranking():
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
    cur.execute("SELECT (id_buku) as ranking, kode_buku, nama_buku "
                "FROM tbl_buku as b "
                "WHERE id_buku in (" + res + ") "
                "ORDER BY FIELD(id_buku," + res + ")")
    rv = cur.fetchall()
    return jsonify(rv)

# Read Vikor (bismillah)
@tabel.route('/tes_kelayakan', methods=['GET'])
def get_tabel():
    TabelDB = TabelVikor()
    kriteria_1 = TabelDB.data_kelayakan()

    maks_kelayakan = max(kriteria_1)
    min_kelayakan = min(kriteria_1)

    # normalisasi_kelayakan_isi = (np.array(maks_kelayakan) - np.array(kriteria_1)) / (np.array(maks_kelayakan) - np.array(min_kelayakan))
    normalisasi_kelayakan_isi = (np.array(maks_kelayakan) - kriteria_1) / (np.array(maks_kelayakan) - np.array(min_kelayakan))

    data1 = [str(int) for int in maks_kelayakan]
    res1 = ",".join(data1)

    data2 = [str(int) for int in min_kelayakan]
    res2 = ",".join(data2)

    data3 = [str(int) for int in normalisasi_kelayakan_isi]
    res3 = ",".join(data3)


    result = \
        {
            'kelayakan_isi': res3
        }

    # return jsonify(result)
    return jsonify({"result" : result})
