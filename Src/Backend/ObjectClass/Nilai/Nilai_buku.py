from flask import Flask, render_template, Blueprint
from flask import jsonify, request
from flask_jwt_extended import create_access_token
from ..run import db, jwt, bcrypt

nilai = Blueprint('nilai',__name__)

# CREATE
@nilai.route('/nilai_buku', methods=['POST'])
def add_nilai():

    cur = db.connection.cursor()

    id_user = request.get_json(force=True)['id_user']
    id_buku = request.get_json()['id_buku']
    kelayakan_isi = request.get_json()['kelayakan_isi']
    kebahasaan = request.get_json()['kebahasaan']
    penyajian = request.get_json()['penyajian']
    kegrafikaan = request.get_json()['kegrafikaan']

    cur.execute(
        "INSERT INTO tbl_nilai_buku (id_nilai_buku, id_user, id_buku, kelayakan_isi, kebahasaan, penyajian, kegrafikaan) "
        " SELECT MAX(id_nilai_buku)+1, "
        "'" + str(id_user) + "', " +
        "'" + str(id_buku) + "', " +
        "'" + str(kelayakan_isi) + "', " +
        "'" + str(kebahasaan) + "', " +
        "'" + str(penyajian) + "', " +
        "'" + str(kegrafikaan) + "' " +
        "FROM tbl_nilai_buku")

    db.connection.commit()
    result = \
        {
            'id_user': id_user,
            'id_buku': id_buku,
            'kelayakan_isi': kelayakan_isi,
            'kebahasaan': kebahasaan,
            'penyajian': penyajian,
            'kegrafikaan': kegrafikaan
        }

    return jsonify({"result": result})


# READ
@nilai.route('/nilai_buku', methods=['GET'])
def get_all_nilai():
    cur = db.connection.cursor()
    cur.execute("SELECT id_nilai_buku, nama_user, kode_buku, nama_buku, kelayakan_isi, kebahasaan, penyajian, kegrafikaan "
                "FROM tbl_nilai_buku as n "
                "INNER JOIN tbl_user as u "
                "ON n.id_user = u.id_user "
                "INNER JOIN tbl_buku as b "
                "ON n.id_buku = b.id_buku")
    rv = cur.fetchall()
    return jsonify(rv)

# READ NILAI BUKU TERBARU
@nilai.route('/nilai_buku_descending', methods=['GET'])
def get_nilai_descending():
    cur = db.connection.cursor()
    cur.execute("SELECT id_nilai_buku, nama_user, kode_buku, nama_buku, kelayakan_isi, kebahasaan, penyajian, kegrafikaan "
                "FROM tbl_nilai_buku as n "
                "INNER JOIN tbl_user as u "
                "ON n.id_user = u.id_user "
                "INNER JOIN tbl_buku as b "
                "ON n.id_buku = b.id_buku "
                "ORDER BY id_nilai_buku DESC")
    rv = cur.fetchall()
    return jsonify(rv)

# READ id user
@nilai.route('/nilai_buku/user', methods=['GET'])
def get_id_user():
    cur = db.connection.cursor()
    cur.execute("SELECT id_user, nama_user FROM tbl_user")

    db.connection.commit()

    rv = cur.fetchall()
    return jsonify(rv)

# READ id_buku
@nilai.route('/nilai_buku/buku', methods=['GET'])
def get_id_buku():
    cur = db.connection.cursor()
    cur.execute("SELECT id_buku, nama_buku FROM tbl_buku")
    db.connection.commit()
    rv = cur.fetchall()
    return jsonify(rv)

# READ Matriks Keputusan
@nilai.route('/matriks', methods=['GET'])
def get_matriks():
    cur = db.connection.cursor()
    cur.execute("SELECT kode_buku, kelayakan_isi, kebahasaan, penyajian, kegrafikaan "
                "FROM tbl_nilai_buku as n "
                "INNER JOIN tbl_buku as b "
                "ON n.id_buku = b.id_buku")
    db.connection.commit()
    rv = cur.fetchall()
    return jsonify(rv)

# READ Kriteria
@nilai.route('/kriteria_buku', methods=['GET'])
def get_kriteria_buku():
    cur = db.connection.cursor()
    cur.execute("SELECT * FROM tbl_kriteria")

    db.connection.commit()

    rv = cur.fetchall()
    return jsonify(rv)

# UPDATE
@nilai.route('/nilai_buku/<id_nilai_buku>', methods=['PUT'])
def update_nilai(id_nilai_buku):
    cur = db.connection.cursor()

    id_user = request.get_json()['id_user']
    id_buku = request.get_json()['id_buku']
    kelayakan_isi = request.get_json()['kelayakan_isi']
    kebahasaan = request.get_json()['kebahasaan']
    penyajian = request.get_json()['penyajian']
    kegrafikaan = request.get_json()['kegrafikaan']

    cur.execute("UPDATE tbl_nilai_buku SET id_user = '" + str(id_user) + "',"
                + "id_buku = '" + str(id_buku) + "',"
                + "kelayakan_isi = '" + str(kelayakan_isi) + "',"
                + "kebahasaan = '" + str(kebahasaan) + "',"
                + "penyajian  ='" + str(penyajian) + "',"
                + "kegrafikaan       ='" + str(kegrafikaan)
                + "'WHERE id_nilai_buku=" + id_nilai_buku)

    db.connection.commit()

    result = \
        {
            'id_nilai_buku': id_nilai_buku,
            'id_user': id_user,
            'id_buku': id_buku,
            'kelayakan_isi': kelayakan_isi,
            'kebahasaan': kebahasaan,
            'penyajian': penyajian,
            'kegrafikaan': kegrafikaan
        }

    return jsonify({"result":result})

# DELETE
@nilai.route('/nilai_buku/<id_nilai_buku>', methods=['DELETE'])
def delete_nilai(id_nilai_buku):
    cur = db.connection.cursor()
    response = cur.execute("DELETE FROM tbl_nilai_buku where id_nilai_buku=" + id_nilai_buku)
    db.connection.commit()

    if response> 0:
        result = {'message' : 'record deleted'}
    else:
        result = {'message' : 'no record found'}
    return jsonify({"result": result})