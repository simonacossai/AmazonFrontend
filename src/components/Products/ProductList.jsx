import React, { Component } from 'react'
import { fetchProducts, fetchProductsByCategory } from "../../api/api";
import SingleProduct from './SingleProduct';
import { Container, Row, Col, Alert } from 'react-bootstrap';

export default class ProductList extends Component {
    state = {
        products: [],
        alert: false,
        errorAlert: false,
    }

    componentDidMount = async () => {
        let products = await fetchProducts();
        this.setState({ products });
    };

    getProductsByCategory = async (e) => {
        let category = e.currentTarget.value;
        console.log(category)
        if (category === "all") {
            let products = await fetchProducts();
            this.setState({ products });
        }
        else {
            let products = await fetchProductsByCategory(category)
            console.log(products)
            this.setState({ products });
        }
    }

    addCart = async (productId) => {
        let userId=localStorage.getItem('id');
        try {
            let response = await fetch(`http://localhost:3001/cart/${userId}/${productId}`,
                {
                    method: "POST"
                })
            if (response.ok) {
                this.setState({ alert: true })
                setTimeout(() => {
                    this.setState({
                        alert: false
                    });
                }, 1200);

            } else {
                this.setState({ errorAlert: true })
                setTimeout(() => {
                    this.setState({
                        errorAlert: false
                    });
                }, 1200);
            }
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <Container className="mt-5 pt-5 d-flex justify-content-center" style={{ flexDirection: "column" }}>
                <Row>
                    <Col md={10}>  <hr></hr></Col>
                    <Col md={2}>
                        sort by
                    <select className="ml-2 selectCategory" onChange={(e) => this.getProductsByCategory(e)}>
                            <option value="all">category</option>
                            <option value="shoes">shoes</option>
                            <option value="top">top</option>
                            <option value="pants">pants</option>
                        </select>
                    </Col>
                </Row>
                <Row className="mt-4 d-flex justify-content-center">
                    {this.state.alert && <Alert variant="success" style={{ zIndex: "20000", position: "fixed", maxWidth: "1000px", top: "100px" }}>
                        <h4>
                            Element successfully added to the cart!
                        </h4>
                    </Alert>}
                    {this.state.errorAlert && <Alert variant="danger" style={{ zIndex: "20000", position: "fixed", maxWidth: "1000px", top: "100px" }}>
                        <h4>
                            Element already added to the cart!
                    </h4>
                    </Alert>}
                    {
                        this.props.product.length>0 ? this.props.product.map((product, index) =>
                            <SingleProduct product={product} props={this.props} add={this.addCart} key={index}/>
                        )
                        : 
                        this.state.products.map((product, index) =>
                        <SingleProduct product={product} props={this.props} add={this.addCart} key={index}/>
                        )
                    }
                </Row>
            </Container>
        )
    }
}
