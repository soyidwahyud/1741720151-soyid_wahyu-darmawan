import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import {Button} from 'reactstrap'
import {getUlasan} from "../../../../Function/ReviewFunction";
import {deleteUlasan} from "../../../../Function/ReviewFunction";

class ReviewTables extends Component {
  constructor() {
    super();
    this.state = {
      id_ulasan:'',
      nama_depan:'',
      nama_belakang:'',
      email:'',
      judul:'',
      pesan:'',
      tbl_ulasan:[]
    }
    this.routeDelete = this.routeDelete.bind(this);
  }
  componentDidMount() {
    this.getAll()
  }
//SELECT
  getAll = () => {
    getUlasan().then(tbl_ulasan => {
      this.setState({
          id_ulasan:'',
          nama_depan:'',
          nama_belakang:'',
          email:'',
          judul:'',
          pesan:'',
          tbl_ulasan: [...tbl_ulasan]
        },
        () => {
          console.log(
            this.state.id_ulasan,
            this.state.nama_depan,
            this.state.nama_belakang,
            this.state.email,
            this.state.judul,
            this.state.pesan)
        })
    })
  }
  //DELETE
  routeDelete = (val, e) =>
  {
    e.preventDefault()
    deleteUlasan(val)

    var tbl_ulasan = [...this.state.tbl_ulasan]
    tbl_ulasan.filter((item, index) => {
      if (item[0] === val) {
        tbl_ulasan.splice(index, 1)
      }
      return true
    })
    this.setState({ tbl_ulasan: [...tbl_ulasan] })
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="15" lg="15">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Tabel Ulasan
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Depan</th>
                    <th>Nama Belakang</th>
                    <th>Email</th>
                    <th>Judul</th>
                    <th>Pesan</th>
                    <th>Delete</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.tbl_ulasan.map((tbl_ulasan, index) => (
                    <tr key={index}>
                      <td>{tbl_ulasan[0]}</td>
                      <td>{tbl_ulasan[1]}</td>
                      <td>{tbl_ulasan[2]}</td>
                      <td>{tbl_ulasan[3]}</td>
                      <td>{tbl_ulasan[4]}</td>
                      <td>{tbl_ulasan[5]}</td>


                      <td><Button type="reset" size="sm" color="danger" onClick={this.routeDelete.bind(this, tbl_ulasan[0])}><i className="fa fa-ban"></i>Delete </Button></td>
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

export default ReviewTables;
