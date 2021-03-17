import axios from "axios";
import AuthAdminHeader from "./AuthAdminHeader";

export const register = newAdmin => {
  return axios
    .post('admin/register', {
      id_admin: newAdmin.id_admin,
      nama_admin : newAdmin.nama_admin,
      username_admin : newAdmin.username_admin,
      email_admin : newAdmin.email_admin,
      password_admin : newAdmin.password_admin
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = admin => {
  return axios
    .post('admin/login', {
      username_admin: admin.username_admin,
      password_admin: admin.password_admin
    })
    .then(response => {
      // localStorage.setItem('admintoken', response.data)
      localStorage.setItem('admintoken', JSON.stringify(response.data))
      return response.data
    })
    .catch(err =>{
      console.log(err)
      return {error:err};
    })
}
export const getCurrentAdmin = () =>{
  return JSON.parse(localStorage.getItem("admintoken"))
}
export const getProfile = admin => {
  return axios
    .get('admin/profile', {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}
export const getAdmin = () => {
  return axios
    .get('/admin', {
      // headers: { "Content-type": "application/json" }
      headers: AuthAdminHeader()
    })
    .then(res => {
      var tbl_admin = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        tbl_admin.push([
          val.id_admin,
          val.username_admin,
          val.email_admin,
          val.password_admin,
          val.nama_admin])
      })
      return tbl_admin
    })
}

export const deleteAdmin = id_admin => {
  axios
    .delete(
      `/admin/${id_admin}`, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
    .catch((res) => {
      console.log(res)
    })
}
