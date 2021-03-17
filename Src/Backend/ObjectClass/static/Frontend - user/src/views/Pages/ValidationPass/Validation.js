import React, {Component} from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table
} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';
import Book from "../../Base/Tabel/BukuTables/Buku";

const Validation = (props) =>{
  return(
    <Container>
      <Row className="justify-content-center">
        <Col md="6">
          <div className="clearfix">
            <h4 className="pt-3">You're Right.</h4>
            <p className="text-muted float-left">Your username is {props.username_user}</p>
          </div>

        </Col>
      </Row>
    </Container>
  )
}
export default Validation
