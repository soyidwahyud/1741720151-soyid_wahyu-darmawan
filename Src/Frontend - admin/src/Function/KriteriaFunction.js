import axios from 'axios'

export const getKriteria = () => {
  return axios
    .get('/kriteria', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var tbl_kriteria = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        tbl_kriteria.push([
          val.id_kriteria,
          val.kode,
          val.nama_kriteria,
          val.bobot,
          val.tipe_kriteria])
      })

      return tbl_kriteria
    })
}


export const updateKriteria = (kode, nama_kriteria, bobot, tipe_kriteria, id_kriteria) => {
  return axios
    .put(
      `/kriteria/${id_kriteria}`, {
        kode: kode,
        nama_kriteria: nama_kriteria,
        bobot: bobot,
        tipe_kriteria: tipe_kriteria,
        id_kriteria: id_kriteria
      }, {
        headers: { "Content-type": "application/json" }
      })
    .then((res) => {
      console.log(res)
    })
}
