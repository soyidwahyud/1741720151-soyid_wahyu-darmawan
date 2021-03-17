from flask import Flask, render_template, Blueprint
from flask import jsonify, request
from flask_jwt_extended import create_access_token
from ..run import db, jwt, bcrypt

penulis = Blueprint('penulis',__name__)

# CREATE
@penulis.route('/penulis', methods=['POST'])
def add_penulis():
    cur = db.connection.cursor()

    nama_penulis = request.get_json()['nama_penulis']

    cur.execute(
        "INSERT INTO tbl_penulis (id_penulis,nama_penulis) "
        " SELECT MAX(id_penulis)+1, "
        "'" + str(nama_penulis) + "' " +
        "FROM tbl_penulis")

    db.connection.commit()
    result = \
        {

            'nama_penulis'   : nama_penulis
        }

    return jsonify({"result" : result})

# READ
@penulis.route('/penulis', methods=['GET'])
def get_all_penulis():
    cur = db.connection.cursor()
    cur.execute("SELECT * FROM tbl_penulis")
    rv = cur.fetchall()
    return jsonify(rv)

# UPDATE
@penulis.route('/penulis/<id_penulis>', methods=['PUT'])
def update_penulis(id_penulis):
    cur = db.connection.cursor()

    nama_penulis = request.get_json()['nama_penulis']

    cur.execute("UPDATE tbl_penulis SET nama_penulis = '"+ str(nama_penulis) + "'"
                             + "WHERE id_penulis =" + id_penulis)

    db.connection.commit()

    result = \
        {
            'id_penulis': id_penulis,
            'nama_penulis': nama_penulis,
        }

    return jsonify({"result":result})

# DELETE
@penulis.route('/penulis/<id_penulis>', methods=['DELETE'])
def delete_penulis(id_penulis):
    cur = db.connection.cursor()
    response = cur.execute("DELETE FROM tbl_penulis where id_penulis=" + id_penulis)
    db.connection.commit()

    if response> 0:
        result = {'message' : 'record deleted'}
    else:
        result = {'message' : 'no record found'}
    return jsonify({"result": result})