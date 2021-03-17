import React, {Component} from 'react';
// import Axios from 'axios';
import {AppContext} from '../../../Context'

class NormalisasiSAW extends Component{
  static contextType = AppContext;

  state = {
    data_normalisasi_saw:[]
  }


  fetchUsers = () => {
    fetch('http://127.0.0.1/backend_nilai_buku/data-normalisasi-saw.php')
      .then(response => {
        response.json().then(function(data) {
          if(data.success === 1){
            this.setState({
              data_normalisasi_saw:data.data_normalisasi_saw.reverse()
            });
          }
          else{
            this.context.post_show(false);
          }
        }.bind(this));
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount(){
    this.fetchUsers();
  }

  render() {
    let dataNormalisasiSaw = this.state.data_normalisasi_saw.map(({id_data, kode_alternatif, nama_buku,
                                                                halaman_buku,sasaran_buku,
                                                                penulisan_buku, hal_buku, informasi_fiktif}, index) => {
      return  (

        <tr key={id_data}>

          <td >{kode_alternatif}</td>
          <td >{nama_buku}</td>
          <td >{halaman_buku}</td>
          <td >{sasaran_buku}</td>
          <td >{penulisan_buku}</td>
          <td >{hal_buku}</td>
          <td >{informasi_fiktif}</td>

        </tr>
      );
    })
    return(
      <>
        {dataNormalisasiSaw}
      </>
    );
  }
}
export default NormalisasiSAW;
