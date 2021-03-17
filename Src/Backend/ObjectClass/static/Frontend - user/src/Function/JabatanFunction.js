import axios from 'axios'

export const getJabatan = () => {
  return axios
    .get('/jabatan', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var tbl_jabatan = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        tbl_jabatan.push([
          val.id_jabatan,
          val.jabatan])
      })

      return tbl_jabatan
    })
}

export const addJabatan = newJabatan => {
  return axios
    .post(
      '/jabatan', {
        jabatan: newJabatan.jabatan
      }, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
}

export const deleteJabatan = id_jabatan => {
  axios
    .delete(
      `/jabatan/${id_jabatan}`, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
    .catch((res) => {
      console.log(res)
    })
}

export const updateJabatan = (jabatan, id_jabatan) => {
  return axios
    .put(
      `/jabatan/${id_jabatan}`, {
        jabatan: jabatan
      }, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
}
