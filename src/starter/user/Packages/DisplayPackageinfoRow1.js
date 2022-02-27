import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card'
import DisplayPackageinfoRow2 from './DisplayPackageinfoRow2'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import db from '../../../db';
import UserContext from '../../../UserContext'

export default function DisplayPackageinfoRow1({ pack }) {
    const { user } = useContext(UserContext)

    const [wishLists, setWishLists] = useState([])
    useEffect(() => (async () => setWishLists(await db.Wishlists.findAll()))(), [])


    const [cartItems, setCartitems] = useState([]);
    useEffect(() => (async () => setCartitems(await db.Cartitems.findAll()))(), [])

    //First time add a Package packageqty+1
    const onAdd = async packId => {
        //console.log('prodect id', packId);
        const cartId = await db.Carts.findByUseridAndStatus(user.id, 'unpaid')
        //console.log('cart id', cartId[0].id);

        const cartIdd = cartId && cartId[0].id
        const Cartitem = await db.Cartitems.findByPackageidAndCartid(packId, cartIdd) //package
        //console.log(Cartitem);
        if (Cartitem.length === 0) {
            await db.Cartitems.create(() => { }, { cartid: cartId[0].id, productid: null, packageid: packId, productqty: null, packageqty: 1 });
            //console.log('new', cartItems);
        } else {
            //console.log('orader', cartItems);
        }

    };

    const onAddWishList = async packId => {
        console.log('onAddWishList', user.id);
        const Wish = await db.Wishlists.findByUserid(user.id)
        console.log('for the person productWishUser', Wish);

        if (Wish.length > 0) {
            const packageWish = await db.Wishlists.findByPackageidAndUserid(packId, user.id)
            console.log(packageWish && packageWish);
            if (packageWish.length === 0) {
                await db.Wishlists.create(setWishLists, { userid: user.id, productid: null, packageid: packId });
                window.location = `http://localhost:3000/displaypackageinfo`
            }
        }
        else {
            const packageWish = await db.Wishlists.findByPackageidAndUserid(packId, user.id)
            if (packageWish.length === 0) {
                await db.Wishlists.create(setWishLists, { userid: user.id, productid: null, packageid: packId });
                window.location = `http://localhost:3000/displaypackageinfo`
            }
        }

    }

    const packWishId = pack && pack.id;

    const [checkFav, setCheckFav] = useState(false)
    useEffect(() => (async () => setCheckFav(
        user.id !== "" &&
        packWishId > 0
        && packWishId && user.id && (await db.Wishlists.findByPackageidAndUseridContains(packWishId, user.id)).length === 0

    ))(), [packWishId, user.id])


    //console.log(cartItems);

    function dateDiffInDays(today, date) {
        return Math.round((date - today) / (1000 * 60 * 60 * 24));
    }

    const days = pack && dateDiffInDays(new Date(), pack.enddate)

    return (
        pack
            && (+pack.startdate + new Date() || pack.startdate > new Date()) && pack.enddate > pack.startdate && pack.publish === 'Published' && days > 0
            ?
            <div>
                {
                    <Card border="success" style={{ width: '18rem', float: 'left', margin: '10px', fontSize: '17px' }} key={pack.id}>
                        <Card.Header style={{ fontWeight: 'bold'}}>{pack.name}</Card.Header>
                        <Card.Body>
                            <DisplayPackageinfoRow2 pack={pack} />
                        </Card.Body>
                        <Card.Footer>
                            <Card.Text>
                                <span style={{ fontWeight: 'bold',color:'green' }}>Only for {pack.price}QR</span>
                                <br></br>
                                <span style={{ color: 'red' }}>
                                    {days}
                                    {days >= 1 && days < 5 ?
                                        ' days left Hurry up' : ' days left'}
                                </span>
                                <br></br>

                                <Button size="sm" variant="outline-success" title="Add To Cart" onClick={() => onAdd(pack.id)} style={{ margin: '2px' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-cart-plus" viewBox="0 0 16 16">
                                        <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                    </svg>
                                </Button>

                                <Button type="button" size="sm" className="btn btn-primary" onClick={() => onAddWishList(pack.id)} disabled={!checkFav} title="WishList" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                    </svg>
                                </Button>

                                <Button variant="outline-success" title="Details" style={{ margin: '2px' }} as={Link} to={`/displaypackageproductdetail/${pack.id}`}>Package Details</Button>

                            </Card.Text>
                        </Card.Footer>
                    </Card>

                }
            </div>
            : null
    )

}


