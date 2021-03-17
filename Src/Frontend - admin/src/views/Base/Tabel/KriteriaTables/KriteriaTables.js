import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from 'reactstrap';

import {getKriteria} from '../../../../Function/KriteriaFunction'


class KriteriaTables extends Component {
  constructor() {
    super();
    this.state = {
      id_kriteria:'',
      kode:'',
      nama_kriteria:'',
      bobot:'',
      tipe_kriteria:'',
      tbl_kriteria:[]
    }
  }
  componentDidMount() {
    this.getAll()
  }

  //SELECT
  getAll = () => {
    getKriteria().then(tbl_kriteria => {
      this.setState({
          id_kriteria: '',
          kode: '',
          nama_kriteria: '',
          bobot: '',
          tipe_kriteria: '',
          tbl_kriteria: [...tbl_kriteria]
        },
        () => {
          console.log(
            this.state.id_kriteria,
            this.state.kode,
            this.state.nama_kriteria,
            this.state.bobot,
            this.state.tipe_kriteria)
        })
    })
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="10">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Tabel Kriteria Buku
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>No Kriteria Buku</th>
                    <th>Kode</th>
                    <th>Nama Kriteria</th>
                    <th>Bobot</th>
                    <th>Tipe Kriteria</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.tbl_kriteria.map((tbl_kriteria, index) => (
                    <tr key={index}>
                      <td>{tbl_kriteria[0]}</td>
                      <td>{tbl_kriteria[1]}</td>
                      <td>{tbl_kriteria[2]}</td>
                      <td>{tbl_kriteria[3]}</td>
                      <td>{tbl_kriteria[4]}</td>
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

export default KriteriaTables;
