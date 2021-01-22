import React, { Component } from 'react'
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap'
import { BsTrashFill } from 'react-icons/bs';


export default class Cart extends Component {
    
    state = {
        items: [],
        cart:[],
        total: 0,
        user: [],
        alert: false,
        
    }
  
    fetchCart = async () => {
        let userId=localStorage.getItem('id');
        try {
          let response = await fetch(
            "http://localhost:3001/cart/" + userId,
            {
              method: "GET",
            }
          );
          if (response.ok) {
            const data = await response.json();
            let items = data.products;
            let user= data.products[0].user;
            console.log(items)
            this.setState({user})
            this.setState({ items });
          }
        } catch (error) {
          console.log(error);
        }
      };
      componentDidMount() {
          this.fetchCart()
      }

   deleteCart = async (id) => {
    try {
        let response = await fetch(`http://localhost:3001/cart/${id}`,
          {
            method: "DELETE"
          })
        if (response.ok) {
            this.fetchCart()
            this.setState({ alert: true })
            setTimeout(() => {
                this.setState({
                    alert: false
                });
            }, 1200);
        } else {
          alert("an error accurred")
        }
      } catch (err) {
        console.log(err);
      }
   }

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
                                    <BsTrashFill className="addToCartIcon" onClick={() => this.deleteCart(e.id)} />
                                </div>
                                <Card.Body>
                                    <Card.Title>{e.product.name}</Card.Title>
                                    <Card.Text className="description">
                                        {e.product.description}
                                    </Card.Text>
                                    <div className="m-0 p-0 d-flex justify-content-between align-items-center text-center">
                                        <p className="text-right text-muted m-0 p-0">$ {e.product.price}</p>
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
