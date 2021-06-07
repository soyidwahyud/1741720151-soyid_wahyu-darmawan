import axios from 'axios'

// cari kategori
export const cariNakes = pencarian_nakes => {
  return axios
    .post('/cari_nakes',{
      cari_nakes: pencarian_nakes.cari_nakes
    },{
      // headers :{
      //   // "Content-Type": "multipart/form-data",
      //   "Content-Type": "application/json",
      //   "Accept": "application/json",
      //   "type": "formData"
      // }
      headers: { "Content-type": "application/json" }
    }).then((res) => {
      console.log(res)
    })
}
