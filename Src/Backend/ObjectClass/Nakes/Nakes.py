from flask import Flask, render_template, Blueprint
from flask import jsonify, request
from flask_jwt_extended import create_access_token
from ..run import db, jwt, bcrypt

nakes = Blueprint('nakes',__name__)

# CREATE
@nakes.route('/nakes', methods=['POST'])
def add_nakes():
    cur = db.connection.cursor()

    tenaga_kesehatan = request.get_json()['tenaga_kesehatan']

    cur.execute(
        "INSERT INTO tbl_nakes (id_nakes,tenaga_kesehatan) "
        " SELECT MAX(id_nakes)+1, "
        "'" + str(tenaga_kesehatan) + "' " +
        "FROM tbl_nakes")

    db.connection.commit()
    result = \
        {
            'tenaga_kesehatan'   : tenaga_kesehatan
        }

    return jsonify({"result" : result})

# READ
@nakes.route('/nakes', methods=['GET'])
def get_all_nakes():
    cur = db.connection.cursor()
    cur.execute("SELECT * FROM tbl_nakes")
    rv = cur.fetchall()
    return jsonify(rv)

# UPDATE
@nakes.route('/nakes/<id_nakes>', methods=['PUT'])
def update_nakes(id_nakes):
    cur = db.connection.cursor()

    tenaga_kesehatan = request.get_json()['tenaga_kesehatan']

    cur.execute("UPDATE tbl_nakes SET tenaga_kesehatan = '"+ str(tenaga_kesehatan) + "'"
                             + "WHERE id_nakes=" + id_nakes)

    db.connection.commit()

    result = \
        {
            'id_nakes': id_nakes,
            'tenaga_kesehatan': tenaga_kesehatan,
        }

    return jsonify({"result":result})

# DELETE
@nakes.route('/nakes/<id_nakes>', methods=['DELETE'])
def delete_nakes(id_nakes):
    cur = db.connection.cursor()
    response = cur.execute("DELETE FROM tbl_nakes where id_nakes=" + id_nakes)
    db.connection.commit()

    if response> 0:
        result = {'message' : 'record deleted'}
    else:
        result = {'message' : 'no record found'}
    return jsonify({"result": result})