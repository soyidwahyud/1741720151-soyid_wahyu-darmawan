import axios from 'axios'

export const register = newUser => {
  return axios
    .post('user/register', {
      id_user: newUser.id_user,
      nik : newUser.nik,
      nama_user : newUser.nama_user,
      username_user : newUser.username_user,
      email_user : newUser.email_user,
      password_user : newUser.password_user,
      alamat : newUser.alamat,
      notelp : newUser.notelp
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = user => {
  return axios
    .post('user/login', {
      username_user: user.username_user,
      password_user: user.password_user
    })
    .then(response => {
      // localStorage.setItem('admintoken', response.data)
      localStorage.setItem('usertoken', JSON.stringify(response.data))
      return response.data
      localStorage.getItem('usertoken')
    })
    .catch(err =>{
      console.log(err)
      return {error:err};
    })
}

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
