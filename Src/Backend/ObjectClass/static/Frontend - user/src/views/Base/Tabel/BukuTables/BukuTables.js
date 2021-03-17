import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

import Book from "./Buku";

class BukuTables extends Component {

  state = {
    ListBuku:[]
  }
  ambilDataDariServerAPI = () =>{
    fetch('http://127.0.0.1:5000/buku')
      .then(response => response.json())
      .then(jsonHasilAmbilDariAPI => {
        this.setState({
          ListBuku: jsonHasilAmbilDariAPI
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
            this.state.ListBuku.map(buku => {
              return <Book key={buku.id_buku}
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

export default BukuTables;
