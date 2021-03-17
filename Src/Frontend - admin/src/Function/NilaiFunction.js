import axios from 'axios'

//SELECT Nilai
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
          val.nama_user,
          val.kode_buku,
          val.nama_buku,
          val.kelayakan_isi,
          val.kebahasaan,
          val.penyajian,
          val.kegrafikaan])
      })
      return tbl_nilai_buku
    })
}

//SELECT id user
export const getIdUser = () => {
  return axios
    .get('/nilai_buku/user', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var iduser = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        iduser.push([
          val.id_user,
          val.nama_user])
      })

      return iduser
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
export const addNilaiBuku = newNilai => {
  return axios
    .post(
      '/nilai_buku', {
        id_user: newNilai.id_user,
        id_buku: newNilai.id_buku,
        kelayakan_isi: newNilai.kelayakan_isi,
        kebahasaan: newNilai.kebahasaan,
        penyajian: newNilai.penyajian,
        kegrafikaan: newNilai.kegrafikaan
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

export const updateNilaiBuku = (id_user, id_buku, kelayakan_isi, kebahasaan, penyajian, kegrafikaan, id_nilai_buku) => {
  return axios
    .put(
      `/nilai_buku/${id_nilai_buku}`, {
        id_user: id_user,
        id_buku: id_buku,
        kelayakan_isi: kelayakan_isi,
        kebahasaan: kebahasaan,
        penyajian: penyajian,
        kegrafikaan: kegrafikaan,
        id_nilai_buku: id_nilai_buku,
      }, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
}

