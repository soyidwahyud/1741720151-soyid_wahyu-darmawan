import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import {Button} from 'reactstrap'


class ContactTables extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <h4>Lokasi</h4>
        <br/>
        <h6>13530 Rumah Sakit Umum Universitas Kristen Indonesia</h6>
        <h6>Jakarta Timur, DKI Jakarta</h6>
        <br/>
        <Col xs="15" lg="15">
          <h4>Telepon</h4>

          <h6>(021) 8092317</h6>
        </Col>

        <Row>

          <Col xs="15" lg="15">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.099464257705!2d106.86986331473202!3d-6.250623295475574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3eae128b4c9%3A0x28aa0b4ab11d8c0f!2sRumah%20Sakit%20UKI!5e0!3m2!1sen!2sid!4v1611631069885!5m2!1sen!2sid"
              width="600" height="450"></iframe>
          </Col>
        </Row>


      </div>

    );
  }
}

export default ContactTables;
