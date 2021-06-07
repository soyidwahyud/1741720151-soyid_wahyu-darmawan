import React, { Component, lazy, Suspense } from 'react';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import {getNewUser, getNewBuku, getNilaiDescending} from "../../Function/DashboardFunction";
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios'
import { Pie, Line, Bar, HorizontalBar } from 'react-chartjs-2';


class Dashboard extends Component {
  constructor() {
    // super(props);
    super();
    this.state = {
      //User
      id_user:'',
      nik:'',
      nama_user:'',
      username_user:'',
      email_user:'',
      password_user:'',
      jabatan:'',
      alamat:'',
      notelp:'',
      tbl_new_user:[],

    //  Nilai Buku
      id_nilai_buku:'',
      kelayakan_isi:'',
      kebahasaan:'',
      penyajian:'',
      kegrafikaan:'',
      tbl_nilai_buku_descending:[],

    //  Grafik
      grafik_bobot:{},
      grafik_nilai_buku:{},
      grafik_rata_rata:{},


    //  Buku
      //Get
      id_buku:'',
      jenis_buku:'',
      tenaga_kesehatan:'',
      nama_penerbit:'',
      tahun_terbit:'',
      nama_penulis:'',
      kode_buku:'',
      nama_buku:'',
      gambar:null,
      userfile:null,
      tbl_new_buku:[]
    }

  }
  componentDidMount() {
    this.getAllNewUser()
    this.getAllNewBuku()
    this.getAllNewNilai()
    this.getGrafikBobot()
    this.getGrafikNilaiBuku()
    this.getGrafikRataRata()

  }
  //Get Grafik Rata-Rata
  getGrafikRataRata = () =>{
    axios.get('/grafik_rata_rata')
      .then(res => {
        console.log(res)
        const rata_rata = res.data
        let id_buku = []
        let kelayakan_isi = []
        let kebahasaan = []
        let penyajian = []
        let kegrafikaan = []
        rata_rata.forEach(record => {
          id_buku.push(record.id_buku)
          kelayakan_isi.push(record.kelayakan_isi)
          kebahasaan.push(record.kebahasaan)
          penyajian.push(record.penyajian)
          kegrafikaan.push(record.kegrafikaan)
        })
        this.setState({
          grafik_rata_rata: {
            labels: id_buku,
            datasets:[
              {
                label: 'Kelayakan Isi',
                data: kelayakan_isi,
                backgroundColor: 'rgba(246,102,0,1)'
              },
              {
                label: 'Kebahasaan',
                data: kebahasaan,
                backgroundColor: 'rgba(118,248,2,1)',
              },
              {
                label: 'Penyajian',
                data: penyajian,
                backgroundColor: 'rgba(51,215,209,1)'
              },
              {
                label: 'Kegrafikaan',
                data: kegrafikaan,
                backgroundColor: 'rgba(255,99,132,1)'
              },
            ]
          }
        })
      })
  }

  //Get Grafik Bobot
  getGrafikBobot = () =>{
    axios.get('/grafik_bobot_kriteria')
      .then(res => {
        console.log(res)
        const nilai_bobot = res.data
        let nama_kriteria = []
        let bobot = []
        nilai_bobot.forEach(record => {
          nama_kriteria.push(record.nama_kriteria)
          bobot.push(record.bobot)
        })
        this.setState({
          grafik_bobot: {
            labels: nama_kriteria,
            datasets:[
              {
                label: 'Bobot Kriteria',
                data: bobot,
                backgroundColor: [
                  "#3cb371",
                  "#0000FF",
                  "#9966FF",
                  "#4C4CFF",
                  "#00FFFF",
                  "#f990a7",
                  "#aad2ed",
                  "#FF00FF",
                  "Blue",
                  "Red"
                ]
              }
            ]
          }
        })
      })
  }
  //Get Grafik Nilai Buku
  getGrafikNilaiBuku = () =>{
    axios.get('/grafik_nilai_buku')
      .then(res => {
        console.log(res)
        const nilai_buku = res.data
        let total = []
        let kode_buku = []
        nilai_buku.forEach(record => {
          total.push(record.total)
          kode_buku.push(record.kode_buku)
        })
        this.setState({
          grafik_nilai_buku: {
            labels: kode_buku,
            datasets:[
              {
                label: 'Nilai Buku',
                data: total,
                backgroundColor: [
                  "#3cb371",
                  "#0000FF",
                  "#9966FF",
                  "#4C4CFF",
                  "#00FFFF",
                  "#f990a7",
                  "#aad2ed",
                  "#FF00FF",
                  "Blue",
                  "Red"
                ]
              }
            ]
          }
        })
      })
  }
  //SELECT
  getAllNewUser = () => {
    getNewUser().then(tbl_new_user => {
      this.setState({
          id_user: '',
          nik:'',
          nama_user: '',
          username_user: '',
          email_user: '',
          password_user: '',
          jabatan: '',
          alamat: '',
          notelp: '',
          tbl_new_user: [...tbl_new_user]
        },
        () => {
          console.log(
            this.state.id_user,
            this.state.nik,
            this.state.nama_user,
            this.state.username_user,
            this.state.email_user,
            this.state.password_user,
            this.state.jabatan,
            this.state.alamat,
            this.state.notelp)
        })
    })
  }

  //SELECT Nilai Buku Descending
  getAllNewNilai = () => {
    getNilaiDescending().then(tbl_nilai_buku_descending => {
      this.setState({
        id_nilai_buku: '',
        nama_user: '',
        kode_buku: '',
        nama_buku: '',
        kelayakan_isi: '',
        kebahasaan: '',
        penyajian: '',
        kegrafikaan: '',
        tbl_nilai_buku_descending: [...tbl_nilai_buku_descending]
      }, ()=>{
        console.log(
          this.state.id_nilai_buku,
          this.state.nama_user,
          this.state.kode_buku,
          this.state.nama_buku,
          this.state.kelayakan_isi,
          this.state.kebahasaan,
          this.state.penyajian,
          this.state.kegrafikaan)
      })
    })
  }

  //SELECT Buku
  getAllNewBuku = () => {
    getNewBuku().then(tbl_new_buku => {
      this.setState({
          id_kriteria: '',
          kode_buku: '',
          nama_buku: '',
          jenis_buku: '',
          tenaga_kesehatan: '',
          nama_penerbit: '',
          tahun_terbit: '',
          nama_penulis: '',
          gambar: null,
          userfile: null,
          tbl_new_buku: [...tbl_new_buku]
        },
        () => {
          console.log(
            this.state.id_kriteria,
            this.state.kode_buku,
            this.state.nama_buku,
            this.state.jenis_buku,
            this.state.tenaga_kesehatan,
            this.state.nama_penerbit,
            this.state.tahun_terbit,
            this.state.nama_penulis,
            this.state.gambar,
            this.state.userfile)
        })
    })
  }

  render() {
    setTimeout("preventBack()", 0)
    return (
      <div className="animated fadeIn">
        <Row>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-white">
              <CardBody className="pb-0">
                <Link to='base/user_tabel'>
                  <div className="text-value" >Tabel User</div>
                </Link>
              </CardBody>
              <div className="chart-wrapper" style={{ height: '70px' }}>
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-white">
              <CardBody className="pb-0">
                <Link to='base/kriteria_tabel'>
                  <div className="text-value" >Tabel Kriteria</div>
                </Link>

              </CardBody>
              <div className="chart-wrapper" style={{ height: '70px' }}>
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-white">
              <CardBody className="pb-0">
                <Link to='base/buku_tabel'>
                  <div className="text-value" >Tabel Buku</div>
                </Link>
              </CardBody>
              <div className="chart-wrapper" style={{ height: '70px' }}>
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="10" lg="3">
            <Card className="text-white bg-white">
              <CardBody className="pb-0">
                <Link to='base/nilai_tabel'>
                  <div className="text-value" >Tabel Nilai Buku</div>
                </Link>
              </CardBody>
              <div className="chart-wrapper" style={{ height: '70px' }}>
              </div>
            </Card>
          </Col>
        </Row>

        <Row>
          {/*Grafik Bobot*/}
          <Col xs="6" lg="15">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Grafik Bobot
              </CardHeader>
              <CardBody>
                <Pie data={this.state.grafik_bobot}
                     options={{maintainAspectRatio: false}}
                />
              </CardBody>
            </Card>
          </Col>

          {/*Grafik Nilai*/}
          <Col xs="6" lg="15">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Grafik Nilai Buku
              </CardHeader>
              <CardBody>
                <Line data={this.state.grafik_nilai_buku}
                     options={{maintainAspectRatio: false}}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/*Grafik Nilai*/}
        <Col xs="15" lg="15">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Grafik Rata-rata
            </CardHeader>
            <CardBody>
              <Bar data={this.state.grafik_rata_rata}
                    options={{maintainAspectRatio: false,
                      responsive: true,
                      legend: {
                        display: true,
                      }
                    }}
              />
            </CardBody>
          </Card>
        </Col>

        <Col xs="15" lg="15">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Tabel User Terbaru
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                <tr>
                  <th>No User</th>
                  <th>NIK</th>
                  <th>Nama User</th>
                  <th>Username User</th>
                  <th>Email User</th>


                  <th>Alamat</th>
                  <th>Telp</th>
                </tr>
                </thead>
                <tbody>
                {this.state.tbl_new_user.map((tbl_new_user, index) => (
                  <tr key={index}>
                    <td>{tbl_new_user[0]}</td>
                    <td>{tbl_new_user[1]}</td>
                    <td>{tbl_new_user[2]}</td>
                    <td>{tbl_new_user[3]}</td>
                    <td>{tbl_new_user[4]}</td>


                    <td>{tbl_new_user[7]}</td>
                    <td>{tbl_new_user[8]}</td>
                  </tr>
                ))}
                </tbody>
              </Table>

            </CardBody>
          </Card>
        </Col>

        {/*Tabel*/}
        <Col xs="15" lg="15">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Tabel Nilai Buku Terbaru
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                <tr>
                  <th>No Nilai Buku</th>
                  <th>Nama User</th>
                  <th>Kode Buku</th>
                  <th>Nama Buku</th>
                  <th>Kelayakan Isi</th>
                  <th>Kebahasaan</th>
                  <th>Penyajian</th>
                  <th>Kegrafikaan</th>
                </tr>
                </thead>
                <tbody>
                {this.state.tbl_nilai_buku_descending.map((tbl_nilai_buku_descending, index) => (
                  <tr key={index}>
                    <td>{tbl_nilai_buku_descending[0]}</td>
                    <td>{tbl_nilai_buku_descending[1]}</td>
                    <td>{tbl_nilai_buku_descending[2]}</td>
                    <td>{tbl_nilai_buku_descending[3]}</td>
                    <td>{tbl_nilai_buku_descending[4]}</td>
                    <td>{tbl_nilai_buku_descending[5]}</td>
                    <td>{tbl_nilai_buku_descending[6]}</td>
                    <td>{tbl_nilai_buku_descending[7]}</td>
                  </tr>
                ))}
                </tbody>
              </Table>

            </CardBody>
          </Card>
        </Col>



        {/*Tabel*/}
        <Col xs="15" lg="15">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Tabel Buku Terbaru
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                <tr>
                  <th>No Buku</th>
                  <th>Kode Buku</th>
                  <th>Nama Buku</th>
                  <th>Jenis Buku</th>
                  <th>Tenaga Kesehatan</th>
                  <th>Nama Penerbit</th>
                  <th>Tahun Terbit</th>
                  <th>Nama Penulis</th>


                </tr>
                </thead>
                <tbody>
                {this.state.tbl_new_buku.map((tbl_new_buku, index) => (
                  <tr key={index}>
                    <td>{tbl_new_buku[0]}</td>
                    <td>{tbl_new_buku[1]}</td>
                    <td>{tbl_new_buku[2]}</td>
                    <td>{tbl_new_buku[3]}</td>
                    <td>{tbl_new_buku[4]}</td>
                    <td>{tbl_new_buku[5]}</td>
                    <td>{tbl_new_buku[6]}</td>
                    <td>{tbl_new_buku[7]}</td>

                  </tr>
                ))}
                </tbody>
              </Table>

            </CardBody>
          </Card>
        </Col>

      </div>
    );
  }
}

export default Dashboard;
