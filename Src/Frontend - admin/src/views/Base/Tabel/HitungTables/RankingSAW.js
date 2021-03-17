import React, {Component} from 'react';
// import Axios from 'axios';
import {AppContext} from '../../../Context'

class RankingSAW extends Component{
  static contextType = AppContext;

  state = {
    data_final_saw:[]
  }

  fetchUsers = () => {
    fetch('http://localhost/backend_nilai_buku/data-ranking-saw.php')
      .then(response => {
        response.json().then(function(data) {
          if(data.success === 1){
            this.setState({
              data_final_saw:data.data_final_saw.reverse()
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
    let allRankingSaw = this.state.data_final_saw.map(({id_data, kode_alternatif, nama_buku, total}, index) => {

      return  (

        <tr key={id_data}>

          <td >{kode_alternatif}</td>
          <td >{nama_buku}</td>
          <td >{total}</td>

        </tr>
      );
    });
    return(
      <>
        {allRankingSaw}
      </>
    );
  }
}
export default RankingSAW

