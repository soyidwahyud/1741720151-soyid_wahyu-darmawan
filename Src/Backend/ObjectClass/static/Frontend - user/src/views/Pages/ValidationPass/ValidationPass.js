import React, { Component } from 'react';
import {Col, Container, Row} from "reactstrap";
import Validation from './Validation'


class ForgetPass extends Component {
  state = {
    ListUser:[]
  }
  ambilDataDariServerAPI = () =>{
    fetch('http://127.0.0.1:5000/user/1')
      .then(response => response.json())
      .then(jsonHasilAmbilDariAPI => {
        this.setState({
          ListUser: jsonHasilAmbilDariAPI
        })
      })
  }
  componentDidMount() {
    this.ambilDataDariServerAPI()
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        {
          this.state.ListUser.map(user => {
            return <Validation key={user.id_user}
                         id={user.id_user}
                         username_user = {user.username_user}
            />
          })
        }
      </div>
    );
  }
}
export default ForgetPass
