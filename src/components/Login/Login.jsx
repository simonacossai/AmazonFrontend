import React from 'react'
import { Alert, Button, Col, Form, Row, Spinner, Container } from 'react-bootstrap'
import './Login.css';

class Login extends React.Component {
    state = {
        newUser: {
            firstName: '',
            lastName:'',
            email: ''
        },
        loading: false
    }
   
   
    //updates the fields of the form
    updatenewUserField = (e) => {
        let newUser = { ...this.state.newUser }
        let currentId = e.currentTarget.id
        newUser[currentId] = e.currentTarget.value
        this.setState({ newUser: newUser })
    }

    postUser=async()=>{
      try {
        const resp = await fetch(`http://localhost:3001/user`, {
          method: "POST",
          body: JSON.stringify(this.state.newUser),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });
        if (resp.ok) {
          let response= await resp.json();
          console.log(response);
          await localStorage.setItem('id', response.id);
        } else {
          alert("something went wrong")
        }
      } catch (e) {
        console.log(e)
      }
    }

    //post method of the product
    submitnewUser = async (e) => {
        e.preventDefault();
        this.postUser();
      // await localStorage.setItem('name', JSON.stringify(this.state.newUser.name));
       //await localStorage.setItem('email', JSON.stringify(this.state.newUser.email));
        this.setState({loading: true})
        this.props.history.push('/home')
    }


    render() {
        return (
            <>
                {
                    this.state.errMessage ? (
                        <Alert variant="danger" className="mt-5">
                            We encountered a problem with your request
                            {this.state.errMessage}
                        </Alert>

                    ) :
                        (
                            <Container className="pt-5 mt-5 justify-content-center align-items-center text-center" fluid>
                                <h1 className="text-black mt-5 pt-5">🔑 Please login 🔑</h1>
                                <Form className="mt-4 p-3 d-flex justify-content-center align-items-center text-center formproduct" style={{ flexDirection: "column" }} onSubmit={this.submitnewUser}>
                                    <div className="formDiv p-4">
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label htmlFor="firstName">Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="firstName"
                                                    id="firstName"
                                                    className="input"
                                                    placeholder="Your firstName"
                                                    value={this.state.newUser.firstName}
                                                    onChange={this.updatenewUserField}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label htmlFor="lastName">Lastame</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="lastName"
                                                    id="lastName"
                                                    className="input"
                                                    placeholder="Your lastName"
                                                    value={this.state.newUser.lastName}
                                                    onChange={this.updatenewUserField}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label htmlFor="email">email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    className="input"
                                                    id="email"
                                                    placeholder="email"
                                                    value={this.state.newUser.email}
                                                    onChange={this.updatenewUserField}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Row className="d-flex justify-content-right text-right align-items-right">
                                            <Col>
                                                <Button type="submit" className="addProductButton" >Submit</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form>
                            </Container>
                        )
                }
            </>
        )
    }
}
export default Login