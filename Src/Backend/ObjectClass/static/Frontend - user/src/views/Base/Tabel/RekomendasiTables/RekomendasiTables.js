import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

import Rekomendasi from "./Rekomendasi";

class RekomendasiTables extends Component {

  state = {
    RekomendasiBuku:[]
  }
  ambilDataDariServerAPI = () =>{
    fetch('http://127.0.0.1:5000/buku_vikor')
      .then(response => response.json())
      .then(jsonHasilAmbilDariAPI => {
        this.setState({
          RekomendasiBuku: jsonHasilAmbilDariAPI
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
            this.state.RekomendasiBuku.map(rekomendasi => {
              return <Rekomendasi key={rekomendasi.id_buku}
                           id={rekomendasi.id_buku}
                           gambar = {rekomendasi.gambar}
                           nama_buku={rekomendasi.nama_buku}
                           nama_penulis={rekomendasi.nama_penulis}
                           nama_penerbit={rekomendasi.nama_penerbit}
                           tahun_terbit={rekomendasi.tahun_terbit}
                           jenis_buku={rekomendasi.jenis_buku}
                           tenaga_kesehatan = {rekomendasi.tenaga_kesehatan}
                           LinkDetail={"detail?no="+rekomendasi.id_buku}
              />
            })
          }

        </Row>
      </div>

    );
  }
}

export default RekomendasiTables;
