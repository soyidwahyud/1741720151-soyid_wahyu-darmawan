import axios from 'axios'

//READ ALL KRITERIA
export const getAllKriteria = () => {
  return axios
    .get('/all_kriteria', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var all_kriteria = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        all_kriteria.push([
          val.id_kriteria,
          val.nama_kriteria,
          val.bobot,
          val.tipe_kriteria])
      })

      return all_kriteria
    })
}
//READ ALL ALTERNATIF
export const getAllAlternatif = () => {
  return axios
    .get('/all_alternatif', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var all_alternatif = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        all_alternatif.push([
          val.id_buku,
          val.kode_buku,
          val.nama_buku])
      })

      return all_alternatif
    })
}
//Baris ALTERNATIF
export const getBarisAlternatif = () => {
  return axios
    .get('/baris_alternatif', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var baris_alternatif = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        baris_alternatif.push([
          val.baris])
      })

      return baris_alternatif
    })
}
//Kolom ALTERNATIF
export const getKolomAlternatif = () => {
  return axios
    .get('/kolom_alternatif', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var kolom_alternatif = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        kolom_alternatif.push([
          val.kolom])
      })

      return kolom_alternatif
    })
}

//SELECT Matriks Nilai
export const getMatriksNilai = () => {
  return axios
    .get('/matriks_nilai', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var matriks_nilai = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        matriks_nilai.push([
          val.kode_buku,
          val.kode,
          val.nilai_buku])
      })

      return matriks_nilai
    })
}
//SELECT Matriks Kriteria
export const getMatriksKriteria = () => {
  return axios
    .get('/matriks_kriteria', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var matriks_kriteria = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        matriks_kriteria.push([
          val.kode,
          val.bobot])
      })

      return matriks_kriteria
    })
}
//SELECT Matriks Alternatif
export const getMatriksAlternatif = () => {
  return axios
    .get('/matriks_alternatif', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var matriks_alternatif = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        matriks_alternatif.push([
          val.kode_buku
        ])
      })

      return matriks_alternatif
    })
}

//SELECT All Data
export const getAllData = () => {
  return axios
    .get('/all_data', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var all_data = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        all_data.push([
          val.nilai_buku
        ])
      })

      return all_data
    })
}
//SELECT All Data
export const getMatriks = () => {
  return axios
    .get('/get_matriks', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var get_matriks = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        get_matriks.push([
          val.alternatif,
          val.bobot,
          val.kriteria,
          val.nilai_alternatif,
          val.tipe_kriteria
        ])
      })

      return get_matriks
    })
}
//pembagi
export const getPembagi = () => {
  return axios
    .get('/get_pembagi', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var get_pembagi = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        get_pembagi.push([
          val.pembagi
        ])
      })

      return get_pembagi
    })
}
//Normalisasi
export const getNormalisasi = () => {
  return axios
    .get('/get_normalisasi', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var get_normalisasi = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        get_normalisasi.push([
          val.normalisasi
        ])
      })

      return get_normalisasi
    })
}
//Perankingan
export const getPerankingan = () => {
  return axios
    .get('/get_ranking', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var get_ranking = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        get_ranking.push([
          val.ranking_alternatif,
          val.hasil_ranking
        ])
      })

      return get_ranking
    })
}
