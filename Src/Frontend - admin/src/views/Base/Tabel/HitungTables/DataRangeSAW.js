import React, {Component} from 'react'
// import axios from 'Axios'
import {AppContext} from '../../../Context'

class DataRangeSAW extends Component{
  static contextType = AppContext;

  state = {
    users: []
  }
  fetchUsers = () => {
    fetch('http://localhost/backend_nilai_buku/data-range.php')
      .then(response => {
        response.json().then(function(data) {
          if(data.success === 1){
            this.setState({
              users:data.users.reverse()
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
    let allData = this.state.users.map(({id_data, kode_alternatif, nama_buku,
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
    });

    return(
      <>
        {allData}
      </>
    );
  }
}
export default DataRangeSAW
