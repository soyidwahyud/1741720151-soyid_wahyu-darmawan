import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo2 from '../../assets/img/brand/logo2.jpg'
import tes from '../../assets/img/brand/tes.png'
import sygnet from '../../assets/img/brand/sygnet.svg'
import jwt_decode from 'jwt-decode'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor() {
    super()
    this.state = {
      nama_admin: '',
      errors: {}
    }
  }

  componentDidMount() {
    const token = localStorage.admintoken
    const decoded = jwt_decode(token)
    this.setState({
      nama_admin: decoded.identity.nama_admin
    })
  }
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: tes, width: 89, height: 55, alt: 'UKI Logo' }}
          minimized={{ src: tes, width: 30, height: 30, alt: 'UKI Logo' }}
        />
        <AppSidebarToggler className="d-md-inline-block" display="lg" />
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <td>Hi {this.state.nama_admin}</td>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={'../../assets/img/avatars/admin.png'} className="img-avatar" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-sign-out"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
