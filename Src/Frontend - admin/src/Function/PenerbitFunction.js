import axios from 'axios'

export const getPenerbit = () => {
  return axios
    .get('/penerbit', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var tbl_penerbit = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        tbl_penerbit.push([
          val.id_penerbit,
          val.nama_penerbit,
          val.tahun_terbit])
      })

      return tbl_penerbit
    })
}

export const addPenerbit = newPenerbit => {
  return axios
    .post(
      '/penerbit', {
        nama_penerbit: newPenerbit.nama_penerbit,
        tahun_terbit: newPenerbit.tahun_terbit
      }, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
}

export const deletePenerbit = id_penerbit => {
  axios
    .delete(
      `/penerbit/${id_penerbit}`, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
    .catch((res) => {
      console.log(res)
    })
}

export const updatePenerbit = (nama_penerbit, tahun_terbit, id_penerbit) => {
  return axios
    .put(
      `/penerbit/${id_penerbit}`, {
        nama_penerbit: nama_penerbit,
        tahun_terbit : tahun_terbit
      }, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
}
