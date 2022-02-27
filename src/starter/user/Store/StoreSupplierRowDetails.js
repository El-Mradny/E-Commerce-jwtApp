import React, { useEffect, useState } from 'react';
import db from '../../../db';
import {
    useParams
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export default function StoreSupplierRowDetails() {
    const history = useHistory()
    const { id: stringId } = useParams();
    const id = 1 * stringId

    const [store, setStore] = useState(null)
    useEffect(() => (async () => setStore(await db.Stores.findOne(id)))(), [id])

    const overAllToal = store && store.availableqty * store.productrealprice

    const profit = store && store.productrealprice + (30 / 100 * store.productrealprice)
    return (
        store &&
        <>
            <br></br>
            {/* 30% up so the profit*/}

            <dl className="row">

                <dt className="col-sm-3">Unite Price</dt>
                <dd className="col-sm-9">{store.productrealprice}</dd>

                <dt className="col-sm-3">qty</dt>
                <dd className="col-sm-9">{store.availableqty}</dd>

                <dt className="col-sm-3">total price</dt>
                <dd className="col-sm-9">{overAllToal}</dd>
                <br></br><br></br><br></br>

                <dt className="col-sm-3">total price paid</dt>
                <dd className="col-sm-9">{store.totalpricepaid*1 ===0?'Still':store.totalpricepaid}</dd>

                <dt className="col-sm-3">Payment Date</dt>
                <dd className="col-sm-9">{store.totalpricepaid*1 ===0?'Still':store.paymentdate.toDateString()}</dd>

                <dt className="col-sm-3">profit</dt>
                <dd className="col-sm-9">{store.totalpricepaid*1 ===0? '-':profit.toFixed(1)}</dd>
                <br></br><br></br>
                <Button variant="primary" onClick={() => history.goBack()}>Back</Button>
            </dl>
            
        </>
    )
}