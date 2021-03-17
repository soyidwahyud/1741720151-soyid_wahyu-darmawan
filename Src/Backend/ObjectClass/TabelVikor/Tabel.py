from flask import Flask, render_template, Blueprint
from flask import jsonify, request
from flask_jwt_extended import create_access_token
from ..run import db, jwt, bcrypt

tabel = Blueprint('tabel',__name__)

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
