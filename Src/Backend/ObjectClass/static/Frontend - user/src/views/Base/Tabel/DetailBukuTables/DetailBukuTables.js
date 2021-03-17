import React, { Component } from 'react';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  Form,
  Button
} from 'reactstrap';

import Detail from "./Detail";
import Book from "../BukuTables/Buku";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import CardFooter from "reactstrap/es/CardFooter";
import jwt_decode from "jwt-decode";


const buku = {
  marginLeft: 85,
  marginRight: 25,
  textAlign:'center',
  width: 200,
  height: 200
}

class DetailBukuTables extends Component {
  constructor() {
    super();
    this.state = {
      DetailBuku:[],
      id_user:'',
      id_user2:'',
      id_buku2:'',
    }
    this.onIdUser = this.onIdUser.bind(this)
    this.onIdBuku = this.onIdBuku.bind(this)
  }
  // state = {
  //   DetailBuku:[],
  //   id_user:'',
  //   id_user2:'',
  //   id_buku2:'',
  // }
  onIdUser = e => {
    this.setState({
      id_user2: e.target.value
    })
  }
  onIdBuku = e => {
    this.setState({
      id_buku2: e.target.value
    })
  }

  ambilDataDariServerAPI = () =>{
    fetch('http://127.0.0.1:5000/buku')
      .then(response => response.json())
      .then(jsonHasilAmbilDariAPI => {
        this.setState({
          DetailBuku: jsonHasilAmbilDariAPI
        })
      })
  }

  getJWT = () => {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      id_user: decoded.identity.id_user
    })
  }

  componentDidMount() {
    this.ambilDataDariServerAPI()
    this.getJWT()
  }
  render() {
    return(
      <div className="halaman container">

              {
                this.state.DetailBuku.map(buku => {
                  if(buku.id_buku === Number(window.location.hash.replace("#/base/detail?no=",""))){

                  console.log(window.location.hash.replace("#/base/detail?no=",""))
                    return <Detail key={buku.id_buku}
                                   id_buku={buku.id_buku}
                                   id_user = {this.state.id_user}
                                   onChange = {this.onIdUser}
                                   id_buku2 = {this.state.id_buku2}
                                   onChange2 = {this.onIdBuku}
                                   gambar = {buku.gambar}
                                   nama_buku={buku.nama_buku}
                                   jenis_buku={buku.jenis_buku}
                                   nama_penerbit={buku.nama_penerbit}
                                   nama_penulis={buku.nama_penulis}
                                   tahun_terbit ={buku.tahun_terbit}
                                   userfile = {buku.userfile}
                      // Link={buku.userfile}
                    />
                  }
          })
        }
      </div>
    );
  }
}
export default DetailBukuTables
