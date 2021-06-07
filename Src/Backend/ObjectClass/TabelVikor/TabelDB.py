import json
import urllib.request

class TabelVikor():

    def data_IdBuku(self):
        response = urllib.request.urlopen("http://127.0.0.1:5000/id_buku_data")
        data = json.loads(response.read())
        id_buku = []
        for data_kriteria in data:
            if data_kriteria['id_buku'] not in id_buku:
                id_buku.append(data_kriteria['id_buku'])
        return id_buku

    def data_kelayakan(self):
        response = urllib.request.urlopen("http://127.0.0.1:5000/kelayakan_isi_data")
        data = json.loads(response.read())
        kelayakan_isi = []
        for i in self.data_IdBuku():
            row = []
            for nilai_perKriteria in data:
                if i == nilai_perKriteria['id_buku']:
                    row.append(nilai_perKriteria['kelayakan_isi'])
            kelayakan_isi.append(row)
        return kelayakan_isi

    def data_penyajian(self):
        response = urllib.request.urlopen("http://127.0.0.1:5000/penyajian_isi_data")
        data = json.loads(response.read())
        penyajian = []
        for i in self.data_IdBuku():
            row = []
            for nilai_perKriteria in data:
                if i == nilai_perKriteria['id_buku']:
                    row.append(nilai_perKriteria['penyajian'])
            penyajian.append(row)
        return penyajian

    def data_kebahasaan(self):
        response = urllib.request.urlopen("http://127.0.0.1:5000/kebahasaan_isi_data")
        data = json.loads(response.read())
        kebahasaan = []
        for i in self.data_IdBuku():
            row = []
            for nilai_perKriteria in data:
                if i == nilai_perKriteria['id_buku']:
                    row.append(nilai_perKriteria['kebahasaan'])
            kebahasaan.append(row)
        return kebahasaan

    def data_kegrafikaan(self):
        response = urllib.request.urlopen("http://127.0.0.1:5000/kegrafikaan_isi_data")
        data = json.loads(response.read())
        kegrafikaan = []
        for i in self.data_IdBuku():
            row = []
            for nilai_perKriteria in data:
                if i == nilai_perKriteria['id_buku']:
                    row.append(nilai_perKriteria['kegrafikaan'])
            kegrafikaan.append(row)
        return kegrafikaan

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

