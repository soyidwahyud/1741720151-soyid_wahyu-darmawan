import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
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
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import {getNewUser, getNewBuku, getNilaiDescending} from "../../Function/DashboardFunction";
import {getUser} from "../../Function/UserFunction";
import {getBuku} from "../../Function/BukuFunction";
import {Link, withRouter} from 'react-router-dom';


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

          <Col xs="12" sm="6" lg="3">
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
                  <th>Password User</th>
                  <th>Jabatan</th>
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
                    <td>{tbl_new_user[5]}</td>
                    <td>{tbl_new_user[6]}</td>
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
                  <th>Gambar</th>
                  <th>User File</th>

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
                    <td>{tbl_new_buku[8]}</td>
                    <td>{tbl_new_buku[9]}</td>
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
