import React, {Component} from "react";
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';
import '../RekomendasiTables/Rank.css'

const buku = {
  marginLeft: 85,
  marginRight: 25,
  textAlign:'center',
  width: 200,
  height: 250
}


const Rekomendasi = (props) =>{
  return(

    <Col xs="12" xl="4">
      <Card>
        <CardBody>
          <h6 className="label rank">{props.ranking}</h6>
          <br/>
          <img className="center" src={process.env.PUBLIC_URL + '/Images/' + props.gambar } style={buku} alt="buku_menu"></img>
          <br/>

          <br/>

          <h6><Link to={props.LinkDetail}>{props.nama_buku} ({props.tenaga_kesehatan})</Link></h6>
          <h6>{props.nama_penulis}</h6>
          <h6>{props.nama_penerbit} ({props.tahun_terbit})</h6>
          <h6>{props.jenis_buku}</h6>

        </CardBody>
      </Card>
    </Col>
  )
}
export default Rekomendasi
