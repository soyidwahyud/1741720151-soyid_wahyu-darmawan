from flask import Flask, render_template, Blueprint, Response
from flask import jsonify, request
from flask_jwt_extended import create_access_token
from ..run import db, jwt, bcrypt
from ..HitungVIKOR.CobaVikorDB import CobaHitungVIKOR
from fpdf import FPDF


pdf = Blueprint('pdf', __name__)

# generate pdf
@pdf.route('/pdf_ranking_buku', methods=["GET"])
def generate_pdf():
    try:
        ObjekVikor = CobaHitungVIKOR()
        alternatif = ObjekVikor.data_IdBuku()
        kriteria = ObjekVikor.data_Kriteria()
        tipe_kriteria = ObjekVikor.data_TipeKriteria()
        bobot_kriteria = ObjekVikor.data_Bobot()
        matriks_keputusan = ObjekVikor.data_matriks_keputusan()

        arrayData = ObjekVikor.hitung_vikor(alternatif, kriteria, tipe_kriteria, bobot_kriteria, matriks_keputusan)
        data = [str(int) for int in arrayData]
        res = ",".join(data)

        cur = db.connection.cursor()
        cur.execute("SELECT (id_buku) as ranking, kode_buku, nama_buku "
                    " FROM tbl_buku as b "
                    " WHERE id_buku in (" + res + ") "
                    " ORDER BY FIELD(id_buku," + res + ")")

        rv = cur.fetchall()

        pdf = FPDF()
        pdf.add_page()

        page_width = pdf.w - 2 * pdf.l_margin

        pdf.set_font('Times', 'B', 14.0)
        pdf.cell(page_width, 0.0, 'Data Ranking', align='C')
        pdf.ln(10)

        pdf.set_font('Courier', '', 12)

        col_width = page_width / 4

        pdf.ln(1)

        th = pdf.font_size

        for row in rv:
            pdf.cell(col_width, th, str(row['ranking']), border=1)
            pdf.cell(col_width, th, row['kode_buku'], border=1)
            pdf.cell(col_width, th, row['nama_buku'], border=1)
            pdf.ln(th)

        pdf.ln(10)

        pdf.set_font('Times', '', 10.0)
        pdf.cell(page_width, 0.0, '- end of report -', align='C')

        result = pdf.output(dest='S').encode('latin-1')
        # return Response(pdf.output(dest='S').encode('latin-1'), mimetype='application/pdf',
        #                 headers={'Content-Disposition': 'attachment;filename=ranking_buku.pdf'})

        return Response('OK')

    except Exception as e:
        print(e)
