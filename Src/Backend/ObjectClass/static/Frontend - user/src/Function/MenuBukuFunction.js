import axios from 'axios'

// select menu buku
export const getMenuBuku = () => {
  return axios
    .get('/buku_menu',{
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var buku_menu = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        buku_menu.push([
          val.id_buku,
          val.nama_buku,
          val.jenis_buku,
          val.nama_penerbit,
          val.tahun_terbit,
          val.nama_penulis,
          val.gambar])
      })

      return buku_menu
    })
}

// select ascending buku
export const getAscendingBuku = () => {
  return axios
    .get('/buku_ascending',{
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var buku_ascending = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        buku_ascending.push([
          val.nama_buku,
          val.jenis_buku,
          val.nama_penerbit,
          val.tahun_terbit,
          val.nama_penulis,
          val.gambar])
      })

      return buku_ascending
    })
}

// select descending buku
export const getDescendingBuku = () => {
  return axios
    .get('/buku_descending',{
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var buku_descending = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        buku_descending.push([
          val.nama_buku,
          val.jenis_buku,
          val.nama_penerbit,
          val.tahun_terbit,
          val.nama_penulis,
          val.gambar])
      })

      return buku_descending
    })
}

// select buku by id
export const getIdMenuBuku = (id_buku) => {
  return axios
    .get(`buku/detail/${id_buku}`,{
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var buku_id = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        buku_id.push([
          val.nama_buku,
          val.jenis_buku,
          val.nama_penerbit,
          val.tahun_terbit,
          val.nama_penulis,
          val.gambar,
          val.userfile])
      })

      return buku_id
    })
}

//post buku by id
export const postIdMenuBuku = (nama_buku, jenis_buku, nama_penerbit, tahun_terbit, nama_penulis, gambar, userfile,id_buku) => {
  return axios
    .post(`/buku/detail/${id_buku}`,{
      nama_buku: nama_buku,
      jenis_buku: jenis_buku,
      nama_penerbit: nama_penerbit,
      tahun_terbit: tahun_terbit,
      nama_penulis: nama_penulis,
      gambar: gambar,
      userfile: userfile
    }, {
      headers: { "Content-type": "application/json" }
    })
    .then((res) => {
      console.log(res)
    })
}
