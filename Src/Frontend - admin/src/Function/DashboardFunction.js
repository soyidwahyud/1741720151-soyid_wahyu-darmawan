import axios from 'axios'

export const getNewUser = () => {
  return axios
    .get('/user_baru', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var tbl_new_user = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        tbl_new_user.push([
          val.id_user,
          val.nik,
          val.nama_user,
          val.username_user,
          val.email_user,
          val.password_user,
          val.jabatan,
          val.alamat,
          val.notelp])
      })

      return tbl_new_user
    })
}

//SELECT Buku
export const getNewBuku = () => {
  return axios
    .get('/buku_baru', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var tbl_new_buku = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        tbl_new_buku.push([
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

      return tbl_new_buku
    })
}

//SELECT Nilai DESCENDING
export const getNilaiDescending = () => {
  return axios
    .get('/nilai_buku_descending', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var tbl_nilai_buku_descending = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        tbl_nilai_buku_descending.push([
          val.id_nilai_buku,
          val.nama_user,
          val.kode_buku,
          val.nama_buku,
          val.kelayakan_isi,
          val.kebahasaan,
          val.penyajian,
          val.kegrafikaan])
      })
      return tbl_nilai_buku_descending
    })
}
