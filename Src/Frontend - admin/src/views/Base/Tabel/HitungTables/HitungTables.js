import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import DataRangeSAW from '../HitungTables/DataRangeSAW';
import NormalisasiSAW from '../HitungTables/NormalisasiSAW';
import RankingSAW from '../HitungTables/RankingSAW';
import {Provider} from '../../../Context';

class HitungTables extends Component {
  constructor() {
    super();
    this.state = {
      users:[],
      data_normalisasi_saw: [],
      data_final_saw: []
    }
  }


  render() {
    const contextValue = {
      // new_user:this.state.new_user,
      // new_data_pertama:this.state.new_data_pertama,
      // new_data_normalisasi_saw:this.state.new_data_normalisasi_saw,
      // new_data_final_saw:this.state.new_data_final_saw
    }
    let showUsers;
    showUsers = (
      <Table hover bordered striped responsive size="sm">
        <thead>
        <tr>
          <th>Kode Alternatif</th>
          <th>Nama Buku</th>
          <th>C1</th>
          <th>C2</th>
          <th>C3</th>
          <th>C4</th>
          <th>C5</th>
        </tr>

        </thead>
        <tbody>
        <DataRangeSAW/>
        </tbody>
      </Table>
    );
    let showDataNormalisasiSaw;
    showDataNormalisasiSaw = (
      <Table hover bordered striped responsive size="sm">
        <thead>
        <tr>
          <th>Kode Alternatif</th>
          <th>Nama Buku</th>
          <th>C1</th>
          <th>C2</th>
          <th>C3</th>
          <th>C4</th>
          <th>C5</th>

        </tr>
        </thead>
        <tbody>
        <NormalisasiSAW/>
        </tbody>
      </Table>
    );
    let showDataFinalSaw;
    showDataFinalSaw = (
      <Table hover bordered striped responsive size="sm">
        <thead>
        <tr>
          <th >Kode Alternatif</th>
          <th>Nama Buku</th>
          <th >Total</th>
        </tr>
        </thead>
        <tbody>
        <RankingSAW/>
        </tbody>
      </Table>
    );

    return (
      <>
      <Provider>
        <div className="animated fadeIn">

          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Tabel Perhitungan Metode SAW
                </CardHeader>
                <CardBody>
                  Matriks Keputusan
                  {showUsers}
                  <br/>
                  Normalisasi
                  {showDataNormalisasiSaw}
                  <br/>
                  Perankingan
                  {showDataFinalSaw}

                </CardBody>
              </Card>
            </Col>

          </Row>
        </div>
      </Provider>
      </>
    );
  }
}

export default HitungTables;
