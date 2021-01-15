import React, { Component } from 'react'
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap'
import { BsTrashFill } from 'react-icons/bs';


export default class Cart extends Component {
    
    state = {
        items: [],
        cart:[],
        total: 0,
        alert: false,
    }
  
    fetchCart = async (cartId) => {
        try {
          let response = await fetch(
            "http://localhost:3005/shop/" + cartId,
            {
              method: "GET",
            }
          );
          console.log(response);
          if (response.ok) {
            const data = await response.json();
            this.setState({ cart: data });
            console.log(this.state.cart, "fetched cart");
          }
        } catch (error) {
          console.log(error);
        }
      };
      componentDidMount() {
        let cartId = localStorage.getItem('cartId');
        this.fetchCart(cartId);
        console.log(cartId)
      }

  //  deleteCartItem = async (id) => {
//    }

    render() {
        return (
            <Container className="mt-5 pt-5 d-flex justify-content-center">
                {this.state.alert && 
                <Alert variant="success" style={{ zIndex: "20000", position: "absolute", maxWidth: "1000px", bottom: "0" }}>
                    <p>Element successfully deleted from the cart!</p>
                </Alert>}
                <Row>
                    <Col md={4} >
                        {this.state.items && this.state.items.map((e) =>
                            <Card className="card p-1 mb-2 mt-3" >
                                <div className="addToCart">
                                    <BsTrashFill className="addToCartIcon" onClick={() => this.deleteCart(e._id)} />
                                </div>
                                <Card.Body>
                                    <Card.Title>{e.name}</Card.Title>
                                    <Card.Text className="description">
                                        {e.description}
                                    </Card.Text>
                                    <div className="m-0 p-0 d-flex justify-content-between align-items-center text-center">
                                        <p className="text-right text-muted m-0 p-0">$ {e.price}</p>
                                    </div>
                                </Card.Body>
                            </Card>)}
                    </Col>
                    <Col md={8} className="mt-3">
                        <Card style={{ borderBottom: "none", maxWidth: "100%" }}>
                            <Card.Body>
                                <Card.Title>Your order:</Card.Title>
                                <Card.Text>
                                    The thing we care the most is for you to be fully satisfied both for our products and the delivery.
                                    We usually send the products in a few days.
                                    Thanks for choosing us! Feel free to contact us in case of problems
                                </Card.Text>
                                <Card.Subtitle className="my-3">Total: {this.state.total}$</Card.Subtitle>
                                <Button className="productDetailsButton">Checkout</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}
