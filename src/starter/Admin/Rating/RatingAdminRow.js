import React, { useEffect, useState } from 'react';
import db from '../../../db';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import validator from 'validator';

export default function RatingAdminRow({ rating, remove, edit }) {

    const [product, setProduct] = useState(null);
    useEffect(() => (async () => rating && setProduct(rating.productid !== null ? await db.Products.findOne(rating.productid) : null))(), [rating])
  
    return (
        product &&
        <>
            <tr key={rating.id}>
                <td>{rating.userid}</td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                
             
                <td>
                {rating.stars}<br></br>
                    
                    {(() => {
                    let row = []
                    for (var i = 0; i < rating.stars; i++) {
                        row.push(<svg key={i} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#fbd46a" className="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>)
                    }
                    return row
                })()
                }

                    {(() => {
                        let row = []
                        for (var i = rating.stars; i < 5; i++) {
                            row.push(<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#e5e5e5" className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>)
                        }
                        return row
                    })()
                    }</td>

                <td><img alt={`images for ${rating.image}`} src={rating.image} height='150' width='150' /></td>


                <td>{rating.ratingdate.toDateString()}</td>
                <td>{rating.reviwecomment}</td>


                <td>
                <Button variant="secondary" onClick={() => edit(rating.id)}  href="#element_target">Edit</Button>
                <Button variant="danger" onClick={() => remove(rating.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                </Button>
            </td>
            </tr>
        </>
    )
}