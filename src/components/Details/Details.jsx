import React, { Component } from 'react'
import { getReviews, fetchSingleProduct } from "../../api/api";
import Carousel from './Carousel';
import { Container, Row, Col } from 'react-bootstrap'

export default class Details extends Component {
    state = {
        reviews: [],
        product: []
    }
    componentDidMount = async () => {
        let reviews = await getReviews(this.props.match.params.id);
        let product = await fetchSingleProduct(this.props.match.params.id);
        this.setState({ product })
        this.setState({ reviews });
    };
    render() {
        return (
            <Container className="mb-5 mt-4 py-5">
                <Row className="mb-5 mt-5 pt-5">
                    <Col md={6} className="d-flex justify-content-center" >
                        <img src={this.state.product.imageUrl} className="product-image-detail" alt="product-cart" />
                    </Col>
                    <Col md={6} >
                        <h1 className="product-name text-center mb-3">- {this.state.product.name} -</h1>
                        <p>{this.state.product.description}</p>
                        <div className="d-flex justify-content-between">
                            <h5>{this.state.product.price}$</h5>
                            <h5>{this.state.product.brand}</h5>
                        </div>
                    </Col>
                </Row>
                <Carousel reviews={this.state.reviews} product={this.state.product} />
            </Container>
        )
    }
}
