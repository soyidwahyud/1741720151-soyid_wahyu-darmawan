import json

from flask import Flask, render_template
from flask import jsonify, request
from flask import Blueprint, abort
from flask_mysqldb import MySQL
from flask_cors import CORS
from ..Config import Config as cfg
from ..run import db
from ..HitungVIKOR.CobaVikorDB import CobaHitungVIKOR
import numpy as np

vikor = Blueprint('vikor',__name__)

# Read nilai buku data
@vikor.route('/id_buku_data', methods=['GET'])
def get_id_buku_data():
    cur = db.connection.cursor()
    cur.execute("SELECT * FROM tbl_nilai_buku")
    rv = cur.fetchall()
    return jsonify(rv)

# Read bobot
@vikor.route('/bobot_data', methods=['GET'])
def get_bobot_data():
    cur = db.connection.cursor()
    cur.execute("SELECT bobot FROM tbl_kriteria")
    rv = cur.fetchall()
    return jsonify(rv)

# Read nama kriteria
@vikor.route('/kriteria_data', methods=['GET'])
def get_kriteria_data():
    cur = db.connection.cursor()
    cur.execute("SELECT nama_kriteria FROM tbl_kriteria")
    rv = cur.fetchall()
    return jsonify(rv)

# Read tipe kriteria
@vikor.route('/tipe_kriteria_data', methods=['GET'])
def get_tipe_kriteria_data():
    cur = db.connection.cursor()
    cur.execute("SELECT tipe_kriteria FROM tbl_kriteria")
    rv = cur.fetchall()
    return jsonify(rv)

# Read kode kriteria
@vikor.route('/kode_kriteria_data', methods=['GET'])
def get_kode_kriteria_data():
    cur = db.connection.cursor()
    cur.execute("SELECT kode FROM tbl_kriteria")
    rv = cur.fetchall()
    return jsonify(rv)

# Read matriks keputusan
@vikor.route('/matriks_keputusan', methods=['GET'])
def get_matriks_keputusan():
    cur = db.connection.cursor()
    # cur.execute("SELECT id_buku, kelayakan_isi, kebahasaan, penyajian, kegrafikaan FROM tbl_nilai_buku")
    cur.execute("SELECT id_buku, AVG(kelayakan_isi) as kelayakan_isi, "
                "AVG(kebahasaan) as kebahasaan, "
                "AVG(penyajian) as penyajian, "
                "AVG(kegrafikaan) as kegrafikaan "
                "FROM tbl_nilai_buku GROUP BY id_buku")
    rv = cur.fetchall()
    return jsonify(rv)


# Read kebahasaan
@vikor.route('/kebahasaan_data', methods=['GET'])
def get_kebahasaan_data():
    cur = db.connection.cursor()
    cur.execute("SELECT kebahasaan FROM tbl_nilai_buku")
    rv = cur.fetchall()
    return jsonify(rv)

# Read penyajian
@vikor.route('/penyajian_data', methods=['GET'])
def get_penyajian_data():
    cur = db.connection.cursor()
    cur.execute("SELECT penyajian FROM tbl_nilai_buku")
    rv = cur.fetchall()
    return jsonify(rv)

# Read kegrafikaan
@vikor.route('/kegrafikaan_data', methods=['GET'])
def get_kegrafikaan_data():
    cur = db.connection.cursor()
    cur.execute("SELECT kegrafikaan FROM tbl_nilai_buku")
    rv = cur.fetchall()
    return jsonify(rv)

# Read nilai
@vikor.route('/all_nilai_data', methods=['GET'])
def get_all_nilai_data():
    cur = db.connection.cursor()
    # cur.execute("SELECT kelayakan_isi, kebahasaan, penyajian, kegrafikaan FROM tbl_nilai_buku order by id_buku")
    cur.execute("SELECT id_buku, concat(kelayakan_isi,',', kebahasaan,',',penyajian,',',kegrafikaan) as dataset FROM tbl_nilai_buku ORDER BY id_buku")
    rv = cur.fetchall()
    return jsonify(rv)

# Read Vikor (bismillah)
@vikor.route('/buku_vikor', methods=['GET'])
def get_buku_vikor_data():
    try:
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
        cur.execute(
            "SELECT id_buku, kode_buku, nama_buku, jenis_buku, tenaga_kesehatan, nama_penerbit, tahun_terbit, nama_penulis, gambar, userfile  "
            "FROM tbl_buku as b "
            "INNER JOIN tbl_jenis as j "
            "on b.id_jenis = j.id_jenis "
            "INNER JOIN tbl_nakes as n "
            "on b.id_nakes = n.id_nakes "
            "INNER JOIN tbl_penerbit as p1 "
            "on b.id_penerbit = p1.id_penerbit "
            "INNER JOIN tbl_penulis as p2 "
            "on b.id_penulis = p2.id_penulis  WHERE id_buku in (" + res + ") ORDER BY FIELD(id_buku," + res + ")")

        db.connection.commit()

        rv = cur.fetchall()
        return jsonify(rv)
        # return jsonify({'message': 'data pada '+ arrayData +' ada'})

    except:
        cur = db.connection.cursor()
        cur.execute(
            "SELECT id_buku, kode_buku, nama_buku, jenis_buku, tenaga_kesehatan, nama_penerbit, tahun_terbit, nama_penulis, gambar, userfile  "
            "FROM tbl_buku as b "
            "INNER JOIN tbl_jenis as j "
            "on b.id_jenis = j.id_jenis "
            "INNER JOIN tbl_nakes as n "
            "on b.id_nakes = n.id_nakes "
            "INNER JOIN tbl_penerbit as p1 "
            "on b.id_penerbit = p1.id_penerbit "
            "INNER JOIN tbl_penulis as p2 "
            "on b.id_penulis = p2.id_penulis  ")

        db.connection.commit()

        rv = cur.fetchall()
        return jsonify(rv)
# Read Vikor (bismillah)
@vikor.route('/buku_vikor2', methods=['GET'])
def get_buku_vikor_data2():
    try:
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
        cur.execute(
            "SELECT id_buku, kode_buku, nama_buku, jenis_buku, tenaga_kesehatan, nama_penerbit, tahun_terbit, nama_penulis, gambar, userfile  "
            "FROM tbl_buku as b "
            "INNER JOIN tbl_jenis as j "
            "on b.id_jenis = j.id_jenis "
            "INNER JOIN tbl_nakes as n "
            "on b.id_nakes = n.id_nakes "
            "INNER JOIN tbl_penerbit as p1 "
            "on b.id_penerbit = p1.id_penerbit "
            "INNER JOIN tbl_penulis as p2 "
            "on b.id_penulis = p2.id_penulis  WHERE id_buku in (" + res + ") ORDER BY FIELD(id_buku," + res + ")")

        db.connection.commit()

        rv = cur.fetchall()
        return jsonify(rv)
        # return jsonify({'message': 'data pada '+ arrayData +' ada'})

    except:
        cur = db.connection.cursor()
        cur.execute(
            "SELECT id_buku, kode_buku, nama_buku, jenis_buku, tenaga_kesehatan, nama_penerbit, tahun_terbit, nama_penulis, gambar, userfile  "
            "FROM tbl_buku as b "
            "INNER JOIN tbl_jenis as j "
            "on b.id_jenis = j.id_jenis "
            "INNER JOIN tbl_nakes as n "
            "on b.id_nakes = n.id_nakes "
            "INNER JOIN tbl_penerbit as p1 "
            "on b.id_penerbit = p1.id_penerbit "
            "INNER JOIN tbl_penulis as p2 "
            "on b.id_penulis = p2.id_penulis  ")

        db.connection.commit()

        rv = cur.fetchall()
        return jsonify(rv)
        # return jsonify({'message': 'data tidak ada'})



# @vikor.errorhandler(500)
# def custom500():
#     return jsonify({'message': 'test error'})
