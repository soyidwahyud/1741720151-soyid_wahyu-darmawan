from flask import jsonify, request, json, current_app
from flask import Blueprint, abort
from werkzeug.utils import secure_filename
from ..run import db
import uuid, secrets, os
from ..run import app

buku = Blueprint('buku',__name__)

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'pdf'])

# save image
def save_images(gambar):
    hash_photo = secrets.token_urlsafe(10)
    _, file_extension = os.path.splitext(gambar.filename)
    gambar_nama = hash_photo + file_extension
    gambar_path = os.path.join(current_app.root_path, 'static/Frontend - User/public/Images', gambar_nama)
    gambar.save(gambar_path)

    return gambar_nama

# save file
def save_userfile(userfile):
    hash_userfile = secrets.token_urlsafe(10)
    _, file_extension = os.path.splitext(userfile.filename)
    file_nama = hash_userfile + file_extension
    file_path = os.path.join(current_app.root_path, 'static/Frontend - User/public/Files', file_nama)
    userfile.save(file_path)

    return file_nama

# CREATE
@buku.route('/buku', methods=['POST'])
def add_buku():
    if request.method == 'POST':
        if app.config['MAX_CONTENT_LENGTH']:
            cur = db.connection.cursor()

            kode_buku = request.form['kode_buku']
            nama_buku = request.form['nama_buku']
            id_jenis = request.form['id_jenis']
            id_nakes = request.form['id_nakes']
            id_penerbit = request.form['id_penerbit']
            id_penulis = request.form['id_penulis']

            gambar = save_images(request.files['gambar'])

            userfile = save_userfile(request.files['userfile'])

            cur.execute(
                "INSERT INTO tbl_buku (id_buku,kode_buku,nama_buku,id_jenis,id_nakes,id_penerbit, id_penulis, gambar, userfile) "
                " SELECT MAX(id_buku)+1, "
                "'" + str(kode_buku) + "', "
                "'" + str(nama_buku) + "', "
                "'" + str(id_jenis) + "', "
                "'" + str(id_nakes) + "', "
                "'" + str(id_penerbit) + "', "
                "'" + str(id_penulis) + "', "
                "'" + str(gambar) + "', "
                "'" + str(userfile) + "' " +
                "FROM tbl_buku")

            db.connection.commit()
            result = \
                {

                    'kode_buku': kode_buku,
                    'nama_buku'   : nama_buku,
                    'id_jenis'   : id_jenis,
                    'id_nakes': id_nakes,
                    'id_penerbit'       : id_penerbit,
                    'id_penulis'        : id_penulis,
                    'gambar'      : gambar,
                    'userfile'          : userfile
                }

            return jsonify({"result" : result})

# READ
@buku.route('/buku', methods=['GET'])
def get_all_buku():
    cur = db.connection.cursor()
    cur.execute("SELECT id_buku, kode_buku, nama_buku, jenis_buku, tenaga_kesehatan, nama_penerbit, tahun_terbit, nama_penulis, gambar, userfile  "
                "FROM tbl_buku as b "
                "INNER JOIN tbl_jenis as j "
                "on b.id_jenis = j.id_jenis "
                "INNER JOIN tbl_nakes as n "
                "on b.id_nakes = n.id_nakes "
                "INNER JOIN tbl_penerbit as p1 "
                "on b.id_penerbit = p1.id_penerbit " 
                "INNER JOIN tbl_penulis as p2 "
                "on b.id_penulis = p2.id_penulis "
                "ORDER BY id_buku")

    db.connection.commit()

    rv = cur.fetchall()
    return jsonify(rv)

# READ In Menu Buku
@buku.route('/buku_menu', methods=['GET'])
def get_menu_buku():
    cur = db.connection.cursor()
    cur.execute("SELECT id_buku, nama_buku, jenis_buku, tenaga_kesehatan, nama_penerbit, tahun_terbit, nama_penulis, gambar  "
                "FROM tbl_buku as b "
                "INNER JOIN tbl_jenis as j "
                "on b.id_jenis = j.id_jenis "
                "INNER JOIN tbl_nakes as n "
                "on b.id_nakes = n.id_nakes "
                "INNER JOIN tbl_penerbit as p1 "
                "on b.id_penerbit = p1.id_penerbit " 
                "INNER JOIN tbl_penulis as p2 "
                "on b.id_penulis = p2.id_penulis ")

    db.connection.commit()

    rv = cur.fetchall()
    return jsonify(rv)

# READ id jenis buku
@buku.route('/buku/jenis', methods=['GET'])
def get_id_jenis():
    cur = db.connection.cursor()
    cur.execute("SELECT id_jenis, jenis_buku FROM tbl_jenis")

    db.connection.commit()

    rv = cur.fetchall()
    return jsonify(rv)

# READ id nakes
@buku.route('/buku/nakes', methods=['GET'])
def get_id_nakes():
    cur = db.connection.cursor()
    cur.execute("SELECT id_nakes, tenaga_kesehatan FROM tbl_nakes")

    db.connection.commit()

    rv = cur.fetchall()
    return jsonify(rv)

# READ id penerbit
@buku.route('/buku/penerbit', methods=['GET'])
def get_id_penerbit():
    cur = db.connection.cursor()
    cur.execute("SELECT id_penerbit, nama_penerbit, tahun_terbit FROM tbl_penerbit")

    db.connection.commit()

    rv = cur.fetchall()
    return jsonify(rv)

# READ id penulis
@buku.route('/buku/penulis', methods=['GET'])
def get_id_penulis():
    cur = db.connection.cursor()
    cur.execute("SELECT id_penulis, nama_penulis FROM tbl_penulis")

    db.connection.commit()

    rv = cur.fetchall()
    return jsonify(rv)

# UPDATE
@buku.route('/buku/<id_buku>', methods=['PUT'])
def update_buku(id_buku):
    if request.method == 'PUT':
        if app.config['MAX_CONTENT_LENGTH']:
            cur = db.connection.cursor()
            kode_buku = request.form['kode_buku']
            nama_buku = request.form['nama_buku']
            id_jenis = request.form['id_jenis']
            id_nakes = request.form['id_nakes']
            id_penerbit = request.form['id_penerbit']
            id_penulis = request.form['id_penulis']

            # gambar
            gambar = save_images(request.files['gambar'])

            # file
            userfile = save_userfile(request.files['userfile'])


            cur.execute("UPDATE tbl_buku SET kode_buku = '" + str(kode_buku) + "',"
                        + "nama_buku  ='" + str(nama_buku) + "',"
                        + "id_jenis  ='" + str(id_jenis) + "',"
                        + "id_nakes  ='" + str(id_nakes) + "',"
                        + "id_penerbit   ='" + str(id_penerbit) + "',"
                        + "id_penulis ='" + str(id_penulis) + "',"
                        + "gambar     ='" + str(gambar) + "',"
                        + "userfile       ='" + str(userfile)
                        + "'WHERE id_buku=" + id_buku)

            db.connection.commit()
            result = \
                {
                    'id_buku'         : id_buku,
                    'kode_buku': kode_buku,
                    'nama_buku'   : nama_buku,
                    'id_jenis'   : id_jenis,
                    'id_nakes': id_nakes,
                    'id_penerbit'       : id_penerbit,
                    'id_penulis'        : id_penulis,
                    'gambar'      : gambar,
                    'userfile'          : userfile
                }

            return jsonify({"result": result})

# DELETE
@buku.route('/buku/<id_buku>', methods=['DELETE'])
def delete_buku(id_buku):
    cur = db.connection.cursor()
    response = cur.execute("DELETE FROM tbl_buku where id_buku=" + id_buku)
    db.connection.commit()

    if response> 0:
        result = {'message' : 'record deleted'}
    else:
        result = {'message' : 'no record found'}
    return jsonify({"result": result})

# ORDER DESCENDING
@buku.route('/buku_baru', methods=['GET'])
def get_buku_baru():
    cur = db.connection.cursor()
    cur.execute(
        "SELECT id_buku, kode_buku, nama_buku, jenis_buku, tenaga_kesehatan, nama_penerbit, tahun_terbit, nama_penulis, gambar, userfile  "
        "FROM tbl_buku as b "
        "INNER JOIN tbl_jenis as j "
        "on b.id_jenis = j.id_jenis "
        "INNER JOIN tbl_nakes as n "
        "on b.id_nakes = n.id_nakes "
        "INNER JOIN tbl_penerbit as p1 "
        "on b.id_penerbit = p1.id_penerbit "
        "INNER JOIN tbl_penulis as p2 "
        "on b.id_penulis = p2.id_penulis "
        "ORDER BY id_buku DESC")
    db.connection.commit()

    rv = cur.fetchall()
    return jsonify(rv)

# ORDER Ascending kata
@buku.route('/buku_ascending', methods=['GET'])
def get_buku_ascending():
    cur = db.connection.cursor()
    cur.execute(
        "SELECT id_buku, kode_buku, nama_buku, jenis_buku, tenaga_kesehatan, nama_penerbit, tahun_terbit, nama_penulis, gambar, userfile  "
        "FROM tbl_buku as b "
        "INNER JOIN tbl_jenis as j "
        "on b.id_jenis = j.id_jenis "
        "INNER JOIN tbl_nakes as n "
        "on b.id_nakes = n.id_nakes "
        "INNER JOIN tbl_penerbit as p1 "
        "on b.id_penerbit = p1.id_penerbit "
        "INNER JOIN tbl_penulis as p2 "
        "on b.id_penulis = p2.id_penulis "
        "ORDER BY nama_buku ASC")
    db.connection.commit()

    rv = cur.fetchall()
    return jsonify(rv)

# ORDER DESCENDING kata
@buku.route('/buku_descending', methods=['GET'])
def get_buku_descending():
    cur = db.connection.cursor()
    cur.execute(
        "SELECT id_buku, kode_buku, nama_buku, jenis_buku, tenaga_kesehatan, nama_penerbit, tahun_terbit, nama_penulis, gambar, userfile  "
        "FROM tbl_buku as b "
        "INNER JOIN tbl_jenis as j "
        "on b.id_jenis = j.id_jenis "
        "INNER JOIN tbl_nakes as n "
        "on b.id_nakes = n.id_nakes "
        "INNER JOIN tbl_penerbit as p1 "
        "on b.id_penerbit = p1.id_penerbit "
        "INNER JOIN tbl_penulis as p2 "
        "on b.id_penulis = p2.id_penulis "
        "ORDER BY nama_buku DESC")
    db.connection.commit()

    rv = cur.fetchall()
    return jsonify(rv)

# GET BUKU BY ID
@buku.route('/buku/detail/<id_buku>', methods=['GET'])
def get_idbuku(id_buku):
    cur = db.connection.cursor()
    cur.execute(
        "SELECT id_buku, nama_buku, jenis_buku, tenaga_kesehatan, nama_penerbit, tahun_terbit, nama_penulis, gambar, userfile  "
        "FROM tbl_buku as b "
        "INNER JOIN tbl_jenis as j "
        "on b.id_jenis = j.id_jenis "
        "INNER JOIN tbl_penerbit as p1 "
        "on b.id_penerbit = p1.id_penerbit "
        "INNER JOIN tbl_penulis as p2 "
        "on b.id_penulis = p2.id_penulis "
        "WHERE id_buku = " + id_buku)
    db.connection.commit()

    rv = cur.fetchall()
    return jsonify(rv)


# GET PDF
@buku.route('/buku/detail/pdf/<id_buku>', methods=['GET'])
def get_pdfbuku(id_buku):
    cur = db.connection.cursor()
    cur.execute(
        "SELECT userfile "
        " FROM tbl_buku "
        " WHERE id_buku = " + id_buku)
    db.connection.commit()

    rv = cur.fetchall()
    return jsonify(rv)

# ORDER Ascending kata
@buku.route('/buku_dokter', methods=['GET'])
def get_buku_kedokteran():
    cur = db.connection.cursor()
    cur.execute(
        "SELECT id_buku, kode_buku, nama_buku, jenis_buku, tenaga_kesehatan, nama_penerbit, tahun_terbit, nama_penulis, gambar, userfile  "
        "FROM tbl_buku as b "
        "INNER JOIN tbl_jenis as j "
        "on b.id_jenis = j.id_jenis "
        "INNER JOIN tbl_nakes as n "
        "on b.id_nakes = n.id_nakes "
        "INNER JOIN tbl_penerbit as p1 "
        "on b.id_penerbit = p1.id_penerbit "
        "INNER JOIN tbl_penulis as p2 "
        "on b.id_penulis = p2.id_penulis "
        "WHERE tenaga_kesehatan = 'Kedokteran'")
    db.connection.commit()

    rv = cur.fetchall()
    return jsonify(rv)

# ORDER Ascending kata
@buku.route('/buku_perawat', methods=['GET'])
def get_buku_keperawatan():
    cur = db.connection.cursor()
    cur.execute(
        "SELECT id_buku, kode_buku, nama_buku, jenis_buku, tenaga_kesehatan, nama_penerbit, tahun_terbit, nama_penulis, gambar, userfile  "
        "FROM tbl_buku as b "
        "INNER JOIN tbl_jenis as j "
        "on b.id_jenis = j.id_jenis "
        "INNER JOIN tbl_nakes as n "
        "on b.id_nakes = n.id_nakes "
        "INNER JOIN tbl_penerbit as p1 "
        "on b.id_penerbit = p1.id_penerbit "
        "INNER JOIN tbl_penulis as p2 "
        "on b.id_penulis = p2.id_penulis "
        "WHERE tenaga_kesehatan = 'Keperawatan'")
    db.connection.commit()

    rv = cur.fetchall()
    return jsonify(rv)

@buku.route('/buku_farmasi', methods=['GET'])
def get_buku_farmasi():
    cur = db.connection.cursor()
    cur.execute(
        "SELECT id_buku, kode_buku, nama_buku, jenis_buku, tenaga_kesehatan, nama_penerbit, tahun_terbit, nama_penulis, gambar, userfile  "
        "FROM tbl_buku as b "
        "INNER JOIN tbl_jenis as j "
        "on b.id_jenis = j.id_jenis "
        "INNER JOIN tbl_nakes as n "
        "on b.id_nakes = n.id_nakes "
        "INNER JOIN tbl_penerbit as p1 "
        "on b.id_penerbit = p1.id_penerbit "
        "INNER JOIN tbl_penulis as p2 "
        "on b.id_penulis = p2.id_penulis "
        "WHERE tenaga_kesehatan = 'Farmasi'")
    db.connection.commit()

    rv = cur.fetchall()
    return jsonify(rv)

# ORDER DESCENDING kata
@buku.route('/tahun_descending', methods=['GET'])
def get_tahun_descending():
    cur = db.connection.cursor()
    cur.execute(
        "SELECT id_buku, kode_buku, nama_buku, jenis_buku, tenaga_kesehatan, nama_penerbit, tahun_terbit, nama_penulis, gambar, userfile  "
        "FROM tbl_buku as b "
        "INNER JOIN tbl_jenis as j "
        "on b.id_jenis = j.id_jenis "
        "INNER JOIN tbl_nakes as n "
        "on b.id_nakes = n.id_nakes "
        "INNER JOIN tbl_penerbit as p1 "
        "on b.id_penerbit = p1.id_penerbit "
        "INNER JOIN tbl_penulis as p2 "
        "on b.id_penulis = p2.id_penulis "
        "ORDER BY tahun_terbit DESC")
    db.connection.commit()

    rv = cur.fetchall()
    return jsonify(rv)

# ORDER DESCENDING kata
@buku.route('/tahun_ascending', methods=['GET'])
def get_tahun_ascending():
    cur = db.connection.cursor()
    cur.execute(
        "SELECT id_buku, kode_buku, nama_buku, jenis_buku, tenaga_kesehatan, nama_penerbit, tahun_terbit, nama_penulis, gambar, userfile  "
        "FROM tbl_buku as b "
        "INNER JOIN tbl_jenis as j "
        "on b.id_jenis = j.id_jenis "
        "INNER JOIN tbl_nakes as n "
        "on b.id_nakes = n.id_nakes "
        "INNER JOIN tbl_penerbit as p1 "
        "on b.id_penerbit = p1.id_penerbit "
        "INNER JOIN tbl_penulis as p2 "
        "on b.id_penulis = p2.id_penulis "
        "ORDER BY tahun_terbit ASC")
    db.connection.commit()

    rv = cur.fetchall()
    return jsonify(rv)