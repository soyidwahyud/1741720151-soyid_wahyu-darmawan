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

  ambilDataTahunTerbaru = () => {
    fetch('http://127.0.0.1:5000/tahun_ascending')
      .then(response => response.json())
      .then(jsonHasilAmbilDariAPI => {
        this.setState({
          ListBuku: jsonHasilAmbilDariAPI
        })
      })
  }

  ambilDataTahunTerlama = () => {
    fetch('http://127.0.0.1:5000/tahun_descending')
      .then(response => response.json())
      .then(jsonHasilAmbilDariAPI => {
        this.setState({
          ListBuku: jsonHasilAmbilDariAPI
        })
      })
  }

  ambilDataBukuAscending = () => {
    fetch('http://127.0.0.1:5000/buku_ascending')
      .then(response => response.json())
      .then(jsonHasilAmbilDariAPI => {
        this.setState({
          ListBuku: jsonHasilAmbilDariAPI
        })
      })
  }

  ambilDataBukuDescending = () => {
    fetch('http://127.0.0.1:5000/buku_descending')
      .then(response => response.json())
      .then(jsonHasilAmbilDariAPI => {
        this.setState({
          ListBuku: jsonHasilAmbilDariAPI
        })
      })
  }

  handleChange(filter){
    if(filter == "tahun_ascending"){
      this.ambilDataTahunTerbaru()
    }
    else if(filter == "tahun_descending"){
      this.ambilDataTahunTerlama()
    }
    else if(filter == "judul_ascending"){
      this.ambilDataBukuAscending()
    }
    else if(filter == "judul_descending"){
      this.ambilDataBukuDescending()
    }
    else{
      this.ambilDataDariServerAPI()
    }
  }

  componentDidMount() {
    // this.getBukuMenu()
    this.ambilDataDariServerAPI()
  }
  render() {
    return (
      <div className="animated fadeIn">
        <br/>
          <from>
            <select onChange={(val) => this.handleChange(val.target.value)}>
              <option value="0">Diurutkan dari:</option>
              <option value="Buku">Buku</option>
              <option value="tahun_ascending">Tahun Terbit Terlama</option>
              <option value="tahun_descending">Tahun Terbit Terbaru</option>
              <option value="judul_ascending">Judul Buku A - Z</option>
              <option value="judul_descending">Judul Buku Z - A</option>
            </select>
          </from>
        <br/>
        <br/>
        <Card>
          <CardBody>
            <p>Menu ini menampilkan data keseluruhan semua buku yang ada pada database pada tabel buku</p>
          </CardBody>
        </Card>
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
