import React, {Component} from "react";
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';

const buku = {
  marginLeft: 85,
  marginRight: 25,
  textAlign:'center',
  width: 200,
  height: 250
}

const Descending = (props) => {
  return(
    <Col xs="12" xl="4">
      <Card>
        <CardBody>
          <img className="center" src={process.env.PUBLIC_URL + '/Images/' + props.gambar } style={buku} alt="buku_menu"></img>
          <br/>
          <br/>
          {/*<h6>{buku_menu[0]}</h6>*/}
          {/*<strong>Test</strong>*/}
          {/*<Link to={props.LinkDetail}>*/}
          {/*<h6><a href={props.LinkDetail}>{props.nama_buku}</a></h6>*/}
          <h6><Link to={props.LinkDetail}>{props.nama_buku} ({props.tenaga_kesehatan})</Link></h6>

          <h6>{props.nama_penulis}</h6>
          <h6>{props.nama_penerbit} ({props.tahun_terbit})</h6>
          <h6>{props.jenis_buku}</h6>


          {/*</Carousel>*/}
        </CardBody>
      </Card>
    </Col>
  )
}
