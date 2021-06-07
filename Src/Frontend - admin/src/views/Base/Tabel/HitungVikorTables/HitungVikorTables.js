import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from 'reactstrap';

import {getMatriks, getNilaiMax, getNilaiMin,getNormalisasi, getTabelRanking} from '../../../../Function/VikorFunction'
import axios from "axios";
import {Line, Polar, Doughnut, Bar} from 'react-chartjs-2';


class HitungVikorTables extends Component {
  constructor() {
    super();
    this.state = {
      kode_buku:'',
      kelayakan_isi:'',
      kebahasaan:'',
      penyajian:'',
      kegrafikaan:'',
      ranking:'',
      nama_buku:'',

      //grafik
      grafik_ranking_buku:{},

      //Normalisasi
      normalisasi_1:'',
      normalisasi_2:'',
      normalisasi_3:'',
      normalisasi_4:'',
      matriks_keputusan:[],
      nilai_maks:[],
      nilai_min:[],
      normalisasi:[],
      tabel_ranking:[]
    }
  }
  componentDidMount() {
    this.getMatriks()
    this.getNilaiMaks()
    this.getNilaiMin()
    this.getNormalisasi()
    this.getTabelRanking()
    this.getGrafikRankingBuku()
  }

  // Grafik Ranking
  getGrafikRankingBuku = () =>{
    axios.get('/grafik_ranking_buku')
      .then(res => {
        console.log(res)
        const ranking_buku = res.data
        let ranking = []
        let kode_buku = []
        let test = []
        ranking_buku.forEach(record => {
          ranking.push(record.ranking)
          kode_buku.push(record.kode_buku)
        })
        this.setState({
          grafik_ranking_buku: {
            labels: kode_buku,
            datasets:[
              {
                label: 'Ranking Buku',
                data: ranking,
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

  //SELECT Matriks
  getMatriks = () => {
    getMatriks().then(matriks_keputusan => {
      this.setState({
          kode_buku: '',
          kelayakan_isi: '',
          kebahasaan: '',
          penyajian: '',
          kegrafikaan: '',
          matriks_keputusan: [...matriks_keputusan]
        },
        () => {
          console.log(
            this.state.kode_buku,
            this.state.kelayakan_isi,
            this.state.kebahasaan,
            this.state.penyajian,
            this.state.kegrafikaan)
        })
    })
  }
  //SELECT Nilai Maks
  getNilaiMaks = () => {
    getNilaiMax().then(nilai_maks => {
      this.setState({
          kelayakan_isi: '',
          kebahasaan: '',
          penyajian: '',
          kegrafikaan: '',
          nilai_maks: [...nilai_maks]
        },
        () => {
          console.log(
            this.state.kelayakan_isi,
            this.state.kebahasaan,
            this.state.penyajian,
            this.state.kegrafikaan)
        })
    })
  }
  //SELECT Min
  getNilaiMin = () => {
    getNilaiMin().then(nilai_min => {
      this.setState({
          kelayakan_isi: '',
          kebahasaan: '',
          penyajian: '',
          kegrafikaan: '',
          nilai_min: [...nilai_min]
        },
        () => {
          console.log(
            this.state.kelayakan_isi,
            this.state.kebahasaan,
            this.state.penyajian,
            this.state.kegrafikaan)
        })
    })
  }

  //SELECT Min
  getNormalisasi = () => {
    getNormalisasi().then(normalisasi => {
      this.setState({
          normalisasi_1: '',
          normalisasi_2: '',
          normalisasi_3: '',
          normalisasi_4: '',
          normalisasi: [...normalisasi]
        },
        () => {
          console.log(
            this.state.normalisasi_1,
            this.state.normalisasi_2,
            this.state.normalisasi_3,
            this.state.normalisasi_4)
        })
    })
  }

  //SELECT Tabel Ranking
  getTabelRanking = () => {
    getTabelRanking().then(tabel_ranking => {
      this.setState({
          ranking: '',
          kode_buku: '',
          nama_buku: '',
          tabel_ranking: [...tabel_ranking]
        },
        () => {
          console.log(
            this.state.ranking,
            this.state.kode_buku,
            this.state.nama_buku)
        })
    })
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="16" lg="10">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Grafik Ranking
              </CardHeader>
              <CardBody>
                <Bar
                  data={this.state.grafik_ranking_buku}
                  heigth={"150%"}
                  options={{maintainAspectRatio: false
                  }}
                />
              </CardBody>
            </Card>
          </Col>
          {/*  Tabel Ranking */}
          <Col xs="12" lg="10">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Tabel Ranking
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    {/*<th>Ranking</th>*/}
                    <th>Kode Buku</th>
                    <th>Nama Buku</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.tabel_ranking.map((tabel_ranking, index) => (
                    <tr key={index}>
                      {/*<td>{tabel_ranking[0]}</td>*/}
                      <td>{tabel_ranking[1]}</td>
                      <td>{tabel_ranking[2]}</td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default HitungVikorTables;
