import axios from 'axios'

export const getPenulis = () => {
  return axios
    .get('/penulis', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var tbl_penulis = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        tbl_penulis.push([
          val.id_penulis,
          val.nama_penulis])
      })

      return tbl_penulis
    })
}

export const addPenulis = newPenulis => {
  return axios
    .post(
      '/penulis', {
        nama_penulis: newPenulis.nama_penulis
      }, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
}

export const deletePenulis = id_penulis => {
  axios
    .delete(
      `/penulis/${id_penulis}`, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
    .catch((res) => {
      console.log(res)
    })
}

export const updatePenulis = (nama_penulis, id_penulis) => {
  return axios
    .put(
      `/penulis/${id_penulis}`, {
        nama_penulis: nama_penulis
      }, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
}
