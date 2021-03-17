import json
import urllib.request
import numpy as np

class CobaHitungVIKOR():
    def data_IdBuku(self):
        response = urllib.request.urlopen("http://127.0.0.1:5000/id_buku_data")
        data = json.loads(response.read())
        id_buku = []
        for data_kriteria in data:
            if data_kriteria['id_buku'] not in id_buku:
                id_buku.append(data_kriteria['id_buku'])
        return id_buku

    def data_Kriteria(self):
        response = urllib.request.urlopen("http://127.0.0.1:5000/kriteria_data")
        data = json.loads(response.read())
        nama_kriteria = []
        for data_kriteria in data:
            if data_kriteria['nama_kriteria'] not in nama_kriteria:
                nama_kriteria.append(data_kriteria['nama_kriteria'])
        return nama_kriteria

    def data_TipeKriteria(self):
        response = urllib.request.urlopen("http://127.0.0.1:5000/tipe_kriteria_data")
        data = json.loads(response.read())
        tipe_kriteria = []
        for data_kriteria in data:
            tipe_kriteria.append(data_kriteria['tipe_kriteria'])
        return tipe_kriteria

    def data_Bobot(self):
        response = urllib.request.urlopen("http://127.0.0.1:5000/bobot_data")
        data = json.loads(response.read())
        bobot = []
        for data_kriteria in data:
            if data_kriteria['bobot'] not in bobot:
                bobot.append(data_kriteria['bobot'])
        return bobot

    def data_matriks_keputusan(self):
        response = urllib.request.urlopen("http://127.0.0.1:5000/matriks_keputusan")
        data = json.loads(response.read())
        matriks_keputusan = []
        for i in self.data_IdBuku():
            row = []
            for nilai_perKriteria in data:
                if i == nilai_perKriteria['id_buku']:
                    row.append(nilai_perKriteria['kelayakan_isi'])
                    row.append(nilai_perKriteria['kebahasaan'])
                    row.append(nilai_perKriteria['penyajian'])
                    row.append(nilai_perKriteria['kegrafikaan'])
            matriks_keputusan.append(row)
        return matriks_keputusan

    def hitung_vikor(self, alternatif, kriteria, tipe_kriteria, bobot_kriteria, matriks_keputusan):
        # Menentukan nilai Maksimum dan Minimum
        nilai_maksimum = []
        nilai_minimum = []
        for i in range(len(kriteria)):
            nilai_maksimum.append(0)
            nilai_minimum.append(0)
            for j in range(len(alternatif)):
                if ((j == 0) or (nilai_maksimum[i] < matriks_keputusan[j][i])):
                    nilai_maksimum[i] = matriks_keputusan[j][i]
                if ((j == 0) or (nilai_minimum[i] > matriks_keputusan[j][i])):
                    nilai_minimum[i] = matriks_keputusan[j][i]

        # Matriks Normalisasi
        matriks_normalisasi = []
        for i in range(len(alternatif)):
            matriks_normalisasi.append([])
            for j in range(len(kriteria)):
                matriks_normalisasi[i].append(0)
                if tipe_kriteria[j] == "cost":
                    matriks_normalisasi[i][j] = (matriks_keputusan[i][j] - nilai_minimum[j]) / (nilai_maksimum[j] - nilai_minimum[j])
                elif tipe_kriteria[j] == "benefit":  # tipe_kriteria[j] == "benefit":
                    matriks_normalisasi[i][j] = (nilai_maksimum[j] - matriks_keputusan[i][j]) / (nilai_maksimum[j] - nilai_minimum[j])

        # Matriks Normalisasi Terbobot
        matriks_normalisasi_terbobot = []
        for i in range(len(alternatif)):
            matriks_normalisasi_terbobot.append([])
            for j in range(len(kriteria)):
                matriks_normalisasi_terbobot[i].append(0)
                matriks_normalisasi_terbobot[i][j] = matriks_normalisasi[i][j] * bobot_kriteria[j]

        # Menentukan nilai Si dan Ri
        Si = []
        Ri = []
        for i in range(len(alternatif)):
            Si.append(0)
            Ri.append(0)
            for j in range(len(kriteria)):
                Si[i] = Si[i] + matriks_normalisasi_terbobot[i][j]
                if ((j == 0) or (Ri[i] < matriks_normalisasi_terbobot[i][j])):
                    Ri[i] = matriks_normalisasi_terbobot[i][j]

        # Menentukan nilai Splus, Smin, Rplus, dan Rmin
        Splus = max(Si)
        Smin = min(Si)
        Rplus = max(Ri)
        Rmin = min(Ri)
        V = 0.5

        hasil_akhir = []
        for i in range(len(alternatif)):
            hasil_akhir.append(0)
            hasil_akhir[i] = (V * ((Si[i] - Smin) / (Splus - Smin))) + ((1 - V) * ((Ri[i] - Rmin) / (Rplus - Rmin)))

        # menentukan alternatif ranking dan hasil ranking
        alternatif_ranking = []
        hasil_akhir_ranking = []
        for i in range(len(alternatif)):
            alternatif_ranking.append(alternatif[i])
            hasil_akhir_ranking.append(hasil_akhir[i])

        for i in range(len(alternatif)):
            for j in range(len(alternatif)):
                if j > i:
                    if (hasil_akhir_ranking[i] > hasil_akhir_ranking[j]):
                        tmp_alternatif = alternatif_ranking[i]
                        tmp_hasil_akhir = hasil_akhir_ranking[i]
                        alternatif_ranking[i] = alternatif_ranking[j]
                        hasil_akhir_ranking[i] = hasil_akhir_ranking[j]
                        alternatif_ranking[j] = tmp_alternatif
                        hasil_akhir_ranking[j] = tmp_hasil_akhir

        return alternatif_ranking

    def hitung_Normalisasi(self, alternatif, kriteria, tipe_kriteria, matriks_keputusan):
        # Menentukan nilai Maksimum dan Minimum
        nilai_maksimum = []
        nilai_minimum = []
        for i in range(len(kriteria)):
            nilai_maksimum.append(0)
            nilai_minimum.append(0)
            for j in range(len(alternatif)):
                if ((j == 0) or (nilai_maksimum[i] < matriks_keputusan[j][i])):
                    nilai_maksimum[i] = matriks_keputusan[j][i]
                if ((j == 0) or (nilai_minimum[i] > matriks_keputusan[j][i])):
                    nilai_minimum[i] = matriks_keputusan[j][i]

        # Matriks Normalisasi
        matriks_normalisasi = []
        for i in range(len(alternatif)):
            matriks_normalisasi.append([])
            for j in range(len(kriteria)):
                matriks_normalisasi[i].append(0)
                if tipe_kriteria[j] == "cost":
                    matriks_normalisasi[i][j] = (matriks_keputusan[i][j] - nilai_minimum[j]) / (
                                nilai_maksimum[j] - nilai_minimum[j])
                elif tipe_kriteria[j] == "benefit":  # tipe_kriteria[j] == "benefit":
                    matriks_normalisasi[i][j] = (nilai_maksimum[j] - matriks_keputusan[i][j]) / (
                                nilai_maksimum[j] - nilai_minimum[j])

        alternatif_ranking = []
        for i in range(len(alternatif)):
            alternatif_ranking.append(alternatif[i])

        for i in range(len(alternatif)):
            for j in range(len(alternatif)):
                if j > i:
                    if (alternatif_ranking[i] > alternatif_ranking[j]):
                        tmp_alternatif = alternatif_ranking[i]
                        alternatif_ranking[i] = alternatif_ranking[j]
                        alternatif_ranking[j] = tmp_alternatif


        return matriks_normalisasi