from flask import Flask, render_template, Blueprint
from flask import jsonify, request
from flask_jwt_extended import create_access_token
from ..run import db, jwt, bcrypt

user = Blueprint('user', __name__)


# CREATE / REGISTER
@user.route('/user/register', methods=['POST'])
def add_user():
    cur = db.connection.cursor()

    nik = request.get_json()['nik']
    nama_user = request.get_json()['nama_user']
    username_user = request.get_json()['username_user']
    email_user = request.get_json()['email_user']
    password_user = bcrypt.generate_password_hash(request.get_json()['password_user']).decode('utf-8')

    alamat = request.get_json()['alamat']
    notelp = request.get_json()['notelp']

    cur.execute("INSERT INTO tbl_user (id_user,nik, nama_user, username_user,email_user,password_user, alamat, notelp) "
                " SELECT MAX(id_user)+1, "
                "'" + str(nik) + "', "
                                 "'" + str(nama_user) + "', "
                                                        "'" + str(username_user) + "', "
                                                                                   "'" + str(email_user) + "', "
                                                                                                           "'" + str(
        password_user) + "', "
                         "'" + str(alamat) + "', "
                                             "'" + str(notelp) + "' " +
                "FROM tbl_user")

    db.connection.commit()
    result = \
        {
            'nik': nik,
            'nama_user': nama_user,
            'username_user': username_user,
            'email_user': email_user,
            'password_user': password_user,
            'alamat': alamat,
            'notelp': notelp
        }

    return jsonify({"result": result})


# LOGIN
@user.route('/user/login', methods=['POST'])
def login():
    cur = db.connection.cursor()
    username_user = request.get_json()['username_user']
    password_user = request.get_json()['password_user']
    result = ""

    cur.execute("SELECT * FROM tbl_user where username_user = '" + str(username_user) + "'")
    rv = cur.fetchone()

    if bcrypt.check_password_hash(rv['password_user'], password_user):
        access_token = create_access_token(
            identity={'id_user': rv['id_user'],
                      'nik': rv['nik'],
                      'nama_user': rv['nama_user'],
                      'username_user': rv['username_user'],
                      'email_user': rv['email_user'],
                      'alamat': rv['alamat'],
                      'notelp': rv['notelp']})
        result = jsonify({"result": access_token})
    else:
        result = jsonify({"error": "Invalid username and password"})

    return result


# test forget
@user.route('/user/forget_pass', methods=['POST'])
def forget():
    cur = db.connection.cursor()

    email_user = request.get_json()['email_user']
    response = cur.execute("SELECT id_user, username_user FROM tbl_user where email_user = '" + str(email_user) + "'")

    db.connection.commit()

    if response > 0:
        result = jsonify({"result": "email benar"})
    else:
        result = jsonify({"error": "email salah"})

    # result = \
    #     {
    #         'email_user': email_user
    #     }

    return result


# READ
@user.route('/user', methods=['GET'])
def get_all_user():
    cur = db.connection.cursor()
    cur.execute("SELECT id_user, nik, username_user, email_user, password_user, nama_user, alamat, notelp "
                "FROM tbl_user as u ")

    db.connection.commit()

    rv = cur.fetchall()
    return jsonify(rv)

# READ
@user.route('/user/1', methods=['GET'])
def get_tes_user():
    cur = db.connection.cursor()
    cur.execute("SELECT id_user, username_user "
                "FROM tbl_user as u where id_user = 1")

    db.connection.commit()

    rv = cur.fetchall()
    return jsonify(rv)


# FORGET PASSWORD
@user.route('/user2/<id_user>', methods=['PUT'])
def forget_user(id_user):
    cur = db.connection.cursor()
    # id_buku = request.get_json()['id_buku']

    username_user = request.get_json()['username_user']
    password_user = bcrypt.generate_password_hash(request.get_json()['password_user']).decode('utf-8')
    # password_admin = request.get_json()['password_admin']

    cur.execute("UPDATE tbl_user SET username_user = '" + str(username_user) + "',"
                + "password_user = '" + str(password_user) + "' "
                + "WHERE id_user=" + id_user)

    db.connection.commit()

    result = \
        {
            'id_user': id_user,
            'username_user': username_user,
            'password_user': password_user
        }

    return jsonify({"result": result})


# UPDATE
@user.route('/user/<id_user>', methods=['PUT'])
def update_user(id_user):
    cur = db.connection.cursor()
    nik = request.get_json()['nik']
    username_user = request.get_json()['username_user']
    email_user = request.get_json()['email_user']
    password_user = bcrypt.generate_password_hash(request.get_json()['password_user']).decode('utf-8')
    nama_user = request.get_json()['nama_user']
    alamat = request.get_json()['alamat']
    notelp = request.get_json()['notelp']

    cur.execute("UPDATE tbl_user SET nik = '" + str(nik) + "',"
                + "nama_user = '" + str(nama_user) + "',"
                + "username_user = '" + str(username_user) + "',"
                + "email_user = '" + str(email_user) + "',"
                + "password_user  ='" + str(password_user) + "',"
                + "alamat     ='" + str(alamat) + "',"
                + "notelp       ='" + str(notelp)
                + "'WHERE id_user=" + id_user)

    db.connection.commit()
    result = \
        {
            'id_user': id_user,
            'nik': nik,
            'nama_user': nama_user,
            'username_user': username_user,
            'email_user': email_user,
            'password_user': password_user,
            'alamat': alamat,
            'notelp': notelp
        }

    return jsonify({"result": result})


# DELETE
@user.route('/user/<id_user>', methods=['DELETE'])
def delete_user(id_user):
    cur = db.connection.cursor()
    response = cur.execute("DELETE FROM tbl_user where id_user=" + id_user)
    db.connection.commit()

    if response > 0:
        result = {'message': 'record deleted'}
    else:
        result = {'message': 'no record found'}
    return jsonify({"result": result})


# ORDER DESCENDING
@user.route('/user_baru', methods=['GET'])
def get_user_baru():
    cur = db.connection.cursor()
    cur.execute("SELECT id_user, nik, username_user, email_user, password_user, nama_user, alamat, notelp "
                "FROM tbl_user as u "
                "ORDER BY id_user DESC")
    db.connection.commit()

    rv = cur.fetchall()
    return jsonify(rv)
