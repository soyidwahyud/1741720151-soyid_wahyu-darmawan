import axios from 'axios'

//SELECT Buku
export const getBuku = () => {
  return axios
    .get('/buku', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var tbl_buku = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        tbl_buku.push([
          val.id_buku,
          val.kode_buku,
          val.nama_buku,
          val.jenis_buku,
          val.tenaga_kesehatan,
          val.nama_penerbit,
          val.tahun_terbit,
          val.nama_penulis,
          val.gambar,
          val.userfile])
      })

      return tbl_buku
    })
}
//SELECT jenis
export const getIdJenis = () => {
  return axios
    .get('/buku/jenis', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var idjenis = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        idjenis.push([
          val.id_jenis,
          val.jenis_buku])
      })

      return idjenis
    })
}
//SELECT jenis
export const getIdNakes = () => {
  return axios
    .get('/buku/nakes', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var idnakes = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        idnakes.push([
          val.id_nakes,
          val.tenaga_kesehatan])
      })

      return idnakes
    })
}
//SELECT penerbit
export const getIdPenerbit = () => {
  return axios
    .get('/buku/penerbit', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var idpenerbit = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        idpenerbit.push([
          val.id_penerbit,
          val.nama_penerbit,
          val.tahun_terbit])
      })
      return idpenerbit
    })
}
//SELECT penulis
export const getIdPenulis = () => {
  return axios
    .get('/buku/penulis', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var idpenulis = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        idpenulis.push([
          val.id_penulis,
          val.nama_penulis])
      })
      return idpenulis
    })
}

export const addBuku = newBuku => {
  return axios
    .post(
      '/buku', {
        kode_buku: newBuku.kode_buku,
        nama_buku: newBuku.nama_buku,
        id_jenis: newBuku.id_jenis,
        id_nakes: newBuku.id_nakes,
        id_penerbit: newBuku.id_penerbit,
        id_penulis: newBuku.id_penulis,
        gambar: newBuku.gambar,
        userfile: newBuku.userfile
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json",
          "type": "formData"
          }
      })
    .then((res) => {
      console.log(res)
    })
}

export const deleteBuku = id_buku => {
  axios
    .delete(
      `/buku/${id_buku}`, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
    .catch((res) => {
      console.log(res)
    })
}

export const updateBuku = (kode_buku, nama_buku, id_jenis, id_nakes, id_penerbit, id_penulis, gambar, userfile, id_buku ) => {
  return axios
    .put(
      `/buku/${id_buku}`, {
        kode_buku: kode_buku,
        nama_buku: nama_buku,
        id_jenis: id_jenis,
        id_nakes: id_nakes,
        id_penerbit: id_penerbit,
        id_penulis: id_penulis,
        gambar: gambar,
        userfile: userfile,
        id_buku: id_buku
      }, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
}
