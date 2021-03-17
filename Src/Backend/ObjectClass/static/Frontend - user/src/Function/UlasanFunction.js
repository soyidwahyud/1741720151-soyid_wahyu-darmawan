import axios from 'axios'

export const getUlasan = () => {
  return axios
    .get('/ulasan', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var tbl_user = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        tbl_user.push([
          val.id_ulasan,
          val.nama_depan,
          val.nama_belakang,
          val.email,
          val.judul,
          val.pesan])
      })

      return tbl_user
    })
}

export const addUlasan = newUlasan => {
  return axios
    .post(
      '/ulasan', {
        nama_depan: newUlasan.nama_depan,
        nama_belakang: newUlasan.nama_belakang,
        email: newUlasan.email,
        judul: newUlasan.judul,
        pesan: newUlasan.pesan,
      }, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
}

export const deleteUlasan = id_ulasan => {
  axios
    .delete(
      `/ulasan/${id_ulasan}`, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
    .catch((res) => {
      console.log(res)
    })
}
