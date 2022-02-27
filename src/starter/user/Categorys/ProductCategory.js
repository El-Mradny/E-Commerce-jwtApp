import React, {useEffect, useState } from 'react'
import db from '../../../db'
import ProductRowCategory from './ProductRowCategory'
import {
  useParams
} from "react-router-dom";
import {useHistory} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export default function ProductCategory() {

  const { category: stringId } = useParams();
  const category = stringId
  const history = useHistory();
  const [products, setProducts] = useState([])
  useEffect(() => (async () => setProducts(await db.Products.findAll()))(), [])
 

  const [productsCategory, setProductsCategory] = useState([])
  useEffect(() => (async () => category && setProductsCategory(await db.Products.findByCategory(category)))(), [category])
  console.log(productsCategory);

  return (
    <>
      {
        products.filter(elem=>elem.category===category).map(product => <ProductRowCategory key={product.id} product={product} />)
      }
      <div style={{clear:'left'}}></div>
      <Button variant="primary" onClick={() => history.goBack()}>Back</Button> 
      <Button as={Link} to={`/productpage`} style={{margin:'5px'}}>View More Products</Button>
    </>
  )
}