import React, {Component} from "react";
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
  Button,
  Form
} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';
import '../DetailBukuTables/Detail.css'
import AllPagesPDFViewer from './all-pages'
import SinglePagePDFViewer from './single-pages'
import samplePDF from "../../../../sample.pdf";
import jwt_decode from 'jwt-decode'
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";

const buku = {
  marginLeft: 385,
  marginRight: 25,
  textAlign:'center',
  width: 250,
  height: 350
}

const textDetail = {

  textAlign:'left',
  size:'50px'
}
const text = {

  textAlign:'center',
  fontSize:'1.4rem'
}

const Detail = (props) =>{
  return(
    <Col xs="12" xl="15">
      <Card>
        <CardBody>
          <h1 style={textDetail}>Detail Buku</h1>
          <br/>
          <h6 style={text}>{props.nama_buku}</h6>
          <br/>
          <img className="center" src={process.env.PUBLIC_URL + '/Images/' + props.gambar } style={buku} alt="buku_menu"></img>
          <br/>
          <br/>

          <h6>{props.nama_penulis}</h6>
          <h6>{props.nama_penerbit} ({props.tahun_terbit})</h6>
          <h6>{props.jenis_buku}</h6>
          <br/>
          <h6>Input Penilaian Buku : </h6>
          {/*Form*/}
          <Form action="http://127.0.0.1:5000/nilai_buku" method="post">
            {/*id user*/}
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="id_user">User</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text"
                       disabled ={true}
                       id="id_user"
                       name="id_user"
                       value={props.id_user}/>
              </Col>
            </FormGroup>
            {/*id buku*/}
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="id_buku">No buku</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text"
                       id="id_buku"
                       name="id_buku"
                       disabled={true}
                       value={props.id_buku}/>
              </Col>
            </FormGroup>
            {/*kelayakan isi*/}
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="kelayakan_isi">Kelayakan isi</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="select"
                       id="kelayakan_isi"
                       name="kelayakan_isi"
                >
                  <option value="0">Silahkan dipilih</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </Input>
              </Col>
            </FormGroup>
            {/*kebahasaan*/}
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="kebahasaan">Kebahasaan</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="select"
                       id="kebahasaan"
                       name="kebahasaan"
                       >
                  <option value="0">Silahkan dipilih</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </Input>
              </Col>
            </FormGroup>
            {/*penyajian*/}
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="penyajian">Penyajian</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="select"
                       id="penyajian"
                       name="penyajian"
                       >
                  <option value="0">Silahkan dipilih</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </Input>
              </Col>
            </FormGroup>
            {/*kegrafikaan*/}
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="kegrafikaan">Kegrafikaan</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="select"
                       id="kegrafikaan"
                       name="kegrafikaan">
                  <option value="0">Silahkan dipilih</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </Input>
              </Col>
            </FormGroup>
          {/*  Button */}
            <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
          </Form>
          <br/>
          <br/>
          <div className="all-page-container">
            {/*<AllPagesPDFViewer pdf={samplePDF} />*/}
            {/*<AllPagesPDFViewer pdf={process.env.PUBLIC_URL + "/Files/Gj8PT_M3EG11ww.pdf"} />*/}
            <Button type="button" color="primary" onClick={(event) => { event.preventDefault(); window.open(process.env.PUBLIC_URL + "/Files/" + props.userfile); }}>
              Download</Button>
            <br/>
            <br/>
            <SinglePagePDFViewer pdf={process.env.PUBLIC_URL + "/Files/" + props.userfile}/>
          </div>

          {/*</Carousel>*/}
        </CardBody>
      </Card>
    </Col>
  )
}

export default Detail
