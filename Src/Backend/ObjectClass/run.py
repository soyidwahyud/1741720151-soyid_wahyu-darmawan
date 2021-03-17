from flask import Flask, render_template
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS

db = MySQL()
bcrypt = Bcrypt()
jwt = JWTManager()
# app = Flask()
app = Flask(__name__)


def create_app():
    cors = CORS(app, resources=r'/*')


    app.config['MYSQL_HOST'] = 'localhost'
    app.config['MYSQL_USER'] = 'root'
    app.config['MYSQL_PASSWORD'] = ''
    app.config['MYSQL_DB'] = 'digital_repository'
    app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

    app.config['MAX_CONTENT_LENGTH'] = 350 * 1024 * 1024

    app.config["JWT_SECRET_KEY"] = 'secret'

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    # admin
    from ObjectClass.Admin.Admin import admin
    app.register_blueprint(admin)

    # user
    from ObjectClass.Nakes.Nakes import nakes
    app.register_blueprint(nakes)

    from ObjectClass.User.User import user
    app.register_blueprint(user)

    # buku
    from ObjectClass.Penerbit.Penerbit import penerbit
    app.register_blueprint(penerbit)

    from ObjectClass.Penulis.Penulis import penulis
    app.register_blueprint(penulis)

    from ObjectClass.Jenis.Jenis import jenis
    app.register_blueprint(jenis)

    from ObjectClass.Buku.Buku import buku
    app.register_blueprint(buku)

    from ObjectClass.Nilai.Nilai_buku import nilai
    app.register_blueprint(nilai)

    # Ulasan
    from ObjectClass.Ulasan.Ulasan import ulasan
    app.register_blueprint(ulasan)

    # Pencarian
    from ObjectClass.Pencarian.Pencarian import cari
    app.register_blueprint(cari)

    # Hitung Vikor
    from ObjectClass.HitungVIKOR.HitungVikor import vikor
    app.register_blueprint(vikor)

    return app