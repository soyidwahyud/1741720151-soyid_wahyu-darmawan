import axios from 'axios'

export const getJenis = () => {
  return axios
    .get('/jenis', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var tbl_jenis = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        tbl_jenis.push([
          val.id_jenis,
          val.jenis_buku])
      })

      return tbl_jenis
    })
}

export const addJenis = newJenis => {
  return axios
    .post(
      '/jenis', {
        jenis_buku: newJenis.jenis_buku
      }, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
}

export const deleteJenis = id_jenis => {
  axios
    .delete(
      `/jenis/${id_jenis}`, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
    .catch((res) => {
      console.log(res)
    })
}

export const updateJenis = (jenis_buku, id_jenis) => {
  return axios
    .put(
      `/jenis/${id_jenis}`, {
        jenis_buku: jenis_buku
      }, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
}
