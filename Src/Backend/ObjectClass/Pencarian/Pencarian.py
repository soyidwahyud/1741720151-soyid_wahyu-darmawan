from flask import Flask, render_template, Blueprint
from flask import jsonify, request
from flask_jwt_extended import create_access_token
from ..run import db, jwt, bcrypt

cari = Blueprint('cari', __name__)


# cari buku
@cari.route('/cari_buku', methods=["POST", "GET"])
def cari_buku():
    if request.method == 'POST':
        cur = db.connection.cursor()
        form = request.form
        kode_buku = form['kode_buku']
        nama_buku = form['nama_buku']
        jenis_buku = form['jenis_buku']
        tenaga_kesehatan = form['tenaga_kesehatan']
        nama_penerbit = form['nama_penerbit']
        tahun_terbit = form['tahun_terbit']
        nama_penulis = form['nama_penulis']

        cur.execute("SELECT kode_buku, nama_buku, jenis_buku, tenaga_kesehatan, nama_penerbit, tahun_terbit, nama_penulis, gambar, userfile "
                    " FROM tbl_buku as b "
                    " INNER JOIN tbl_nakes as n "
                    " ON b.id_nakes = n.id_nakes "
                    " INNER JOIN tbl_penerbit as p1 "
                    " ON b.id_penerbit = p1.id_penerbit "
                    " INNER JOIN tbl_penulis as p2 "
                    " ON b.id_penulis = p2.id_penulis "
                    " INNER JOIN tbl_jenis as j "
                    " ON b.id_jenis = j.id_jenis "
                    " WHERE "
                    " kode_buku = '" + kode_buku + "' OR "
                    " nama_buku = '" + nama_buku + "' OR "
                    " jenis_buku = '" + jenis_buku + "' OR "
                    " tenaga_kesehatan = '" + tenaga_kesehatan + "' OR "
                    " nama_penerbit = '" + nama_penerbit + "' OR "
                    " tahun_terbit = '" + tahun_terbit + "' OR "
                    " nama_penulis = '" + nama_penulis + "' "
                    " GROUP BY id_buku")

        result = cur.fetchall()
        db.connection.commit()
        return jsonify(result)

# cari nakes
@cari.route('/cari_nakes', methods=["POST", "GET"])
def cari_nakes():
    if request.method == 'POST':
        cur = db.connection.cursor()
        form = request.form
        json = request.get_json()
        tenaga_kesehatan = request.get_json()['tenaga_kesehatan']
        cur.execute("select tenaga_kesehatan from tbl_nakes where tenaga_kesehatan ='" + tenaga_kesehatan + "'")
        result = cur.fetchall()
        db.connection.commit()
        return jsonify(result)

# cari jenis
@cari.route('/cari_jenis', methods=["POST", "GET"])
def cari_jenis():
    if request.method == 'POST':
        cur = db.connection.cursor()
        form = request.form
        jenis_buku = form['jenis_buku']
        cur.execute("select jenis_buku from tbl_jenis where jenis_buku ='" + jenis_buku + "'")
        result = cur.fetchall()
        db.connection.commit()
        return jsonify(result)

# cari penerbit
@cari.route('/cari_penerbit', methods=["POST", "GET"])
def cari_penerbit():
    if request.method == 'POST':
        cur = db.connection.cursor()
        form = request.form
        nama_penerbit = form['nama_penerbit']
        tahun_terbit = form['tahun_terbit']
        cur.execute("SELECT * "
                    " FROM tbl_penerbit "
                    " WHERE nama_penerbit ='" + nama_penerbit + "' OR "
                    "tahun_terbit = '" + tahun_terbit +"'")
        result = cur.fetchall()
        db.connection.commit()
        return jsonify(result)

@cari.route('/cari_penerbiit', methods=["POST", "GET"])
def cari_penerbiit():
    if request.method == 'POST':
        cur = db.connection.cursor()
        form = request.form
        nama_penerbit = request.form['nama_penerbit']
        tahun_terbit = request.form['tahun_terbit']
        json = request.get_json()
        # nama_penerbit = json['nama_penerbit']
        # tahun_terbit = json['tahun_terbit']
        # searchItem = json['nama_penerbit']
        cur.execute("SELECT nama_penerbit, tahun_terbit "
                    " FROM tbl_penerbit "
                    " WHERE nama_penerbit LIKE '{}%' OR "
                    " tahun_terbit LIKE '{}%' ". format(nama_penerbit, tahun_terbit))

        # .format(penerbit, penerbit)
        db.connection.commit()
        result = cur.fetchall()
        return jsonify(result)

# cari penulis
@cari.route('/cari_penulis', methods=["POST", "GET"])
def cari_penulis():
    if request.method == 'POST':
        cur = db.connection.cursor()
        form = request.form
        nama_penulis = form['nama_penulis']
        cur.execute("select nama_penulis from tbl_penulis where nama_penulis ='" + nama_penulis + "'")
        result = cur.fetchall()
        db.connection.commit()
        return jsonify(result)