from flask import Flask, render_template, Blueprint
from flask import jsonify, request
from flask_jwt_extended import create_access_token
from ..run import db, jwt, bcrypt

ulasan = Blueprint('ulasan',__name__)

# CREATE
# CREATE
@ulasan.route('/ulasan', methods=['POST'])
def add_ulasan():
    cur = db.connection.cursor()

    nama_depan = request.get_json()['nama_depan']
    nama_belakang = request.get_json()['nama_belakang']
    email = request.get_json()['email']
    judul = request.get_json()['judul']
    pesan = request.get_json()['pesan']

    cur.execute(
        "INSERT INTO tbl_ulasan (id_ulasan, nama_depan, nama_belakang, email, judul, pesan) "
        " SELECT MAX(id_ulasan)+1, "
        "'" + str(nama_depan) + "', "
        "'" + str(nama_belakang) + "', "
        "'" + str(email) + "', "
        "'" + str(judul) + "', "
        "'" + str(pesan) + "' " +
        "FROM tbl_ulasan")
    db.connection.commit()
    result = \
        {

            'nama_depan'   : nama_depan,
            'nama_belakang': nama_belakang,
            'email': email,
            'judul': judul,
            'pesan': pesan
        }

    return jsonify({"result" : result})


# READ
@ulasan.route('/ulasan', methods=['GET'])
def get_all_ulasan():
    cur = db.connection.cursor()
    cur.execute("SELECT * FROM tbl_ulasan")
    rv = cur.fetchall()
    return jsonify(rv)

# DELETE
# DELETE
@ulasan.route('/ulasan/<id_ulasan>', methods=['DELETE'])
def delete_ulasan(id_ulasan):
    cur = db.connection.cursor()
    response = cur.execute("DELETE FROM tbl_ulasan where id_ulasan=" + id_ulasan)
    db.connection.commit()

    if response> 0:
        result = {'message' : 'record deleted'}
    else:
        result = {'message' : 'no record found'}
    return jsonify({"result": result})