import React, { Component, lazy, Suspense } from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';


const logo = {
  marginLeft: 445,
  position:'flex',
  display:'inline',
  marginRight: 25,
  textAlign:'center',
  width: 350,
  height: 250
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    // this.state = { activeIndex: 0 };

  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  render() {
    function preventBack() {
      window.history.forward()
    }
    setTimeout("preventBack()", 0)
    window.unload = function () {

    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" xl="16">
            <Card>
              <CardBody>
                {/*<Carousel activeIndex={activeIndex} next={this.next} previous={this.previous} ride="carousel">*/}
                {/*  {slides}*/}

                {/*<img src={require('/assets/img/tes.png')} style={logo}  alt="ini_foto"></img>*/}
                <img src={process.env.PUBLIC_URL + '/assets/img/tes.png'} style={logo}/>
                <br/>
                {/*<strong>Test</strong>*/}
                <strong>Visi</strong>
                <h6>“ Menjadi rumah sakit pendidikan utama yang mempunyai keunggulan kompetitif dalam pelayanan, pendidikan dan penelitian di bidang kesehatan ”.</h6>

                <br/>

                <strong>Misi</strong>
                <h6>1. Membangun karakter dokter yang memiliki sistem  nilai Kristen berdasarkan kasih dalam menjalankan kompetensinya.</h6>
                <h6>2. Menyelenggarakan dan mengembangkan pendidikan kedokteran, penelitian dan pelayanan medis dasar dan spesialistik berkualitas sesuai dengan kebutuhan pendidikan dengan keunggulan kompetitif khususnya dalam  bidang trauma dan penyakit tropis.</h6>
                <h6>3. Menjalankan kegiatan operasional secara  efektif  dan efisien serta sinergis sehingga  menghasilkan nilai tambah bagi stakeholders (pelanggan,  pekerja,  mitra  kerja,  pemilik  dan  masyarakat).</h6>
                <h6>4. Mengembangkan dan  memperkuat  manajemen rumah sakit pendidikan yang mandiri dan mempunyai  tata kelola yang baik (Good Teaching Hospital Governance).</h6>

                <br/>
                <strong>Motto</strong>
                <h6>“MELAYANI BUKAN DILAYANI”</h6>

                {/*</Carousel>*/}
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    );
  }
}

export default Dashboard;
