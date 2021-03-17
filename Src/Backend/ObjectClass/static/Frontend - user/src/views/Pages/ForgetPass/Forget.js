import React, { Component } from 'react';
import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {Link} from "react-router-dom";

const Forget = (props) =>{
  return(
    <Row>
      <Col xs="6">
        <Button type="submit" color="primary" className="px-4"><Link to={props.LinkValidation}>Submit</Link></Button>
      </Col>
    </Row>
  )
}
export default Forget
