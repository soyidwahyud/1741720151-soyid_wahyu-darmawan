import axios from 'axios'

export const getNakes = () => {
  return axios
    .get('/nakes', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var tbl_nakes = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        tbl_nakes.push([
          val.id_nakes,
          val.tenaga_kesehatan])
      })

      return tbl_nakes
    })
}

export const addNakes = newNakes => {
  return axios
    .post(
      '/nakes', {
        tenaga_kesehatan: newNakes.tenaga_kesehatan
      }, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
}

export const deleteNakes = id_nakes => {
  axios
    .delete(
      `/nakes/${id_nakes}`, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
    .catch((res) => {
      console.log(res)
    })
}

export const updateNakes = (tenaga_kesehatan, id_nakes) => {
  return axios
    .put(
      `/nakes/${id_nakes}`, {
        tenaga_kesehatan: tenaga_kesehatan
      }, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
}
