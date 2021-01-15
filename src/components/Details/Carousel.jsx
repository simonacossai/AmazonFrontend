import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, Container, Col } from 'react-bootstrap';
import Slider from "react-slick";
import './Carousel.css'

export default function Carousel({ reviews }) {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    return (
        <>
            <Container>
                {reviews.length>0 &&                 <h2 className="text-center">What our clients think about it</h2>}
                <Slider {...settings}>
                    {reviews.length>0 && reviews.map((e) =>
                        <Col className="mt-3">
                            <Card className="review-card" >
                                <div className="first-half d-flex justify-content-center align-items-center text-center">
                                    {e.gender === "male" ?
                                        <img src="https://img.icons8.com/bubbles/2x/user-male.png" className="user-profile-image" alt="men-avatar"/> :
                                        <img src="https://soulprism.in/img/female.png" className="user-profile-image" alt="women-avatar"/>
                                    }
                                </div>
                                <Card.Body className="p-3 mt-2">
                                    <div className="d-flex justify-content-between">
                                        <Card.Subtitle className="mb-2">{e.user}</Card.Subtitle>
                                        <Card.Subtitle className="mb-2 text-muted">{e.rate}</Card.Subtitle>
                                    </div>
                                    <Card.Text className="description text-muted">
                                        {e.comment}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Slider>
                {reviews.length===0 && <h1 className="text-center">Still no reviews for this product</h1>}
            </Container>
        </>
    )
}
