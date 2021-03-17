import axios from 'axios'

//SELECT Matriks
export const getMatriks = () => {
  return axios
    .get('/matriks', {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var matriks_keputusan = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        matriks_keputusan.push([
          val.kode_buku,
          val.kelayakan_isi,
          val.kebahasaan,
          val.penyajian,
          val.kegrafikaan])
      })
      return matriks_keputusan
    })
}

//SELECT Nilai Max
export const getNilaiMax = () => {
  return axios
    .get('/nilai_maks',{
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var nilai_maks = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        nilai_maks.push([
          val.kelayakan_isi,
          val.kebahasaan,
          val.penyajian,
          val.kegrafikaan])
      })
      return nilai_maks
    })
}

//SELECT Nilai Min
export const getNilaiMin = () => {
  return axios
    .get('/nilai_min',{
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var nilai_min = []
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key]
        nilai_min.push([
          val.kelayakan_isi,
          val.kebahasaan,
          val.penyajian,
          val.kegrafikaan])
      })
      return nilai_min
    })
}
