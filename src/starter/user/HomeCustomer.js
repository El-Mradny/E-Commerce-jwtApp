import React, { useEffect, useState } from 'react';
import db from '../../db';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';

import BlogsDisplayHome from "./BlogsDisplayHome";
import ProductShort from './ProductShort'
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
//import DisplayBlogHomePublic from './DisplayBlogHomePublic';
import { Link } from "react-router-dom";
import Product from './Product';
import DisplayFeedback from '../user/Feedback/DisplayFeedback';
import DisplayDiscount from '../user/Discount/DisplayDiscount';
import FAQ from '../user/Faq/FAQ'
export default function HomeCustomer() {
  const [jwtUser,] = useState(db.getJwtUser())

  const [carts, setCarts] = useState([])
  useEffect(() => (async () => setCarts(await db.Carts.findByUseridAndStatus(jwtUser.username, 'unpaid')))(), [jwtUser.username])
  console.log('carts', carts && carts);

  //productcategory

  const [styleForm, setStyleForm] = useState({
    display: 'none',
  });

  const [products, setProducts] = useState([])
  useEffect(() => (async () => setProducts(await db.Products.SortByHighestSelling()))(), [])



  const styleing = () => {
    console.log(styleForm);
    if (styleForm.display === "none") {
      setStyleForm({
        display: 'block'
      });
    } else {
      setStyleForm({
        display: 'none'
      });
    }

  }

  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.pinimg.com/originals/98/38/78/9838787b20e1a0935ba7e8c72056f8d5.png"
            alt="First slide"
          />
          <Carousel.Caption style={{ backgroundColor: '#22702ddb', width: '40vw', color: 'white', margin: 'auto', fontSize: '17px' }}>
            <h3>Gardening</h3>
            <p>The love of gardening is a seed once sown that never dies. </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.pinimg.com/originals/08/79/56/0879560bab671efd95ce5f99aaf0cb49.png"
            alt="Second slide"
          />

          <Carousel.Caption style={{ backgroundColor: '#22702ddb', width: '40vw', color: 'white', margin: 'auto', fontSize: '17px' }}>
            <h3>If you look the right way</h3>
            <p>The clearest way into the Universe is through a forest wilderness.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.pinimg.com/originals/d1/98/32/d198325219f0b6866513d80dbf9987ff.jpg"
            alt="Second slide"
          />

          <Carousel.Caption style={{ backgroundColor: '#22702ddb', width: '40vw', color: 'white', margin: 'auto', fontSize: '17px' }}>
            <h3>Green Grow</h3>
            <p>To plant a garder believe in.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item  as={Link} to={`/displaypackageinfo`}>
          <img
            className="d-block w-100"
            src="https://i.pinimg.com/originals/c1/d2/9a/c1d29afa001b30bb1ee53aaacd9cf2f1.png"
            alt="First slide"
          />

        </Carousel.Item>


        <Carousel.Item  as={Link} to={`/displaysales`}>
          <img
            className="d-block w-100"
            src="https://i.pinimg.com/originals/ab/e4/05/abe4054e277152853fba98902b5b3309.png"
            alt="First slide"
          />

        </Carousel.Item>

        <Carousel.Item  as={Link} to={`/productpage`}>
          <img
            className="d-block w-100"
            src="https://i.pinimg.com/originals/0a/86/a5/0a86a5f0449b3af170f03faeb0797577.png"
            alt="First slide"
          />

        </Carousel.Item>

      </Carousel>
      <br></br>

      <Jumbotron style={{ textAlign: 'center', background: 'white' }}>
        <h1 style={{ color: '#38b44a' }}>Story of Our Journey</h1><p style={{ color: '#066514' }}>________________________</p>
        <p style={{ fontSize: '18px' }}>We began with a dream of encouraging people to live in harmony with nature. Whether you are living amongst the hustle and bustle of the city, or in a secluded suburb, having beautiful green plants at home will brighten your day and bring tranquility in your life.
        To help you find this inner peace with nature’s beauty, we bring to you a wide collection of house plants that are perfect for both indoors and outdoors.</p>
      </Jumbotron>



      <div style={{ clear: 'left' }}></div>
      <h1 style={{ textAlign: 'center', color: '#38b44a' }}>Discover Categorys</h1>
      <br></br>
      <CardGroup>
        <Card style={{ borderColor: 'white', textAlign: 'center' }}>
          <Card.Img variant="top" src="https://i.pinimg.com/564x/5f/a4/52/5fa4526a53c7cb6790694fe4324759e0.jpg" />

          <Card.Body>
            <Card.Title style={{ fontSize: '25px' }} >Plant Accessories</Card.Title>

            <Button variant="outline-success" as={Link} to={`/productcategory/Plant accessories`}>Shop Now</Button>
            {/* productcategory */}
          </Card.Body>

        </Card>
        <Card style={{ borderColor: 'white', textAlign: 'center' }}>
          <Card.Img variant="top" src="https://i.pinimg.com/564x/a8/ab/69/a8ab692602cf2a127954c265c6e2b0c1.jpg" />
          <Card.Body>
            <Card.Title style={{ fontSize: '25px' }}>Indoor Plants</Card.Title>
            <Button variant="outline-success" as={Link} to={`/productcategory/Indoor`}>Shop Now</Button>


          </Card.Body>

        </Card>
        <Card style={{ borderColor: 'white', textAlign: 'center' }}>
          <Card.Img variant="top" src="https://i.pinimg.com/564x/f2/1b/68/f21b68dc56ec8d1e9d67a5f3d6a5166c.jpg" />
          <Card.Body>
            <Card.Title style={{ fontSize: '25px' }}>Outdoor Plants</Card.Title>
            <Button variant="outline-success" as={Link} to={`/productcategory/Outdoor`}>Shop Now</Button>

          </Card.Body>

        </Card>

      </CardGroup>
      <br></br><br></br><br></br>

      <h1 style={{ textAlign: 'center', color: '#38b44a' }}>Best Selling</h1>
      <>
        {
          products.slice(0, 4).map(product => <ProductShort key={product.id} product={product} />)
        }
      </>

      <div style={{ clear: 'left' }}></div>
      <CardGroup>
        <Card style={{ borderColor: 'white' }}>
          <Card.Body>
            <Card.Img variant="top" src="https://cdn.mos.cms.futurecdn.net/YrKpT3cQKoD3fyWFp2ECvf-768-80.jpg" />
          </Card.Body>
        </Card>

        <Card style={{ borderColor: 'white' }}>
          <Card.Body>
            <Card.Title style={{ fontSize: '25px', marginTop: '25%' }}>Decorating with plants is simple</Card.Title>
            <Card.Text style={{ fontSize: '18px' }}>You can transform a room with minimal effort.
            <br></br>
            To create the most interesting display, use a mixture of plant sizes and leaf shapes. A large plant like Pippa the peace lily, mixed with something sculptural like Susie the snake plant and a soft fern like Bertie gives an attractive range of textures.
            <br></br>
            Hanging plants, like Rapunzel the golden pothos, add interest at different heights.
            <br></br>
            Don’t forget your pots. Matching pots will look clean and elegant, while a mix of styles and patterns looks eclectic and fun.</Card.Text>
            <Button variant="outline-success" as={Link} to={`/productpage`} >Discover</Button>
          </Card.Body>
        </Card>
      </CardGroup>

      <br></br><br></br><br></br>
      {/* to={`/productdetail/${product.id}`} */}

      <h1 style={{ textAlign: 'center', color: '#38b44a' }}>Our Products</h1>

      < Product />
      <div style={{ clear: 'left' }}></div>

      <Button as={Link} to={`/productpage`}>View More Products</Button>

      <DisplayDiscount />
      {/* <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Home">
          
        </Tab>
        <Tab eventKey="profile" title="Profile">
         
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled>
         
        </Tab>
      </Tabs> */}

      <br></br><br></br>
      {/* < DisplayBlogHomePublic /> */}

      <DisplayFeedback />
      <br></br>

      <div style={{ clear: 'left' }}></div>

      <div style={styleForm}>
        <FAQ />
      </div>

      <br></br>

      <Button variant="light" style={{
        backgroundColor: "#4582ec", color: 'white', width: '70px', height: '70px', padding: '7px',
        borderRadius: '100px'
      }} onClick={styleing}>

        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
          <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
        </svg>

      </Button>

      < BlogsDisplayHome />


    </>
  )
}