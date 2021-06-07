import numpy as np
symbols = "!\"#$%&()*+-./:;<=>?@[\]^_`{|}~\n"

alternatif = ["b1","b2","b3","b4","b5","b6","b7","b8","b9","b10","b12","b13","b14","b15","b33","b37","b41"]
kriteria = ["kriteria 1", "kriteria 2", "kriteria 3", "kriteria 4"]
tipe_kriteria = ["benefit", "benefit", "benefit", "benefit"]
bobot_kriteria = [0.3, 0.25, 0.28, 0.17]
matriks_keputusan = [
    [7, 6.5, 7.5, 8.5],
    [6, 4, 8, 4.5],
    [4.33, 5, 7.67, 5.67],
    [3.5, 5.5, 6, 8],

    [3, 4, 7, 10],
    [2, 2, 3, 6],
    [5, 4, 6, 4],
    [5, 7, 4, 9],

    [3, 4, 2, 8],
    [2, 3, 5, 9],
    [7, 8, 8, 4],
    [4, 3, 5, 4],

    [4, 6, 9, 6],
    [4.5, 6.5, 5.5, 7],
    [7, 5, 5, 6],
    [4, 5, 8, 6],
    [7, 5, 6, 9]
]
nilai_maksimum = []
nilai_minimum = []
for i in range(len(kriteria)):
    nilai_maksimum.append(0)
    nilai_minimum.append(0)
    for j in range(len(alternatif)):
        if((j == 0) or (nilai_maksimum[i] < matriks_keputusan[j][i])):
            nilai_maksimum[i] = matriks_keputusan[j][i]
        if((j == 0) or (nilai_minimum[i] > matriks_keputusan[j][i])):
            nilai_minimum[i] = matriks_keputusan[j][i]

matriks_normalisasi = []
for i in range(len(alternatif)):
    matriks_normalisasi.append([])
    for j in range(len(kriteria)):
        matriks_normalisasi[i].append(0)
        if tipe_kriteria[j] == "cost":
            matriks_normalisasi[i][j] = (matriks_keputusan[i][j] - nilai_minimum[j]) / (nilai_maksimum[j] - nilai_minimum[j])
        else: #tipe_kriteria[j] == "benefit":
            matriks_normalisasi[i][j] = (nilai_maksimum[j] - matriks_keputusan[i][j]) / (nilai_maksimum[j] - nilai_minimum[j])

matriks_normalisasi_terbobot = []
for i in range(len(alternatif)):
    matriks_normalisasi_terbobot.append([])
    for j in range(len(kriteria)):
        matriks_normalisasi_terbobot[i].append(0)
        matriks_normalisasi_terbobot[i][j] = matriks_normalisasi[i][j] * bobot_kriteria[j]

Si = []
Ri = []
for i in range(len(alternatif)):
    Si.append(0)
    Ri.append(0)
    for j in range(len(kriteria)):
        Si[i] = Si[i] + matriks_normalisasi_terbobot[i][j]
        if((j == 0 ) or (Ri[i] < matriks_normalisasi_terbobot[i][j])):
            Ri[i] = matriks_normalisasi_terbobot[i][j]

Splus = max(Si)
Smin = min(Si)
Rplus = max(Ri)
Rmin = min (Ri)
V = 0.5

hasil_akhir = []
for i in range(len(alternatif)):
    hasil_akhir.append(0)
    hasil_akhir[i] = (V * ((Si[i] - Smin) / (Splus - Smin))) + ((1 - V) * ((Ri[i] - Rmin) / (Rplus - Rmin)))

alternatif_ranking = []
hasil_akhir_ranking = []
for i in range(len(alternatif)):
    alternatif_ranking.append(alternatif[i])
    hasil_akhir_ranking.append(hasil_akhir[i])

for i in range(len(alternatif)):
    for j in range(len(alternatif)):
        if j > i:
            if(hasil_akhir_ranking[i] > hasil_akhir_ranking[j]):
                tmp_alternatif = alternatif_ranking[i]
                tmp_hasil_akhir = hasil_akhir_ranking[i]
                alternatif_ranking[i] = alternatif_ranking[j]
                hasil_akhir_ranking[i] = hasil_akhir_ranking[j]
                alternatif_ranking[j] = tmp_alternatif
                hasil_akhir_ranking[j] = tmp_hasil_akhir

print(str(alternatif))
print()
print(str(kriteria))
print()
print(str(tipe_kriteria))
print()
print(str(bobot_kriteria))
print()
print(str(matriks_keputusan))
print()
print(str(nilai_maksimum))
print()
print(str(nilai_minimum))
print()
print(str(matriks_normalisasi))
print()
print(str(matriks_normalisasi_terbobot))
print()
print(str(Si))
print()
print(str(Ri))
print()
print(str(Splus))
print()
print(str(Smin))
print()
print(str(Rplus))
print()
print(str(Rmin))
print()
print(str(alternatif))
print()
print(str(hasil_akhir))
print()
print(str(alternatif_ranking))

print(str(hasil_akhir_ranking))
