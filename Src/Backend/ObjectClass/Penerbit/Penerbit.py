from flask import Flask, render_template, Blueprint
from flask import jsonify, request
from flask_jwt_extended import create_access_token
from ..run import db, jwt, bcrypt

penerbit = Blueprint('penerbit',__name__)

# CREATE
@penerbit.route('/penerbit', methods=['POST'])
def add_penerbit():
    cur = db.connection.cursor()

    nama_penerbit = request.get_json()['nama_penerbit']
    tahun_terbit = request.get_json()['tahun_terbit']

    cur.execute(
        "INSERT INTO tbl_penerbit (id_penerbit, nama_penerbit, tahun_terbit) "
        " SELECT MAX(id_penerbit)+1, "
        "'" + str(nama_penerbit) + "', " +
        "'" + str(tahun_terbit) + "' " +
        "FROM tbl_penerbit")

    db.connection.commit()
    result = \
        {
            'nama_penerbit'   : nama_penerbit,
            'tahun_terbit'    : tahun_terbit
        }

    return jsonify({"result" : result})

# READ
@penerbit.route('/penerbit', methods=['GET'])
def get_all_penerbit():
    cur = db.connection.cursor()
    cur.execute("SELECT * FROM tbl_penerbit")
    rv = cur.fetchall()
    return jsonify(rv)

# UPDATE
@penerbit.route('/penerbit/<id_penerbit>', methods=['PUT'])
def update_penerbit(id_penerbit):
    cur = db.connection.cursor()

    nama_penerbit = request.get_json()['nama_penerbit']
    tahun_terbit = request.get_json()['tahun_terbit']

    cur.execute("UPDATE tbl_penerbit SET nama_penerbit = '"+ str(nama_penerbit) + "', tahun_terbit = '" + str(tahun_terbit) + "' "
                             + "WHERE id_penerbit =" + id_penerbit)

    db.connection.commit()

    result = \
        {
            'id_penerbit': id_penerbit,
            'nama_penerbit': nama_penerbit,
            'tahun_terbit' : tahun_terbit
        }

    return jsonify({"result":result})

# DELETE
@penerbit.route('/penerbit/<id_penerbit>', methods=['DELETE'])
def delete_penerbit(id_penerbit):
    cur = db.connection.cursor()
    response = cur.execute("DELETE FROM tbl_penerbit where id_penerbit=" + id_penerbit)
    db.connection.commit()

    if response> 0:
        result = {'message' : 'record deleted'}
    else:
        result = {'message' : 'no record found'}
    return jsonify({"result": result})