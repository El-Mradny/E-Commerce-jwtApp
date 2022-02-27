import React, { useEffect, useState } from 'react'
import db from '../../db'
import {
  useParams
} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ProductShort from './ProductShort'
import { Link } from "react-router-dom";
import SamePack from "../user/SamePack/SamePack";
import Col from 'react-bootstrap/Col'
import Toast from 'react-bootstrap/Toast'
import Row from 'react-bootstrap/Row'
import RatingDisplay from './Rating/RatingDisplay'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Rate from './Rating';
import ProgressBar from 'react-bootstrap/ProgressBar'

export default function ProductDetail() {

  const { id: stringId } = useParams();
  const id = 1 * stringId

  const { userId: stringIdd } = useParams();
  const userId = stringIdd
  //console.log(userId);

  const [product, setProduct] = useState(null)
  useEffect(() => (async () => setProduct(await db.Products.findOne(id)))(), [id])

  const [similarServies, setSimilarServies] = useState([])
  useEffect(() => (async () => product && setSimilarServies(await db.Products.findByCategory(product.category)))(), [product])

  //---------------------------------

  const [packageproduct, setPackageproduct] = useState([])
  useEffect(() => (async () => id && setPackageproduct(await db.Packageproducts.findByProductid(id)))(), [id])

  //---------------------------------

  const [wishLists, setWishLists] = useState([])
  useEffect(() => (async () => setWishLists(await db.Wishlists.findAll()))(), [])

  const [cartItems, setCartitems] = useState([]);
  useEffect(() => (async () => setCartitems(await db.Cartitems.findAll()))(), [])

  //add first time product productqty+1 
  const onAdd = async product => {
    //console.log('old', cartItems);
    //console.log('prodect id', product);
    const cartId = await db.Carts.findByUseridAndStatus(userId, 'unpaid')
    //console.log('cart id', cartId[0].id);
    const cartIdd = cartId && cartId[0].id
    const Cartitem = await db.Cartitems.findByProductidAndCartid(product, cartIdd) //product
    if (Cartitem.length === 0) {
      await db.Cartitems.create(setCartitems, { cartid: cartId[0].id, productid: product, packageid: null, productqty: 1, packageqty: null });
      //console.log('new', cartItems);
    }

  };

  const onAddWishList = async productId => {
    console.log('onAddWishList', userId);
    const Wish = await db.Wishlists.findByUserid(userId)
    console.log('for the person productWishUser', Wish);

    if (Wish.length > 0) {
      const productWish = await db.Wishlists.findByProductidAndUserid(productId, userId)
      if (productWish.length === 0) {
        await db.Wishlists.create(setWishLists, { userid: userId, productid: productId, packageid: null });
        window.location = `http://localhost:3000/productdetail/${productId}/${userId}`
      }
    } else {
      const productWish = await db.Wishlists.findByProductidAndUserid(productId, userId)
      if (productWish.length === 0) {
        await db.Wishlists.create(setWishLists, { userid: userId, productid: productId, packageid: null });
        window.location = `http://localhost:3000/productdetail/${productId}/${userId}`
      }
    }

  }


  const productWishId = product && product.id;

  const [checkFav, setCheckFav] = useState(false)
  useEffect(() => (async () => setCheckFav(
    userId !== "" &&
    productWishId > 0
    && productWishId && userId && (await db.Wishlists.findByProductidAndUseridContains(productWishId, userId)).length === 0

  ))(), [productWishId, userId])

  const [compaers, setCompaers] = useState([])
  useEffect(() => (async () => setCompaers(await db.Compaers.findAll()))(), [])

  const [show, setShow] = useState(false);


  const onAddCompare = async productId => {
    console.log(productId);
    const compaersProduct = await db.Compaers.findByUserid(userId)
    console.log(compaersProduct && compaersProduct);
    if (compaersProduct.length > 0) {
      if (compaersProduct.length === 5) {
        await db.Compaers.remove(setCompaers, compaersProduct[0].id)
        const productCompaers = await db.Compaers.findByProductidAndUserid(productId, userId)
        console.log(productCompaers);
        if (productCompaers.length === 0) {
          await db.Compaers.create(setCompaers, { userid: userId, productid: productId });
          setShow(true)
        }
      } else {
        const productCompaers = await db.Compaers.findByProductidAndUserid(productId, userId)
        if (productCompaers.length === 0) {
          await db.Compaers.create(setCompaers, { userid: userId, productid: productId });
          setShow(true)
        }

      }

    }
    else {
      const productCompaers = await db.Compaers.findByProductidAndUserid(productId, userId)
      console.log(productCompaers && productCompaers);
      if (productCompaers.length === 0) {
        await db.Compaers.create(setCompaers, { userid: userId, productid: productId });
        setShow(true)
      }
    }
  }

  const [sales, setSales] = useState(null)
  useEffect(() => (async () => product && setSales(await db.Sales.findByProductid(product.id)))(), [product])

  function dateDiffInDays(today, date) {
    return Math.round((date - today) / (1000 * 60 * 60 * 24));
  }

  const dotRed = {
    height: '80px',
    width: '80px',
    backgroundColor: 'red',
    borderRadius: '50%',
    zIndex: '6',
    position: 'absolute',
    margin: '10px',
    padding: '2px'
  }

  //============================================
  const [showw, setShoww] = useState(false);
  const handleClose = () => setShoww(false);
  const handleShow = () => setShoww(true);

  const [ratings, setRatings] = useState([])
  useEffect(() => (async () => setRatings(await db.Ratings.findAll()))(), [])
  //console.log(ratings);

  const [productReviews, setproductReviews] = useState([])
  useEffect(() => (async () => product && setproductReviews(await db.Ratings.findByProductid(product.id)))(), [product]) //COUNT 

  const totalStar = productReviews.reduce((tot, str) => tot + str.stars, 0);
  const avg = totalStar / productReviews.length //AVG 4.4
  const hello = Math.floor(avg)



  //----------------------

  const [reviweComment, setreviwecomment] = useState("")
  const [stars, setStars] = useState(0)
  const [image, setImage] = useState("")

  const handleImage = async (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      const extension = file.name.split('.').pop()
      const newName = `Product-${userId}-Review.${extension}`
      if (reviweComment !== "" || stars > 0) {
        const result = await db.uploadImage(file, newName)
        if (result.ok) {
          setImage(`/images/${newName}`)
        }
      }
    }
  }

  const [reviweComERR, setReviweComERR] = useState("")
  const [starsERR, setStarsERR] = useState("")
  const [inforTheRuleERR, setInforTheRuleERR] = useState("")
  //customer cant rat if they didnt buy the product 
  //if they did it will update it the last rating 
  //if a customer 

  const [cart, setCart] = useState([])
  useEffect(() => (async () => setCart(await db.Carts.findByUseridAndStatus(userId, "paid")))(), [userId])

  const [createValid, setCreateValid] = useState(false)
  useEffect(() => (async () => setCreateValid(
    cart.length >= 4
  ))(), [cart])

  // const ratingg = async product => {
  //   let haveIt = '';
  //   const cart = await db.Carts.findByUseridAndStatus(userId, 'paid')
  //   if (cart && cart.length > 0) {

  //     cart.map(async (item) => {
  //       const cartitem = await db.Cartitems.findByCartid(item.id)
  //       cartitem.map(async (item) => {

  //         if (item.productid !== null) {

  //           if (item.productid !== product) {
  //             //console.log("Sorry you cant rate this product since you didnt buy it yet")
  //             //let haveIt = false
  //             console.log(item.productid);
  //             console.log(product);
  //             //console.log(haveIt);
  //             haveIt='No never bought'
  //           }

  //           if (item.productid === product) {
  //             const rating = await db.Ratings.findByProductidAndUserid(product, userId)
  //             //let haveIt = true
  //             console.log(rating);
  //             if (rating.length > 0) {
  //               console.log("i rate it update");
  //             }
  //             if (rating.length === 0) {
  //               console.log("i did nt it create ");
  //             }
  //             haveIt ='Yes'
  //             //console.log("have it bought it orderly");
  //             //console.log(haveIt);
  //           }
  //         }

  //       })
  //     })

  //   }
  //   console.log(haveIt);
  // }

  // const [inforTheRule, setInforTheRule] = useState("")
  // useEffect(() => (async () => {
  //   const cart = await db.Carts.findByUseridAndStatus(userId, 'paid')
  //   if (cart && cart.length > 0) {

  //     cart.map(async (item) => {
  //       const cartitem = await db.Cartitems.findByCartid(item.id)
  //       cartitem.map(async (item) => {

  //         if (item.productid !== null) {

  //           if (item.productid !== product) {
  //             //console.log("Sorry you cant rate this product since you didnt buy it yet")
  //             //let haveIt = false
  //             console.log(item.productid);
  //             console.log(product);
  //             //console.log(haveIt);
  //             //'No never bought')
  //           }

  //           if (item.productid === product) {
  //             const rating = await db.Ratings.findByProductidAndUserid(product, userId)
  //             //let haveIt = true
  //             console.log(rating);
  //             if (rating.length > 0) {
  //               console.log("i rate it update");
  //             }
  //             if (rating.length === 0) {
  //               console.log("i did nt it create ");
  //             }
  //             //('Yes')
  //             //console.log("have it bought it orderly");
  //             //console.log(haveIt);
  //           }
  //         }

  //       })
  //     })

  //   }

  // })(), [])




  // const arry = []
  // const ratingg = async product => {
  //   const cart = await db.Carts.findByUseridAndStatus(userId, 'paid')
  //   if (cart && cart.length > 0) {
  //     cart.map(async (item) => {
  //       const cartitem = await db.Cartitems.findByCartid(item.id)
  //       cartitem.map(async (item) => {
  //         if (item.productid !== null) {
  //           arry.push(item.productid)
  //         }
  //       })
  //     })
  //   }
  //   var hello = 'yes'
  //   arry.map(item => {
  //     //console.log(item)
  //     if (item === product) {
  //       // const rating = await db.Ratings.findByProductidAndUserid(product, userId)
  //       // hello = 'yes'
  //       // console.log(rating);
  //       // if (rating.length > 0) {
  //       //   console.log("i rate it ");
  //       // }
  //       // if (rating.length === 0) {
  //       //   console.log("i did dont it ");
  //       // }
  //       // hello='yes'
  //       console.log('item',item);
  //       //console.log(item);

  //       //console.log("have it bought it orderly");
  //       //console.log(haveIt);
  //     }
  //     else if (item !== product) {

  //       //console.log("Sorry you cant rate this product since you didnt buy it yet")
  //       //let haveIt = false

  //       //console.log(item);
  //       //console.log(haveIt);
  //       hello = 'no'
  //       console.log('product', product);
  //     }


  //   })
  //   console.log(hello);
  //   console.log(arry);
  //   console.log(product);
  //   const x = arry.findIndex(elem => elem === product)
  //   console.log(x);
  //   // window.location = `http://localhost:3000/productdetail/${product}/${userId}`
  // }












  // arry.map(item => 
  //   console.log(item)
  // )


  // if (item.productid !== product) {
  //   //console.log("Sorry you cant rate this product since you didnt buy it yet")
  //   //let haveIt = false
  //   console.log(item.productid);
  //   console.log(product);
  //   //console.log(haveIt);
  //   setInforTheRule('No')
  // }

  // if (item.productid === product) {
  //   const rating = await db.Ratings.findByProductidAndUserid(product, userId)
  //   //let haveIt = true
  //   console.log(rating);
  //   if (rating.length > 0) {
  //     console.log("i rate it ");
  //   }
  //   if (rating.length === 0) {
  //     console.log("i did dont it ");
  //   }
  //   setInforTheRule('Yes')
  //   //console.log("have it bought it orderly");
  //   //console.log(haveIt);
  // }















  const vaild = async product => {
    console.log(product);
    if (reviweComment !== "") {
      setReviweComERR("")
    } else {
      setReviweComERR("We love to read your comment")
    } if (stars > 0) {
      setStarsERR("")
    } else {
      setStarsERR("You forgot to rate the stars")
    }
    if (reviweComment !== "" && stars > 0) {
      //ratingg(product)
      //await db.Ratings.create(() => { }, { userid: userId, productid: product, reviwecomment: reviweComment, stars: stars, image: image, ratingdate: new Date() });
      handleClose()
    }

  };


  //count of each star for that product
  const one = ratings.filter(elem => elem.stars === 1 && elem.productid === product.id).length
  const two = ratings.filter(elem => elem.stars === 2 && elem.productid === product.id).length
  const three = ratings.filter(elem => elem.stars === 3 && elem.productid === product.id).length
  const four = ratings.filter(elem => elem.stars === 4 && elem.productid === product.id).length
  const five = ratings.filter(elem => elem.stars === 5 && elem.productid === product.id).length


  const total = one + two + three + four + five


  //count of 1 star / count of all ratinging

  //devieting it by the count of whole (one / ratings.length) * 100  || Math.floor((one / ratings.length) * 100)
  // const nowOne = Math.floor((one / ratings.length)* 100)
  // const nowTwo = Math.floor((two / ratings.length)* 100)
  // const nowThree = Math.floor((three / ratings.length)* 100)
  // const nowFour = Math.floor((four / ratings.length)* 100)
  // const nowFive = Math.floor((five / ratings.length)* 100)

  const nowOne = Math.floor((one / total) * 100)
  const nowTwo = Math.floor((two / total) * 100)
  const nowThree = Math.floor((three / total) * 100)
  const nowFour = Math.floor((four / total) * 100)
  const nowFive = Math.floor((five / total) * 100)






  const progressInstanceOne = <ProgressBar variant="warning" now={nowOne} label={`${nowOne}%`} />;
  const progressInstanceTwo = <ProgressBar variant="warning" now={nowTwo} label={`${nowTwo}%`} />;
  const progressInstanceThree = <ProgressBar variant="warning" now={nowThree} label={`${nowThree}%`} />;
  const progressInstanceFour = <ProgressBar variant="warning" now={nowFour} label={`${nowFour}%`} />;
  const progressInstanceFive = <ProgressBar variant="warning" now={nowFive} label={`${nowFive}%`} />;

  return (
    product
    && sales &&
    <>
      <div className="container">
        <br></br>
        <Row>
          <Col xs={6}>
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide style={{ backgroundColor: '#38b44aad' }}>
              <Toast.Header>
                <strong className="mr-auto">Compare</strong>
                <small>1 sec ago</small>
              </Toast.Header>
              <Toast.Body>Its add to Compare</Toast.Body>
            </Toast>
          </Col>
        </Row>
        <h1>{product.name}</h1>
        <br></br>
        <div className="row">

          <div className="col-sm-5" style={{ paddingLeft: '0px' }}>
            <div>
              {
                sales[0] !== undefined && dateDiffInDays(new Date(), sales[0].enddate) > 0 &&
                  sales[0].startdate < new Date() && sales[0].enddate > new Date() && sales[0].publish === 'Published' ?
                  <div>
                    <span style={dotRed}></span>
                    <span style={{ fontSize: '23px', zIndex: '8', position: 'absolute', margin: '30px', color: 'white' }}>Sale</span>
                  </div> : null}

              <img src={product.image} alt={`This is ${product.name}`} width="100%" style={{ textAlign: 'left' }}></img>
            </div>
          </div>
          <div className="col-sm-6" >
            {
              sales[0] !== undefined && dateDiffInDays(new Date(), sales[0].enddate) > 0 &&
                sales[0].startdate < new Date() && sales[0].enddate > new Date() && sales[0].publish === 'Published' ?

                <dl className="row" style={{ fontSize: '18px' }}>
                  <dt className="col-sm-3">Price</dt>
                  <dd className="col-sm-9">
                    <span style={{ textDecorationLine: 'line-through' }}>{product.price} QR </span>
                    <span style={{ color: 'red', fontWeight: 'bold', margin: '10px' }}>  Now {product.price - (sales[0].discountpercent / 100 * product.price)} QR</span>
                    <span style={{ backgroundColor: '#e95c5b', color: 'white', borderRadius: '2px', padding: '2px' }}> {sales[0].discountpercent}% OFF</span><br></br>
                    <span style={{ color: 'red' }}>
                      {dateDiffInDays(new Date(), sales[0].enddate)}
                      {dateDiffInDays(new Date(), sales[0].enddate) >= 1 && dateDiffInDays(new Date(), sales[0].enddate) < 5 ?
                        ' days left Hurry up' : ' days left'}
                    </span><br></br>
                    <span style={{ color: 'green' }}>Save up {(product.price - (product.price - (sales[0].discountpercent / 100 * product.price))).toFixed(2)} QR</span>
                  </dd>

                  <dt className="col-sm-3">Category</dt>
                  <dd className="col-sm-9">{product.category}</dd>
                  <dt className="col-sm-3">Stock</dt>
                  <dd className="col-sm-9">{product.quantity}</dd>
                  <dt className="col-sm-3">Status</dt>
                  <dd className="col-sm-9">{product.quantity > 0 ? 'Available' : 'Out Of Stock'}</dd>

                  <dt className="col-sm-3">Description</dt>
                  <dd className="col-sm-9">{product.description}</dd>

                  {
                    productReviews.length !== 0 ?
                      <>
                        <dt className="col-sm-10" style={{ fontSize: '20px' }}>

                          {(() => {
                            let row = []
                            for (var i = 0; i < hello; i++) {
                              row.push(<svg key={i} xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#FFD700" className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                              </svg>)
                            }
                            return row
                          })()
                          }
                          {
                            avg > hello && hello !== 5 ?
                              //half
                              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#FFD700" class="bi bi-star-half" viewBox="0 0 16 16">
                                <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                              </svg>
                              :
                              //full
                              hello !== 5 && avg !== hello ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#FFD700" className="bi bi-star-fill" viewBox="0 0 16 16">
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                : null
                          }

                          {'  '}{avg.toFixed(1)} out of 5 | {productReviews.length} Reviews
                        </dt>
                        <dd className="col-sm-9"></dd></> : <>
                        <dt className="col-sm-8" style={{ fontSize: '20px' }}>

                          {(() => {
                            let row = []
                            for (var i = 0; i < 5; i++) {
                              row.push(<svg key={i} xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#e5e5e5" className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                              </svg>)
                            }
                            return row
                          })()
                          }


                          {' '}| 0 Reviews
                        </dt>
                        <dd className="col-sm-9"></dd></>
                  }

                  {product.sunlight === "" ?
                    <span>
                      <dt className="col-sm-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fillRule="currentColor" className="bi bi-thermometer-sun" viewBox="0 0 16 16">
                          <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585A1.5 1.5 0 0 1 5 12.5z" />
                          <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1zm5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zm4.243 1.757a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0zM8 5.5a.5.5 0 0 1 .5-.5 3 3 0 1 1 0 6 .5.5 0 0 1 0-1 2 2 0 0 0 0-4 .5.5 0 0 1-.5-.5zM12.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5zm-1.172 2.828a.5.5 0 0 1 .708 0l.707.708a.5.5 0 0 1-.707.707l-.708-.707a.5.5 0 0 1 0-.708zM8.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5z" />
                        </svg> Measures: </dt>
                      <dd className="col-sm-9">{product.measures}</dd>
                    </span>
                    : null}
                </dl>
                :
                <dl className="row" style={{ fontSize: '18px' }}>
                  <dt className="col-sm-3">Price</dt>
                  <dd className="col-sm-9">{product.price} QR</dd>
                  <dt className="col-sm-3">Category</dt>
                  <dd className="col-sm-9">{product.category}</dd>
                  <dt className="col-sm-3">Stock</dt>
                  <dd className="col-sm-9">{product.quantity}</dd>
                  <dt className="col-sm-3">Status</dt>
                  <dd className="col-sm-9">{product.quantity > 0 ? 'Available' :
                    <span style={{ backgroundColor: 'yellow', borderRadius: '5px', padding: '3px' }}>Out Of Stock</span>}</dd>

                  <dt className="col-sm-3">Description</dt>
                  <dd className="col-sm-9">{product.description}</dd>

                  {
                    productReviews.length !== 0 ?
                      <>
                        <dt className="col-sm-10" style={{ fontSize: '20px' }}>

                          {(() => {
                            let row = []
                            for (var i = 0; i < hello; i++) {
                              row.push(<svg key={i} xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#FFD700" className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                              </svg>)
                            }
                            return row
                          })()
                          }
                          {
                            avg > hello && hello !== 5 ?
                              //half
                              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#FFD700" class="bi bi-star-half" viewBox="0 0 16 16">
                                <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                              </svg>
                              :
                              //full
                              hello !== 5 && avg !== hello ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#FFD700" className="bi bi-star-fill" viewBox="0 0 16 16">
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                : null
                          }

                          {'  '}{avg.toFixed(1)} out of 5 | {productReviews.length} Reviews
                        </dt>
                        <dd className="col-sm-9"></dd></>
                      :
                      <>
                        <dt className="col-sm-8" style={{ fontSize: '20px' }}>

                          {(() => {
                            let row = []
                            for (var i = 0; i < 5; i++) {
                              row.push(<svg key={i} xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#e5e5e5" className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                              </svg>)
                            }
                            return row
                          })()
                          }


                          {' '}| 0 Reviews
                        </dt>
                        <dd className="col-sm-9"></dd></>
                  }


                  {product.sunlight === "" ?
                    <span>
                      <dt className="col-sm-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fillRule="currentColor" className="bi bi-thermometer-sun" viewBox="0 0 16 16">
                          <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585A1.5 1.5 0 0 1 5 12.5z" />
                          <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1zm5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zm4.243 1.757a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0zM8 5.5a.5.5 0 0 1 .5-.5 3 3 0 1 1 0 6 .5.5 0 0 1 0-1 2 2 0 0 0 0-4 .5.5 0 0 1-.5-.5zM12.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5zm-1.172 2.828a.5.5 0 0 1 .708 0l.707.708a.5.5 0 0 1-.707.707l-.708-.707a.5.5 0 0 1 0-.708zM8.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5z" />
                        </svg> Measures: </dt>
                      <dd className="col-sm-9">{product.measures}</dd>
                    </span>
                    : null}
                </dl>
            }



            {
              product.quantity > 0 ? <Button size="lg" variant="success" className="btn btn-success" onClick={() => onAdd(product.id)} style={{ margin: '2px' }}>
                ADD TO CART
              </Button> : <Button size="lg" variant="success" disabled className="btn btn-success" onClick={() => onAdd(product.id)} style={{ margin: '2px' }}>
                ADD TO CART
              </Button>
            }


            <Button type="button" size="lg" className="btn btn-primary" onClick={() => onAddWishList(product.id)} disabled={!checkFav} title="WishList" >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>
            </Button>


            <Button size="lg" variant="outline-success" onClick={() => onAddCompare(product.id)} title="Compare" style={{ margin: '2px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-arrow-left-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z" />
              </svg>
            </Button>

            {/* onClick={handleShow} */}
            <Button style={{ fontSize: '22px' }} variant="success" className="btn btn-success" disabled={!createValid} onClick={handleShow}>
              Review The Product
            </Button>



            <Modal
              show={showw}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Rating Product <br></br> {inforTheRuleERR}</Modal.Title>
              </Modal.Header>
              <Modal.Body>

                <br></br>
                <Form.Label>Rating</Form.Label>
                < Rate rating={stars} setRating={setStars} />
                <span style={{ fontWeight: 'bold', color: 'red' }}>{starsERR}</span>

                <br></br>
                <Form.Label>Feedback</Form.Label>
                <Form.Control as="textarea" rows={3} type="textBox" onChange={event => setreviwecomment(event.target.value)} placeholder="Comment" value={reviweComment} />
                <span style={{ fontWeight: 'bold', color: 'red' }}>{reviweComERR}</span>
                <br></br>
                <Form.Label>Image</Form.Label><br></br>
                <Form.File custom label="Choose new picture" onChange={handleImage} />
                <span style={{ color: 'green' }}>Optional but it might help someone :)</span>
                <br></br><br></br><br></br>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="success" style={{ margin: '5px' }}>Send</Button>
              </Modal.Footer>
            </Modal>

          </div>
        </div>
        <br></br><br></br><br></br>
      </div>
      {product.sunlight !== "" ?
        <div className="container">

          <div className="row" style={{ textAlign: 'center' }}>
            <div className="col-sm">

              <svg style={{ float: 'left' }} xmlns="http://www.w3.org/2000/svg" width="60" height="60" fillRule="currentColor" className="bi bi-brightness-high" viewBox="0 0 16 16">
                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
              </svg>
              <h5 style={{ float: 'left', marginLeft: '20px', marginTop: '20px' }}>Sunlight</h5>
              <div style={{ clear: 'left' }}></div>
              <br></br>
              <p style={{ fontSize: '18px' }}>{product.sunlight}</p>
            </div>
            <div className="col-sm">
              <svg style={{ float: 'left' }} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fillRule="currentColor" className="bi bi-droplet" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z" />
                <path fillRule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z" />
              </svg>
              <h5 style={{ float: 'left', marginLeft: '20px', marginTop: '20px' }}>Water</h5>
              <div style={{ clear: 'left' }}></div>
              <br></br>
              <p style={{ fontSize: '18px' }}>{product.water}</p>
            </div>
            <div className="col-sm" >
              <svg style={{ float: 'left' }} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fillRule="currentColor" className="bi bi-thermometer-sun" viewBox="0 0 16 16">
                <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585A1.5 1.5 0 0 1 5 12.5z" />
                <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1zm5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zm4.243 1.757a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0zM8 5.5a.5.5 0 0 1 .5-.5 3 3 0 1 1 0 6 .5.5 0 0 1 0-1 2 2 0 0 0 0-4 .5.5 0 0 1-.5-.5zM12.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5zm-1.172 2.828a.5.5 0 0 1 .708 0l.707.708a.5.5 0 0 1-.707.707l-.708-.707a.5.5 0 0 1 0-.708zM8.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5z" />
              </svg>
              <h5 style={{ float: 'left', marginLeft: '20px', marginTop: '20px' }}>Temperature</h5>
              <div style={{ clear: 'left' }}></div>
              <br></br>
              <p style={{ fontSize: '18px' }}>{product.temperature}</p>
            </div>
            <div className="col-sm">
              <svg style={{ float: 'left' }} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fillRule="currentColor" className="bi bi-palette2" viewBox="0 0 16 16">
                <path d="M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 .5.5v5.277l4.147-4.131a.5.5 0 0 1 .707 0l3.535 3.536a.5.5 0 0 1 0 .708L10.261 10H15.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5H3a2.99 2.99 0 0 1-2.121-.879A2.99 2.99 0 0 1 0 13.044m6-.21 7.328-7.3-2.829-2.828L6 7.188v5.647zM4.5 13a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zM15 15v-4H9.258l-4.015 4H15zM0 .5v12.495V.5z" />
                <path d="M0 12.995V13a3.07 3.07 0 0 0 0-.005z" />
              </svg>
              <h5 style={{ float: 'left', marginLeft: '20px', marginTop: '20px' }}>Measures</h5>
              <div style={{ clear: 'left' }}></div>
              <br></br>
              <p style={{ fontSize: '18px' }}>{product.measures}</p>
            </div>
          </div>
          <br></br>
          <hr></hr>

        </div>
        : null}
      <br></br><br></br><br></br>
      <div style={{ clear: 'left' }}></div>
      <h3>You might Also like</h3>
      <br></br>
      <>
        {
          similarServies.filter(elm => elm.id !== product.id).map(product => <ProductShort key={product.id} product={product} />)
        }
      </>
      <div style={{ clear: 'left' }}></div>
      <Button as={Link} to={`/productpage`}>View More Products</Button>
      <div style={{ clear: 'left' }}></div>
      <br></br><br></br>
      {
        packageproduct.length > 0 ? <h3>{product.name.toLowerCase()} is available in a package also</h3> : null
      }

      <br></br>
      {
        packageproduct.length > 0 ?

          packageproduct.filter(elem => elem.productid === elem.productid).map(elem => < SamePack key={elem.id} packageid={elem.packageid} productid={elem.productid} />) : null
      }
      <br></br>

      {
        productReviews.length !== 0 ?
          <>
            <div className="row">
              <div class="col-sm-2" style={{ paddingTop: '0px', paddingLeft: '0px' }}>
                <div style={{ textAlign: 'center' }}><span style={{ fontSize: '20px', marginRight: '5px' }}>5</span>

                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fbd46a" className="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>

                </div>
                <div style={{ textAlign: 'center' }}><span style={{ fontSize: '20px', marginRight: '5px' }}>4</span>

                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fbd46a" className="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>

                </div>
                <div style={{ textAlign: 'center' }}><span style={{ fontSize: '20px', marginRight: '5px' }}>3</span>

                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fbd46a" className="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>

                </div>
                <div style={{ textAlign: 'center' }}><span style={{ fontSize: '20px', marginRight: '5px' }}>2</span>

                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fbd46a" className="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>

                </div>
                <div style={{ textAlign: 'center' }}><span style={{ fontSize: '20px', marginRight: '5px' }}>1</span>

                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fbd46a" className="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                </div>
              </div>


              <div class="col-sm-4" style={{ padding: '0px' }}>
                <div style={{ margin: '11px', padding: '0px' }}>{progressInstanceFive}</div>
                <div style={{ margin: '11px', padding: '0px' }}>{progressInstanceFour}</div>
                <div style={{ margin: '11px', padding: '0px' }}>{progressInstanceThree}</div>
                <div style={{ margin: '11px', padding: '0px' }}>{progressInstanceTwo}</div>
                <div style={{ margin: '11px', padding: '0px' }}>{progressInstanceOne}</div>
              </div>

              <div class="col-sm-4" style={{ padding: '0px' }}>
                <div style={{ margin: '4px', padding: '0px' }}>{nowFive}%</div>
                <div style={{ margin: '4px', padding: '0px' }}>{nowFour}%</div>
                <div style={{ margin: '4px', padding: '0px' }}>{nowThree}%</div>
                <div style={{ margin: '4px', padding: '0px' }}>{nowTwo}%</div>
                <div style={{ margin: '4px', padding: '0px' }}>{nowOne}%</div>
              </div>
            </div>
          </>
          : null

      }





      {
        productReviews.length > 0 ? <h3>Customer Reviews</h3> : null
      }

      {
        productReviews.map(rating => < RatingDisplay key={rating.id} rating={rating} />)
      }
    </>
  )
}
  // const [inforTheRule, setInforTheRule] = useState("")
  // const ratingg = async product => {

  //   // let haveIt = 'No';
  //   const cart = await db.Carts.findByUseridAndStatus(userId, 'paid')
  //   if (cart && cart.length > 0) {

  //     cart.map(async (item) => {
  //       const cartitem = await db.Cartitems.findByCartid(item.id)
  //       cartitem.map(async (item) => {

  //         // if (item.productid !== null) {

  //           if (item.productid !== product) {
  //             //console.log("Sorry you cant rate this product since you didnt buy it yet")
  //             //let haveIt = false
  //             console.log(item.productid);
  //             console.log(product);
  //             //console.log(haveIt);
  //             setInforTheRule('No')
  //           }

  //           if (item.productid === product) {
  //             const rating = await db.Ratings.findByProductidAndUserid(product, userId)
  //             //let haveIt = true
  //             console.log(rating);
  //             if (rating.length > 0) {
  //               console.log("i rate it ");
  //             }
  //             if (rating.length === 0) {
  //               console.log("i did dont it ");
  //             }
  //             setInforTheRule('Yes')
  //             //console.log("have it bought it orderly");
  //             //console.log(haveIt);
  //           }


  //         // }
  //       })

  //     })