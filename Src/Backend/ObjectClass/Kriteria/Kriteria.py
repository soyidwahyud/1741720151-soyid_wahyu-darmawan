from flask import Flask, render_template, Blueprint
from flask import jsonify, request
from flask_jwt_extended import create_access_token
from ..run import db, jwt, bcrypt

kriteria = Blueprint('kriteria',__name__)

# READ
@kriteria.route('/kriteria', methods=['GET'])
def get_all_kriteria():
    cur = db.connection.cursor()
    cur.execute("SELECT * FROM tbl_kriteria")
    rv = cur.fetchall()
    return jsonify(rv)

# UPDATE
@kriteria.route('/kriteria/<id_kriteria>', methods=['PUT'])
def update_kriteria(id_kriteria):
    cur = db.connection.cursor()
    kode = request.get_json()['kode']
    nama_kriteria = request.get_json()['nama_kriteria']
    bobot = request.get_json()['bobot']
    tipe_kriteria = request.get_json()['tipe_kriteria']

    cur.execute("UPDATE tbl_kriteria SET kode = '" + str(kode) + "',"
                + "nama_kriteria = '" + str(nama_kriteria) + "',"
                + "bobot = '" + str(bobot) + "',"
                + "tipe_kriteria       ='" + str(tipe_kriteria)
                + "'WHERE id_kriteria=" + id_kriteria)

    db.connection.commit()
    result = \
        {
            'id_kriteria': id_kriteria,
            'kode': kode,
            'nama_kriteria': nama_kriteria,
            'bobot': bobot,
            'tipe_kriteria': tipe_kriteria,
        }

    return jsonify({"result": result})