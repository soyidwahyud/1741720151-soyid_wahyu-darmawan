from flask import Flask, render_template, Blueprint
from flask import jsonify, request
from flask_jwt_extended import create_access_token
from ..run import db, jwt, bcrypt

cari = Blueprint('cari', __name__)


# cari buku
@cari.route('/cari_buku', methods=["POST", "GET"])
def cari_buku():
    if request.method == 'POST':
        nama_buku = request.form['nama_buku']
        tenaga_kesehatan = request.form['tenaga_kesehatan']
        nama_penerbit = request.form['nama_penerbit']
        tahun_terbit = request.form['tahun_terbit']
        nama_penulis = request.form['nama_penulis']
        jenis_buku = request.form['jenis_buku']
        cur = db.connection.cursor()
        cur.execute("SELECT kode_buku, nama_buku, jenis_buku, tenaga_kesehatan, nama_penerbit, tahun_terbit, nama_penulis, gambar, userfile FROM tbl_buku as b"
                    " INNER JOIN tbl_nakes as n "
                    " ON b.id_nakes = n.id_nakes "
                    " INNER JOIN tbl_penerbit as p1 "
                    " ON b.id_penerbit = p1.id_penerbit "
                    " INNER JOIN tbl_penulis as p2 "
                    " ON b.id_penulis = p2.id_penulis "
                    " INNER JOIN tbl_jenis as j "
                    " ON b.id_jenis = j.id_jenis "
                    " WHERE "
                    " nama_buku LIKE '{}%' OR "
                    " tenaga_kesehatan LIKE '{}%' OR "
                    " nama_penerbit LIKE '{}%' OR "
                    " tahun_terbit LIKE '{}%' OR "
                    " nama_penulis LIKE '{}%' OR "
                    " jenis_buku LIKE '{}%'".format(nama_buku, tenaga_kesehatan, nama_penerbit, tahun_terbit, nama_penulis, jenis_buku))

        db.connection.commit()
        result = cur.fetchall()
        return jsonify(result)
