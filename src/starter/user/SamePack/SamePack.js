import React, { useContext,useEffect, useState } from 'react';
import UserContext from '../../../UserContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import db from '../../../db';
import { Link } from "react-router-dom";
import SamePack2 from "./SamePack2";


export default function SamePack({ packageid }) {

    const [packageOne, setPackageOne] = useState(null)
    useEffect(() => (async () => packageid && setPackageOne(await db.Packages.findOne(packageid)))(), [packageid])
    //console.log(packageOne);
    const { user } = useContext(UserContext)
    // const x = packages!==null? packages.filter(elem => elem.packageid !== elem.packageid):1
    // console.log(x);

    const onAdd = async packId => {
        //console.log('prodect id', packId);
        const cartId = await db.Carts.findByUseridAndStatus(user.id, 'unpaid')
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

    function dateDiffInDays(today, date) {
        return Math.round((date - today) / (1000 * 60 * 60 * 24));
    }

    const days = packageOne && dateDiffInDays(new Date(), packageOne.enddate)

    return (

        packageOne
            && (+packageOne.startdate + new Date() || packageOne.startdate > new Date()) && packageOne.enddate > packageOne.startdate && packageOne.publish === 'Published' && days > 0
            ?
            <div>
                {
                    <Card border="success" style={{ width: '16rem', margin: '10px', fontSize: '17px' }} key={packageOne.id}>
                        <Card.Header style={{ fontWeight: 'bold' }}>{packageOne.name}</Card.Header>
                        <Card.Body>
                            <SamePack2 pack={packageOne} />
                        </Card.Body>
                        <Card.Footer>
                            <Card.Text>
                                <span style={{ fontWeight: 'bold' }}>Only for {packageOne.price}QR</span>
                                <br></br>
                                <span style={{ color: 'red' }}>
                                    {days}
                                    {days >= 1 && days < 5 ?
                                        ' days left Hurry up' : ' days left'}
                                </span>
                                <br></br>

                                <Button size="sm" variant="outline-success" onClick={() => onAdd(packageOne.id)} title="Add To Cart" style={{ margin: '2px' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-cart-plus" viewBox="0 0 16 16">
                                        <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                    </svg>
                                </Button>
                                <Button variant="outline-success" title="Details" style={{ margin: '2px' }} as={Link} to={`/displaypackageproductdetail/${packageOne.id}`}>Package Details</Button>
                            </Card.Text>
                        </Card.Footer>
                    </Card>

                }
            </div>
            : null


    )
}