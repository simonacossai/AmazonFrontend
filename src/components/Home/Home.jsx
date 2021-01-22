import React, { Component } from 'react'
import { Container, Row, Col, Jumbotron } from 'react-bootstrap'
import './Home.css';
import image from '../../assets/hero1.png';
import image2 from '../../assets/hero2.png';
import abstract from '../../assets/astratto.png';
import ProductList from '../Products/ProductList';
import '../Products/SingleProduct.css';
import Login from "../Login/Login"

export default class Home extends Component {
    render() {
        return (
            <>
                <Container className="hero px-4 mb-5" fluid>
                    <Row className="d-flex justify-content-left align-items-center">
                        <Col md={5} className="heroCol d-flex justify-content-left">
                            <h1 className="text-left heroH1">Any variation that fits your imagination</h1>
                            <h4 className="text-left heroH4">Find a perfect outfit that will suit your soul and body —————</h4>
                        </Col>
                        <Col md={6}>
                            <Row>
                                <Col md={6} className="firstImageCol p-0">
                                    <img src={image} className="mt-0 m-0 bottomImageHero" alt="home-model-pic"/>
                                    <img src={abstract} className="abstract" alt="home-abstract-pic"/>
                                </Col>
                                <Col md={6} className="secondImageCol p-0">
                                    <img src={image2} className="mt-0 m-0 topImageHero" alt="home-model-pic"/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>

                <ProductList props={this.props} product={this.props.product}/>
                <Container className="mt-5 pt-5">
                    <Jumbotron fluid className="jumbotronImage mt-5 px-2">
                        <h1>Discover your style!</h1>
                        <p>Any suggestion? Leave us a review!</p>
                    </Jumbotron>
                </Container>
            </>
        )
    }
}
