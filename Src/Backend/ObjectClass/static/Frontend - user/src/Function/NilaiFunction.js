import axios from 'axios'

//SELECT Buku
export const getNilai = () => {
  return axios
    .get('/nilai_buku', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var tbl_nilai_buku = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        tbl_nilai_buku.push([
          val.id_nilai_buku,
          val.kode_buku,
          val.nama_buku,
          val.kode,
          val.nama_kriteria,
          val.bobot,
          val.nilai_buku])
      })

      return tbl_nilai_buku
    })
}
//SELECT id buku
export const getIdBuku = () => {
  return axios
    .get('/nilai_buku/buku', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var idbuku = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        idbuku.push([
          val.id_buku,
          val.nama_buku])
      })

      return idbuku
    })
}
//SELECT id kriteria
export const getIdKriteria = () => {
  return axios
    .get('/nilai_buku/kriteria', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var idkriteria = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        idkriteria.push([
          val.id_kriteria,
          val.kode,
          val.nama_kriteria])
      })

      return idkriteria
    })
}

export const addNilaiBuku = newNilai => {
  return axios
    .post(
      '/nilai_buku', {
        id_buku: newNilai.id_buku,
        id_kriteria: newNilai.id_kriteria,
        nilai_buku: newNilai.nilai_buku
      }, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
}

export const deleteNilai = id_nilai_buku => {
  axios
    .delete(
      `/nilai_buku/${id_nilai_buku}`, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
    .catch((res) => {
      console.log(res)
    })
}

export const updateNilaiBuku = (id_buku, id_kriteria, nilai_buku, id_nilai_buku) => {
  return axios
    .put(
      `/nilai_buku/${id_nilai_buku}`, {
        id_buku: id_buku,
        id_kriteria: id_kriteria,
        nilai_buku: nilai_buku,
        id_nilai_buku: id_nilai_buku,
      }, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
}

