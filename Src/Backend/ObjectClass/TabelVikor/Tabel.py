from flask import Flask, render_template, Blueprint
from flask import jsonify, request
from flask_jwt_extended import create_access_token
from ..TabelVikor.TabelDB import TabelVikor
from ..HitungVIKOR.CobaVikorDB import CobaHitungVIKOR
from ..run import db, jwt, bcrypt
import numpy as np
import pandas as pd
import json
from collections import defaultdict
flate = defaultdict(list)

tabel = Blueprint('tabel',__name__)

# Read kelayakan isi
@tabel.route('/kelayakan_isi_data', methods=['GET'])
def get_kelayakan_isi_data():
    cur = db.connection.cursor()
    cur.execute("SELECT id_buku, kelayakan_isi FROM tbl_nilai_buku")
    rv = cur.fetchall()
    return jsonify(rv)

# Read penyajian
@tabel.route('/penyajian_isi_data', methods=['GET'])
def get_penyajian_isi_data():
    cur = db.connection.cursor()
    cur.execute("SELECT id_buku, penyajian FROM tbl_nilai_buku")
    rv = cur.fetchall()
    return jsonify(rv)

# Read kebahasaan
@tabel.route('/kebahasaan_isi_data', methods=['GET'])
def get_kebahasaan_isi_data():
    cur = db.connection.cursor()
    cur.execute("SELECT id_buku, kebahasaan FROM tbl_nilai_buku")
    rv = cur.fetchall()
    return jsonify(rv)

# Read kegrafikaan
@tabel.route('/kegrafikaan_isi_data', methods=['GET'])
def get_kegrafikaan_isi_data():
    cur = db.connection.cursor()
    cur.execute("SELECT id_buku, kegrafikaan FROM tbl_nilai_buku")
    rv = cur.fetchall()
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

# Read Tabel Ranking
@tabel.route('/normalisasi', methods=['GET'])
def get_normalisasi():
    ObjekVikor = TabelVikor()
    alternatif = ObjekVikor.data_IdBuku()
    kriteria = ObjekVikor.data_Kriteria()
    tipe_kriteria = ObjekVikor.data_TipeKriteria()
    bobot_kriteria = ObjekVikor.data_Bobot()
    matriks_keputusan = ObjekVikor.data_matriks_keputusan()

    nilai_maksimum = []
    nilai_minimum = []
    for i in range(len(kriteria)):
        nilai_maksimum.append(0)
        nilai_minimum.append(0)
        for j in range(len(alternatif)):
            if ((j == 0) or (nilai_maksimum[i] < matriks_keputusan[j][i])):
                nilai_maksimum[i] = matriks_keputusan[j][i]
            if ((j == 0) or (nilai_minimum[i] > matriks_keputusan[j][i])):
                nilai_minimum[i] = matriks_keputusan[j][i]

    # Matriks Normalisasi
    matriks_normalisasi = []
    for i in range(len(alternatif)):
        matriks_normalisasi.append([])
        for j in range(len(kriteria)):
            matriks_normalisasi[i].append(0)
            if tipe_kriteria[j] == "cost":
                matriks_normalisasi[i][j] = (matriks_keputusan[i][j] - nilai_minimum[j]) / (
                            nilai_maksimum[j] - nilai_minimum[j])
            elif tipe_kriteria[j] == "benefit":  # tipe_kriteria[j] == "benefit":
                matriks_normalisasi[i][j] = (nilai_maksimum[j] - matriks_keputusan[i][j]) / (
                            nilai_maksimum[j] - nilai_minimum[j])

    result = \
        {
            'normalisasi': matriks_normalisasi
        }

    a = pd.DataFrame(result)
    js = json.loads(a.to_json())
    for k, v in js.items():
        for r, i in v.items():
            for c in range(len(i)):
                new_column = "{}_{}".format(k, c + 1)
                # print(new_column)
                flate[new_column].append(i[c])

    df2 = pd.DataFrame(data=flate)
    # df3 = json.loads(df2.to_json())
    df3 = "tes"

    # return jsonify(rv)
    return jsonify(df3)