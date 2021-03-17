import React, { Component } from 'react';
import {Button, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row} from 'reactstrap';
import {Link} from "react-router-dom";

class ForgetPass extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <div className="clearfix">
                <h4 className="pt-3">Hubungi Admin untuk mengubah identitas user</h4>
                <Link to="/login">
                  <p className="text-muted float-left">Back to login.</p>
                </Link>
              </div>

            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default ForgetPass
