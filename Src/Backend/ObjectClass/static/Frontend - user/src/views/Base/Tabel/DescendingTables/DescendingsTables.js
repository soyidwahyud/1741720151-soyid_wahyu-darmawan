import React, { Component } from 'react';
import {
  Badge,
  Card,
  CardBody, CardFooter,
  CardHeader,
  Col,
  Form, FormGroup, FormText, Input, Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table
} from 'reactstrap';
import {Button} from 'reactstrap'
import {getJenis, addJenis, updateJenis, deleteJenis} from '../../../../Function/JenisFunction'
import {getDescendingBuku} from "../../../../Function/MenuBukuFunction";
import {Link} from "react-router-dom";
import Book from "../BukuTables/Buku";



class DescendingsTables extends Component {
  state = {
    ListBukuDescending:[]
  }
  componentDidMount() {
    this.ambilDataDariServerAPI()
  }
  ambilDataDariServerAPI = () =>{
    fetch('http://127.0.0.1:5000/buku_descending')
      .then(response => response.json())
      .then(jsonHasilAmbilDariAPI => {
        this.setState({
          ListBukuDescending: jsonHasilAmbilDariAPI
        })
      })
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          {
            this.state.ListBukuDescending.map(buku => {
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

export default DescendingsTables;
