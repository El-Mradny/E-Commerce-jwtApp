import React, { useEffect, useState } from 'react';
import DisplayPackageProductsDetailRow from './DisplayPackageProductsDetailRow'
import db from '../../../db'
import {
    useParams
} from "react-router-dom";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import {useHistory} from "react-router-dom";
export default function DisplayPackageProductDetail() {
    
    const { id: stringId } = useParams();
    const id = 1 * stringId
    const history = useHistory();

    const [packageproducts, setPackageproducts] = useState(null)
    useEffect(() => (async () => id && setPackageproducts(await db.Packageproducts.findByPackageid(id)))(), [id])

    return (
        packageproducts &&
        <div>
            {
                packageproducts.map(productIdPack =>
                    <DisplayPackageProductsDetailRow key={productIdPack.productid} productIdPack={productIdPack.productid} />
                )}
            <div style={{ clear: 'left' }}></div>
            <br></br>
            <Button variant="primary" size='lg' onClick={() => history.goBack()}>Back</Button> 
            <br></br>
            
        </div>

    )
}

