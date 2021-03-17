import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';
import {Button} from 'reactstrap'
import Nakes from "./Nakes";


class BukuFarmasi extends Component {
  state = {
    ListBukuFarmasi:[]
  }
  ambilDataDariServerAPI = () =>{
    fetch('http://127.0.0.1:5000/buku_farmasi')
      .then(response => response.json())
      .then(jsonHasilAmbilDariAPI => {
        this.setState({
          ListBukuFarmasi: jsonHasilAmbilDariAPI
        })
      })
  }

  componentDidMount() {
    // this.getBukuMenu()
    this.ambilDataDariServerAPI()
  }
  render() {
    return (
      <div className="animated fadeIn">

        <br/>
        <br/>
        <Row>
          {
            this.state.ListBukuFarmasi.map(buku => {
              return <Nakes key={buku.id_buku}
                            id={buku.id_buku}
                            gambar = {buku.gambar}
                            nama_buku={buku.nama_buku}
                            nama_penulis={buku.nama_penulis}
                            nama_penerbit={buku.nama_penerbit}
                            tahun_terbit={buku.tahun_terbit}
                            jenis_buku={buku.jenis_buku}
                            tenaga_kesehatan = {buku.tenaga_kesehatan}
                            LinkDetail={"detail?no="+buku.id_buku}
              />
            })
          }

        </Row>
      </div>

    );
  }
}

export default BukuFarmasi;

