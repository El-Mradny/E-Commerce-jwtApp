import React, { useEffect, useState } from 'react';
import db from '../../../db';
import DisplaySalesRow from './DisplaySalesRow';
import Image from 'react-bootstrap/Image';

export default function DisplaySales() {

    const [sales, setSales] = useState([])
    useEffect(() => (async () => setSales(await db.Sales.findAll()))(), [])
   
    

    return (
        
        <div>
            <Image src="./salebanner.jpg" fluid />
            <br></br><br></br>
            {
                sales.map(sale =>
                    < DisplaySalesRow sale={sale} key={sale.id} />
                )
            }
        </div>
    )
}
