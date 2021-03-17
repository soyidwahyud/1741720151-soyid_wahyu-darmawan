import axios from 'axios'

export const searchBuku = cariBuku => {
  return axios
    .post(
      '/cari_buku', {
        nama_buku: cariBuku.nama_buku,
        tenaga_kesehatan: cariBuku.tenaga_kesehatan,
        nama_penerbit: cariBuku.nama_penerbit,
        tahun_terbit: cariBuku.tahun_terbit,
        nama_penulis: cariBuku.nama_penulis,
        jenis_buku: cariBuku.jenis_buku
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
