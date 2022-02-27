import React, { useEffect, useState } from 'react';
import db from '../../../db';

import WishListRow from './WishListRow'

export default function WishList() {
    const [jwtUser,] = useState(db.getJwtUser())
    const [wishLists, setWishLists] = useState([])
    useEffect(() => (async () => setWishLists(await db.Wishlists.findAll()))(), [])
    console.log('all wishLists', wishLists)

    const [products, setProducts] = useState([])
    useEffect(() => (async () => setProducts(await db.Products.findAll()))(), [])
    //console.log(products);

    const [packages, setPackage] = useState([])
    useEffect(() => (async () => setPackage(await db.Packages.findAll()))(), [])


    const [wishList, setWishList] = useState([])
    useEffect(() => (async () => setWishList(await db.Wishlists.findByUserid(jwtUser.username))), [])
    //console.log('wishList',wishList);

    const remove = async id => {
        await db.Wishlists.remove(setWishLists, id)
    }

    // //same products
    // const SameProduct = products.filter(firstArrayItem => wishLists.some(secondArrayItem => firstArrayItem.id === secondArrayItem.productid));
    // console.log(SameProduct);

    // //same packages
    // const SamePackages = packages.filter(firstArrayItem => wishLists.some(secondArrayItem => firstArrayItem.id === secondArrayItem.packageid));
    // console.log(SamePackages);

    return (
        <>
            <br></br>
            <h2><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#ff3e3e" className="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
            </svg> Wish Lists </h2>
            <br></br>


            {
                wishLists.map(
                    wish => < WishListRow wish={wish} key={wish.id} remove={remove} />
                )
            }

           


        </>
    )
}