import React from 'react'
import { Alert, Button, Col, Form, Row, Spinner, Container } from 'react-bootstrap'
import './AddProduct.css';
import addImage from '../../assets/add.png';

class AddProduct extends React.Component {
    state = {
        newProduct: {
            name: '',
            description: '', 
            brand: '', 
            price: '', 
            category: ''
        },
        productImage: null,
        errMessage: '',
        loading: false
    }
    //take formData from the file input 
    HandleFile = (e) => {
        const formData = new FormData();
        formData.append("productImage", e.target.files[0]);
        console.log(formData);
        this.setState({ productImage: formData });
    };

    //updates the fields of the form
    updatenewProductField = (e) => {
        let newProduct = { ...this.state.newProduct }
        let currentId = e.currentTarget.id
        newProduct[currentId] = e.currentTarget.value
        this.setState({ newProduct: newProduct })
    }

    //this is the post of the image triggered into the post method for the product itself
    PostImage = async (id) => {
        try {
            let response = await fetch(
                `http://localhost:3001/products/${id}/upload`,
                {
                    method: "POST",
                    body: this.state.productImage,
                }
            );
            if (response.ok) {
                alert("new product added");
            } else {
                const error = await response.json();
                console.log(error);
            }
        } catch (error) {
            console.log(error);
            alert(error)
        }
    };

    //post method of the product
    submitnewProduct = async (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        try {
            let response = await fetch('http://localhost:3001/products',
                {
                    method: 'POST',
                    body: JSON.stringify(this.state.newProduct),
                    headers: new Headers({
                        "Content-Type": "application/json"
                    })
                })
            if (response.ok) {
                alert("element added!")
                let data = await response.json();
                this.PostImage(data._id)
                console.log(data)
                this.setState({
                    newProduct: {
                        name: '',
                        description: '',
                        brand: '',
                        price: '',
                        category: ''
                    },
                    productImage: '',
                    errMessage: '',
                    loading: false
                })
            } else {
                console.log('an error occurred')
                let error = await response.json()
                this.setState({
                    errMessage: error.message,
                    loading: false,
                })
            }
        } catch (e) {
            console.log(e) // Error
            this.setState({
                errMessage: e.message,
                loading: false,
            })
        }
    }


    render() {
        return (
            <>
                {
                    this.state.loading && (
                        <div className="d-flex justify-content-center my-5">
                            Sendin your infos pls wait
                            <div className="ml-2">
                                <Spinner animation="border" variant="success" />
                            </div>
                        </div>
                    )
                }
                {
                    this.state.errMessage ? (
                        <Alert variant="danger" className="mt-5">
                            We encountered a problem with your request
                            {this.state.errMessage}
                        </Alert>

                    ) :
                        (
                            <Container className="d-flex pt-5 mt-3 justify-content-center align-items-center text-center" fluid>
                                <Form className="mt-5 d-flex justify-content-center align-items-center text-center formproduct" style={{ flexDirection: "column" }} onSubmit={this.submitnewProduct}>
                                    <div className="formDiv">
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label htmlFor="name">Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className="input"
                                                    placeholder="Your name"
                                                    value={this.state.newProduct.name}
                                                    onChange={this.updatenewProductField}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label htmlFor="description">Description</Form.Label>
                                                <Form.Control as="textarea" rows={3}
                                                    type="text"
                                                    name="description"
                                                    id="description"
                                                    className="input"
                                                    placeholder="Describe ur project..."
                                                    value={this.state.newProduct.description}
                                                    onChange={this.updatenewProductField}
                                                    required />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label htmlFor="brand">Brand</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="brand"
                                                    id="brand"
                                                    className="input"
                                                    placeholder="Product brand"
                                                    value={this.state.newProduct.brand}
                                                    onChange={this.updatenewProductField}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label htmlFor="price">Price</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="price"
                                                    id="price"
                                                    className="input"
                                                    placeholder="price"
                                                    value={this.state.newProduct.price}
                                                    onChange={this.updatenewProductField}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label htmlFor="category">Category</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="category"
                                                    className="input"
                                                    id="category"
                                                    placeholder="category"
                                                    value={this.state.newProduct.category}
                                                    onChange={this.updatenewProductField}
                                                    required
                                                />
                                            </Form.Group>
                                            <Col>
                                                <label for="file" id="file-label">
                                                    <input
                                                        type="file"
                                                        id="file"
                                                        onChange={this.HandleFile}
                                                        accept="image/*"
                                                    />
                                                    <img src={addImage} className="uploadImage" alt="upload"/>
                                                </label>
                                            </Col>
                                        </Col>
                                        <Row className="d-flex justify-content-right text-right align-items-right">
                                            <Col>
                                                <Button type="submit" className="addProductButton">Submit</Button>
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

export default AddProduct