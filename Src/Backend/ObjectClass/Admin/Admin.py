from flask import Flask, render_template, Blueprint
from flask import jsonify, request
from flask_jwt_extended import create_access_token
import flask_praetorian
from ..run import db, jwt, bcrypt

admin = Blueprint('admin',__name__)
guard = flask_praetorian.Praetorian()

# test
@admin.route('/admin/home', methods=['GET'])
def home():
  	return {"Hello": "World"}, 200

@admin.route('/admin/refresh', methods=['POST'])
def refresh():
    """
    Refreshes an existing JWT by creating a new one that is a copy of the old
    except that it has a refrehsed access expiration.
    .. example::
       $ curl http://localhost:5000/refresh -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    print("refresh request")
    old_token = request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {'access_token': new_token}
    return ret, 200
# CREATE / REGISTER
@admin.route('/admin/register', methods=['POST'])
def add_admin():
    cur = db.connection.cursor()

    nama_admin = request.get_json()['nama_admin']
    username_admin = request.get_json()['username_admin']
    email_admin = request.get_json()['email_admin']
    password_admin = bcrypt.generate_password_hash(request.get_json()['password_admin']).decode('utf-8')

    cur.execute("INSERT INTO tbl_admin (id_admin,nama_admin,username_admin,email_admin,password_admin) "
                " SELECT MAX(id_admin)+1, "
                "'" + str(nama_admin) + "', "
                "'" + str(username_admin) + "', "
                "'" + str(email_admin) + "', "
                "'" + str(password_admin) + "' " +
                "FROM tbl_admin")

    db.connection.commit()
    result = \
        {
            'nama_admin': nama_admin,
            'username_admin': username_admin,
            'email_admin' : email_admin,
            'password_admin': password_admin
        }

    return jsonify({"result":result})

# LOGIN
@admin.route('/admin/login', methods=['POST'])
def login():
    cur = db.connection.cursor()
    username_admin = request.get_json()['username_admin']
    password_admin = request.get_json()['password_admin']


    cur.execute("SELECT * FROM tbl_admin where username_admin = '" + str(username_admin) + "'")
    rv = cur.fetchone()

    if bcrypt.check_password_hash(rv['password_admin'], password_admin):
        access_token = create_access_token(
            identity={'id_admin': rv['id_admin'],
                      'username_admin': rv['username_admin'],
                      'email_admin': rv['email_admin'],
                      'nama_admin': rv['nama_admin']})
        result = jsonify({"result": access_token})

    else:
        result = jsonify({"error": "Invalid username and password"})

    return result

# READ
@admin.route('/admin', methods=['GET'])
def get_all_admin():
    cur = db.connection.cursor()
    cur.execute("SELECT * FROM tbl_admin")
    rv = cur.fetchall()
    return jsonify(rv)

# UPDATE
@admin.route('/admin/<id_admin>', methods=['PUT'])
def update_admin(id_admin):
    cur = db.connection.cursor()
    # id_buku = request.get_json()['id_buku']
    nama_admin = request.get_json()['nama_admin']
    username_admin = request.get_json()['username_admin']
    password_admin = bcrypt.generate_password_hash(request.get_json()['password_admin']).decode('utf-8')
    # password_admin = request.get_json()['password_admin']


    cur.execute("UPDATE tbl_admin SET nama_admin = '"+ str(nama_admin) + "',"
                             + "username_admin = '"+ str(username_admin) + "',"
                             + "password_admin = MD5('" + str(password_admin) + "') "
                             + "WHERE id_admin=" + id_admin)

    db.connection.commit()

    result = \
        {
            'id_admin': id_admin,
            'nama_admin': nama_admin,
            'username_admin': username_admin,
            'password_admin': password_admin
        }

    return jsonify({"result":result})

# DELETE
@admin.route('/admin/<id_admin>', methods=['DELETE'])
def delete_admin(id_admin):
    cur = db.connection.cursor()
    response = cur.execute("DELETE FROM tbl_admin where id_admin=" + id_admin)
    db.connection.commit()

    if response> 0:
        result = {'message' : 'record deleted'}
    else:
        result = {'message' : 'no record found'}
    return jsonify({"result": result})

