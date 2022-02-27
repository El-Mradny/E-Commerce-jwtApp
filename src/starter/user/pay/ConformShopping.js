import React, { useContext, useEffect, useState } from 'react';
import db from '../../../db';
import Button from 'react-bootstrap/Button';
import {
    useParams
} from "react-router-dom";
import { Link } from "react-router-dom";
import UserContext from '../../../UserContext';

export default function ConformShopping() {

    const { user } = useContext(UserContext)

    const { total: stringTotal } = useParams();
    const totalUser = 1 * stringTotal

    const { totalshipping: stringShippingCost } = useParams();
    const totalshipping = 1 * stringShippingCost

    const { shippingId: stringShippingId } = useParams();
    const shippingId = 1 * stringShippingId

    const [payments, setPayments] = useState([])
    useEffect(() => (async () => setPayments(await db.Payments.findAll()))(), [])
    console.log(payments);
    const x = payments.slice(-1)[0]
    console.log(x && x.id);

    console.log('payment totalCost', totalUser);
    console.log('payment totalShipping', totalshipping);
    console.log('Shipping Id', shippingId);

    const [products, setProducts] = useState([])
    useEffect(() => (async () => setProducts(await db.Products.findAll()))(), [])

    //onsole.log(products);
    const [cart, setCart] = useState([])
    useEffect(() => (async () => setCart(await db.Carts.findByUseridAndStatus(user.id, "unpaid")))(), [user.id])
    console.log(cart);

    const [carts, setCarts] = useState([])
    useEffect(() => (async () => setCarts(await db.Carts.findAll()))(), [])
    console.log(carts);
    const z = carts.slice(-1)[0]
    console.log(z && z.id);

    const [cartOld, setCartOld] = useState()

    const handleEmail = async (x) => {
        console.log('emailllllllllll', cartOld);
        await db.email(
           'amna_2023@hotmail.com',
            `Attention Customer!!!`,
            `
            <h1 style='color:green;'>Green World</h1>
            <h2>Dear Customer,</h2>
            <p>Thank you for purchase,
            <h4>For security reasons you need to login in and enter this code then you will be able to access your info.</h4>
            <h1>Code:${x}</h1>
            <p>For tracking your shipping go to cart history</p>
            <a href="http://localhost:3000/billemail/${x}">Click To See Order Summary</a><br>
            <p>Our goal is to Provided all kind of plants to make your home more beautiful.<br>
          `
        )
    }

    const Closing = async () => {

        x && shippingId && totalUser && cart && z &&
        
        handleEmail(z.id)

        handleEmail(z.id)

        await db.Carts.update(setCart, {
            id: cart[0].id, status: "paid", userid: user.id, paymentid: x.id, shippingid: shippingId, checkoutdate: new Date(),
            orderstatus: "Processing", total: totalUser, discountid: cart[0].discountid === null ? null : cart[0].discountid,shippingcost:totalshipping
        })

        await db.Carts.create(() => { }, {
            status: 'unpaid', userid: user.id, paymentid: null, shippingid: null, checkoutdate: null, orderstatus: "Processing",
            total: 0, discountid: null
        })

        window.location = "http://localhost:3000/cart";

    }

    const Stock = async () => {
        const cart = await db.Carts.findByUseridAndStatus(user.id, 'unpaid')
        const cartItem = await db.Cartitems.findByCartid(cart[0].id)
        cartItem && cartItem.map(async (item) => {
            if (item.productid !== null) {
                const product = await db.Products.findOne(item.productid)
                await db.Products.update(() => { }, {
                    id: product.id, name: product.name, price: product.price,
                    sunlight: product.sunlight, water: product.water, temperature: product.temperature, measures: product.measures,
                    category: product.category,
                    status: product.status, quantity: product.quantity - item.productqty, date: product.date, image: product.image, description: product.description,
                    soldcount: product.soldcount + item.productqty
                })
            }

            if (item.packageid !== null) {
                const pack = await db.Packages.findOne(item.packageid)//packages
                //console.log(pack);
                const packproducts = await db.Packageproducts.findByPackageid(pack.id)//list of products inside the package
                //console.log(packproducts);
                packproducts.map(async (itemm) => {
                    //console.log(itemm.id);
                    const product = await db.Products.findOne(itemm.productid)//the product inside it 
                    //console.log(product);
                    await db.Products.update(() => { }, {
                        id: product.id, name: product.name, price: product.price,
                        sunlight: product.sunlight, water: product.water, temperature: product.temperature, measures: product.measures,
                        category: product.category,
                        status: product.status, quantity: product.quantity - item.packageqty, date: product.date, image: product.image, description: product.description,
                        soldcount: product.soldcount + item.productqty
                    })
                })
            }
        })
        Closing()
    }
    console.log(products);
    console.log(cart);
    console.log(carts);
    console.log(cartOld);



    return (
        <div>
            <br></br><br></br>
            <div class="container">
                <div class="row">
                    <div class="col-sm-7" style={{ margin: 'auto', textAlign: 'center', color: 'black', backgroundColor: '#bababa6e', padding: '40px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="green" class="bi bi-check-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                        </svg>
                        <h2>Thank you for your purchase!</h2>
                        <h4>Places click Final Conform By that you should receive an order summary email shortly.</h4>
                        <h4>For security reasons you need to login in with the code that is giving in the 
                            email then you will be able to access your info.
                        </h4>
                 
                        {/* <h1>Code: {cartOld && cartOld}</h1> */}
                        <p>For tracking your shipping go to cart history</p>


                        <Button variant="primary" onClick={Stock}>Final Conform</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}