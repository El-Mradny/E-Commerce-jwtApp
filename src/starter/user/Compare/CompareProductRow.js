import React, { useEffect, useState } from 'react';
import db from '../../../db';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
function CompareProductRow({ contact, remove }) {

    const [jwtUser,] = useState(db.getJwtUser())

    const [product, setProduct] = useState(null);
    useEffect(() => (async () => contact && setProduct(await db.Products.findOne(contact.productid)))(), [contact])
    console.log(product);

    const [sales, setSales] = useState(null)
    useEffect(() => (async () => product && setSales(await db.Sales.findByProductid(product.id)))(), [product])

    function dateDiffInDays(today, date) {
        return Math.round((date - today) / (1000 * 60 * 60 * 24));
    }

    return (
        product && contact.userid === jwtUser.username ?
            <>
                {sales && sales[0] !== undefined && dateDiffInDays(new Date(), sales[0].enddate) > 0 &&
                    sales[0].startdate < new Date() && sales[0].enddate > new Date() && sales[0].publish === 'Published' ?
                    <tr key={contact.id} style={{ backgroundColor: '#eb483fdb' }}>
                        <td>{product.name}</td>

                        <td>
                            <span style={{ textDecorationLine: 'line-through' }}> {product.price} QR </span>
                            <span style={{  fontWeight: 'bold' }}>{product.price - (sales[0].discountpercent / 100 * product.price)} QR</span>
                        </td>

                        <td>{product.sunlight}</td>
                        <td>{product.water}</td>
                        <td>{product.quantity > 0 ? 'Available' : 'Out Of Stock'}</td>
                        <td>{product.temperature}</td>
                        <td>{product.measures}</td>
                        <td>{product.category}</td>
                        <td><img alt={`images for ${product.name}`} src={product.image} width="200px" height="200px" /></td>
                        <td>{product.description}</td>

                        <td>
                            <Button variant="danger" onClick={() => remove(contact.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                </svg>
                            </Button>
                            <Button variant="success" as={Link} to={`/productdetail/${product.id}/${jwtUser.username}`}>Details</Button>

                        </td>
                    </tr> :
                    <tr key={contact.id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.sunlight}</td>
                        <td>{product.water}</td>
                        <td>{product.quantity > 0 ? 'Available' : 'Out Of Stock'}</td>
                        <td>{product.temperature}</td>
                        <td>{product.measures}</td>
                        <td>{product.category}</td>
                        <td><img alt={`images for ${product.name}`} src={product.image} width="200px" height="200px" /></td>
                        <td>{product.description}</td>

                        <td>
                            <Button variant="danger" onClick={() => remove(contact.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                </svg>
                            </Button>
                            <Button variant="success" as={Link} to={`/productdetail/${product.id}/${jwtUser.username}`}>Details</Button>

                        </td>
                    </tr>}

            </>
            : null
    )

}


export default CompareProductRow;








// product && contact.userid === jwtUser.username ?
//             <tr key={contact.id}>
//                 <td>{product.name}</td>
//                 {
//                     sales && sales[0] !== undefined && dateDiffInDays(new Date(), sales[0].enddate) > 0 &&
//                         sales[0].startdate < new Date() && sales[0].enddate > new Date() && sales[0].publish === 'Published' ?
//                         <td style={{backgroundColor:'red'}}>
//                             <span style={{ textDecorationLine: 'line-through' }}> {product.price} QR </span>
//                             <span style={{ color: 'red', fontWeight: 'bold' }}>{product.price - (sales[0].discountpercent / 100 * product.price)} QR</span>
//                         </td> : <td>{product.price}</td>

//                 }
//                 <td>{product.sunlight}</td>
//                 <td>{product.water}</td>
//                 <td>{product.quantity > 0 ? 'Available' : 'Out Of Stock'}</td>
//                 <td>{product.temperature}</td>
//                 <td>{product.measures}</td>
//                 <td>{product.category}</td>
//                 <td><img alt={`images for ${product.name}`} src={product.image} width="200px" height="200px" /></td>
//                 <td>{product.description}</td>

//                 <td>
//                     <Button variant="danger" onClick={() => remove(contact.id)}>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
//                             <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
//                             <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
//                         </svg>
//                     </Button>
//                     <Button variant="success" as={Link} to={`/productdetail/${product.id}/${jwtUser.username}`}>Details</Button>

//                 </td>
//             </tr> : null









































// import React, { useEffect, useState } from 'react';
// import db from '../../../db';
// import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table';

// function CompareProductRow(comp, remove) {

//     const [product, setProduct] = useState(null);
//      useEffect(() => (async () => comp && setProduct(await db.Products.findOne(comp[0].productid)))(), [comp[0].productid])

//     return (

//         <tr key={comp.id}>
            // <td>{comp.id}</td>
            // <td>{product.name}</td>
            //         <td>{product.price}</td>
            //         <td>{product.sunlight}</td>
            //         <td>{product.water}</td>
            //         <td>{product.quantity > 0 ? 'Available' : 'Out Of Stock'}</td>
            //         <td>{product.temperature}</td>
            //         <td>{product.measures}</td>
            //         <td>{product.category}</td>
            //         <td><img alt={`images for ${product.name}`} src={product.image} /></td>
            //         <td>{product.description}</td>


            //         <td>
            //             <Button variant="danger" onClick={() => remove(product.id)}>
            //                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
            //                     <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            //                     <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
            //                 </svg>
            //             </Button>
            //         </td>
//         </tr>





//     )
// }

// export default CompareProductRow;