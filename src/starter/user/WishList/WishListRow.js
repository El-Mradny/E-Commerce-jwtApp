import React, { useEffect, useState } from 'react';
import db from '../../../db';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import DisplaypackagesageinfoRow2 from '../../user/Packages/DisplayPackageinfoRow2'

function WishListRow({ wish, remove }) {

    const [jwtUser,] = useState(db.getJwtUser())

    const [product, setProduct] = useState(null);
    useEffect(() => (async () => wish && setProduct(wish.productid !== null ? await db.Products.findOne(wish.productid) : null))(), [wish])

    const [packages, setPackages] = useState(null);
    useEffect(() => (async () => wish && setPackages(wish.packageid !== null ? await db.Packages.findOne(wish.packageid) : null))(), [wish])

    const [sales, setSales] = useState(null)
    useEffect(() => (async () => product && setSales(await db.Sales.findByProductid(product.id)))(), [product])

    const x = sales && product && sales[0] !== undefined ? product.price - (sales[0].discountpercent / 100 * product.price) : null

    function dateDiffInDays(today, date) {
        return Math.round((date - today) / (1000 * 60 * 60 * 24));
    }

    const dotRed = {
        height: '55px',
        width: '55px',
        backgroundColor: 'red',
        borderRadius: '50%',
        zIndex: '6',
        position: 'absolute',
        margin: '10px',
        padding: '2px'
    }

    const onAdd = async packId => {
        //console.log('prodect id', packId);
        const cartId = await db.Carts.findByUseridAndStatus(jwtUser.username, 'unpaid')
        //console.log('cart id', cartId[0].id);
    
        const cartIdd = cartId && cartId[0].id
        const Cartitem = await db.Cartitems.findByPackageidAndCartid(packId, cartIdd) //package
        //console.log(Cartitem);
        if (Cartitem.length === 0) {
          await db.Cartitems.create(()=>{}, {cartid: cartId[0].id, productid: null, packageid: packId,productqty:null,packageqty:1});
          //console.log('new', cartItems);
        } else {
          //console.log('orader', cartItems);
        }
    
    };



    if (product && sales && wish.userid === jwtUser.username && product.productid !== null) {
        return (
            <Card border="success" style={{ width: '18rem', float: 'left', margin: '16px' }}>
                <Card.Header><strong>{product.name}</strong></Card.Header>
                <Card.Body>
                    {
                        sales[0] !== undefined && dateDiffInDays(new Date(), sales[0].enddate) > 0 && sales[0].publish === 'Published' ?
                            <span>
                                <span style={dotRed}></span>
                                <span style={{ fontSize: '20px', zIndex: '8', position: 'absolute', margin: '20px', color: 'white' }}>Sale</span>
                            </span> : null
                    }
                    <Card.Img variant="top" src={product.image} alt={product.image} height="300" width="200" />
                </Card.Body>
                <Card.Footer>
                    <Card.Text>
                        {
                            sales[0] !== undefined && dateDiffInDays(new Date(), sales[0].enddate) > 0 && sales[0].publish === 'Published' ?
                                <span> <span style={{ textDecorationLine: 'line-through' }}> {product.price} QR</span>  <span style={{ color: 'red', fontWeight: 'bold' }}> {x} QR  </span> </span>
                                : <span>{product.price} QR</span>
                        }

                        <br></br>{product.category}<br></br>
                        <Button variant="outline-success" title="Details" style={{ margin: '3px' }} as={Link} to={`/productdetail/${product.id}/${jwtUser.username}`}>Details</Button>
                    </Card.Text>

                    <Button variant="danger" onClick={() => remove(wish.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg> Remove From The Wishlist</Button>
                </Card.Footer>
            </Card>
        )
    }

    if (packages && wish.userid === jwtUser.username && packages.packageid !== null) {

        return (
            <div>
                {
                    <Card border="success" style={{ width: '18rem', float: 'left', margin: '16px' }} key={wish.id}>
                        <Card.Header>{packages.name}</Card.Header>
                        <Card.Body>
                            <DisplaypackagesageinfoRow2 pack={packages} />
                        </Card.Body>
                        <Card.Footer>
                            <Card.Text>
                                <span style={{ fontWeight: 'bold' }}>Only for {packages.price}QR</span>
                                <br></br>
                                <span style={{ color: 'red' }}>
                                    {dateDiffInDays(new Date(), packages.enddate)}
                                    {dateDiffInDays(new Date(), packages.enddate) >= 1 && dateDiffInDays(new Date(), packages.enddate) < 5 ?
                                        ' days left Hurry up' : ' days left'}
                                </span>
                                <br></br>
                                <Button variant="outline-success" title="Details" style={{ margin: '2px' }} as={Link} to={`/displaypackageproductdetail/${packages.id}`}>Package Details</Button>
                                <Button size="sm" variant="outline-success" title="Add To Cart" onClick={() => onAdd(packages.id)} style={{ margin: '2px' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-cart-plus" viewBox="0 0 16 16">
                                        <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                    </svg>
                                </Button>

                            </Card.Text>

                            <Button variant="danger" onClick={() => remove(wish.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                            </svg> Remove From The Wishlist</Button>
                        </Card.Footer>
                    </Card>
                }


            </div>

        )




    }
    else {
        return (
            <>
            </>

        )
    }
}


export default WishListRow;














































