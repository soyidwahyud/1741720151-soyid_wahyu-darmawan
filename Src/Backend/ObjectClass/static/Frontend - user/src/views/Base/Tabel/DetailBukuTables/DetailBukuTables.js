import React, { Component } from 'react';

import Detail from "./Detail";
import Modal from 'react-awesome-modal';

import jwt_decode from "jwt-decode";
import {addNilaiBuku} from '../../../../Function/NilaiFunction'


const buku2 = {
  marginLeft: 85,
  marginRight: 25,
  textAlign:'center',
  width: 200,
  height: 200
}

class DetailBukuTables extends Component {
  getJWT = () => {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      id_user: decoded.identity.id_user
    })
  }

  constructor() {
    super();
    this.state = {
      DetailBuku:[],
      // id_user:'',
      id_buku:Number(window.location.hash.replace("#/base/detail?no=","")),
      id_user2:'',
      id_buku2:'',
      kelayakan_isi:'',
      kebahasaan:'',
      penyajian:'',
      kegrafikaan:'',
      visible:false
    }
    this.onIdUser = this.onIdUser.bind(this)
    this.onIdBuku = this.onIdBuku.bind(this)
    this.onKelayakanIsi = this.onKelayakanIsi.bind(this)
    this.onKebahasaan = this.onKebahasaan.bind(this)
    this.onPenyajian = this.onPenyajian.bind(this)
    this.onKegrafikaan = this.onKegrafikaan.bind(this)
  }


  openModal(){
    this.setState({
      visible : true
    })
  }
  closeModal(){
    this.setState({
      visible : false
    })
  }

  onIdUser = e => {
    this.setState({
      // id_user2: e.target.value
      id_user:e.id_user
    })
  }
  onIdBuku = e => {
    this.setState({
      id_buku: e.id_buku
    })
  }

  onKelayakanIsi = e => {
    this.setState({
      kelayakan_isi: e.target.value
    })
  }

  onKebahasaan = e => {
    this.setState({
      kebahasaan: e.target.value
    })
  }

  onPenyajian = e => {
    this.setState({
      penyajian: e.target.value
    })
  }

  onKegrafikaan = e => {
    this.setState({
      kegrafikaan: e.target.value
    })
  }



  //INSERT
  onSubmit = e => {
    e.preventDefault()

    const newNilai={
      id_user: this.state.id_user,
      id_buku: this.state.id_buku,
      kelayakan_isi: this.state.kelayakan_isi,
      kebahasaan: this.state.kebahasaan,
      penyajian: this.state.penyajian,
      kegrafikaan: this.state.kegrafikaan
    }

    addNilaiBuku(newNilai)
      .then(() => {

        // console.log(`/base/detail?no=` + window.location.hash.replace("#/base/detail?no=",""))
        // this.props.history.push(`/base/detail?no=` + Number(window.location.hash.replace("#/base/detail?no=","")))
        alert("Penilaian Berhasil!!")
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
                                   // id_buku2 = {buku.id_buku}
                                   id_buku2 = {this.state.id_buku}
                                   kelayakan_isi = {this.state.kelayakan_isi || ''}
                                   kebahasaan = {this.state.kebahasaan || ''}
                                   penyajian = {this.state.penyajian || ''}
                                   kegrafikaan = {this.state.kegrafikaan || ''}
                                   onSubmit = {this.onSubmit}
                                   onIdBuku = {this.onIdBuku}
                                   onIdUser = {this.onIdUser}
                                   onKelayakanIsi = {this.onKelayakanIsi.bind(this)}
                                   onKebahasaan = {this.onKebahasaan.bind(this)}
                                   onPenyajian = {this.onPenyajian.bind(this)}
                                   onKegrafikaan = {this.onKegrafikaan.bind(this)}
                                   onClick = {this.onSubmit.bind(this)}
                                   // onClick = {alert("test")}
                                   gambar = {buku.gambar}
                                   nama_buku={buku.nama_buku}
                                   jenis_buku={buku.jenis_buku}
                                   nama_penerbit={buku.nama_penerbit}
                                   nama_penulis={buku.nama_penulis}
                                   tahun_terbit ={buku.tahun_terbit}
                                   userfile = {buku.userfile}

                    />
                  }
          })
        }

      </div>
    );
  }
}
export default DetailBukuTables
