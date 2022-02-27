import React, { useEffect, useState } from 'react';
import db from '../../../db';
import {
    useParams
} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";

export default function StoreAdminRowDetails() {

    const history = useHistory()

    const { id: stringId } = useParams();
    const id = 1 * stringId

    const [store, setStore] = useState(null)
    useEffect(() => (async () => setStore(await db.Stores.findOne(id)))(), [id])

    const [products, setProducts] = useState(null);
    useEffect(() => (async () => store && setProducts(await db.Products.findOne(store.productid)))(), [store])

    const overAllToal = store && store.availableqty * store.productrealprice
    console.log('overAllToal', overAllToal);
    const sellingCost = products && store && store.availableqty * products.price
    console.log('sellingCost', sellingCost);


    function profit() {
        var x = overAllToal && overAllToal;
        var y = sellingCost && sellingCost;
    
        if (x > y) {
            let pr = (x - y) / 100
            return pr
        }else{
            let pr = (y - x) / 100
            return pr
        }
    }

    function singleProfit() {
        var x = products && products.price;
        var y = store && store.productrealprice;
    
        if (x > y) {
            let pr = (x - y) / 100
            return pr.toFixed(1)
        }else{
            let pr = (y - x) / 100
            return pr.toFixed(1)
        }
    }

    return (
        store &&
        <>
            <br></br>
            <div class="row">
                <div class="col-sm-5" style={{ backgroundColor: '#dfdfdfe6', padding: '10px' }}>
                    <h4>bought</h4>
                    <dl class="row">

                        <dt className="col-sm-3">Unite Price</dt>
                        <dd className="col-sm-9">{store.productrealprice}</dd>

                        <dt className="col-sm-3">qty</dt>
                        <dd className="col-sm-9">{store.availableqty}</dd>

                        <dt className="col-sm-3">total price</dt>
                        <dd className="col-sm-9">{overAllToal}</dd>
                        <br></br><br></br><br></br>

                        <dt className="col-sm-3">Payment Date</dt>
                        <dd className="col-sm-9">{store.totalpricepaid * 1 === 0 ? 'Still' : store.paymentdate.toDateString()}</dd>

                        <dt className="col-sm-3">total price paid (Spend)</dt>
                        <dd className="col-sm-9">{store.totalpricepaid * 1 === 0 ? 'Still' : store.totalpricepaid}</dd>

                        <dt className="col-sm-3">sell</dt>
                        <dd className="col-sm-9">{store.totalpricepaid * 1 === 0 ? '-' : sellingCost}</dd>

                        <dt className="col-sm-3">profit</dt>
                        <dd className="col-sm-9">{store.totalpricepaid * 1 === 0 ? '-' : profit().toFixed(1)+ '%'}</dd>

                        <br></br><br></br>
                    </dl>
                </div>
                <div class="col-sm-7" style={{ backgroundColor: '#37ba4ad1', padding: '10px' }}>
                    <div>
                        <h4>Unite One</h4>
                        <dl class="row">

                            <dt className="col-sm-3">qty</dt>
                            <dd className="col-sm-9">1</dd>

                            <dt className="col-sm-3">Unite price (Spend)</dt>
                            <dd className="col-sm-9">{store.productrealprice}</dd>

                            <dt className="col-sm-3">sell</dt>
                            <dd className="col-sm-9">{products && products.price}</dd>

                            <dt className="col-sm-3">profit</dt>
                            <dd className="col-sm-9">{singleProfit()+'%'}</dd>

                        </dl>
                    </div>
                </div>

            </div>
            <br></br>
            <Button variant="primary" onClick={() => history.goBack()}>Back</Button>


        </>
    )
}