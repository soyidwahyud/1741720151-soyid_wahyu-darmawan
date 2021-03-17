import axios from 'axios'

export const getUser = () => {
  return axios
    .get('/user', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var tbl_user = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        tbl_user.push([
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

      return tbl_user
    })
}

export const deleteUser = id_user => {
  axios
    .delete(
      `/user/${id_user}`, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
    .catch((res) => {
      console.log(res)
    })
}

export const updateUser = (nik, username_user, email_user, password_user, nama_user, alamat, notelp, id_user) => {
  return axios
    .put(
      `/user/${id_user}`, {
        nik: nik,
        username_user: username_user,
        email_user: email_user,
        password_user: password_user,
        nama_user: nama_user,
        alamat : alamat,
        notelp : notelp
      }, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
}
