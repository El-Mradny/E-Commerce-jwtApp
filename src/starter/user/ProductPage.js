import React, { useContext, useEffect, useState } from 'react'
import db from '../../db'
import ProductShort from './ProductShort'
import UserContext from '../../UserContext'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
  
export default function ProductPage() {

    //console.log(catg);

    const [sort, setSort] = useState("")
    const [category, setCategory] = useState("")
    const [name, setName] = useState("")


    const [products, setProducts] = useState([])
    useEffect(() => (async () => setProducts(

        sort === "sortByLowest" && category !==""? await db.Products.findByCategoryAndPriceLowest(category):
        sort === "sortByHighest" && category !==""? await db.Products.findByCategoryAndPriceHighest(category):

        sort === "sortByNew" && category !==""? await db.Products.findByCategoryAndSortByNewest(category):
        sort === "sortByOld" && category !==""? await db.Products.findByCategoryAndSortByOldest(category):
        sort === "bestSelling" && category !==""? await db.Products.findByCategoryOrderBySoldcountDesc(category):


        sort === "sortByLowest" ? await db.Products.SortByLowestPrice():
        sort === "sortByHighest"?await db.Products.SortByHighestPrice():
        sort === "sortByNew" ? await db.Products.SortByNewest() :
        sort === "sortByOld" ? await db.Products.SortByOldest() :
        sort === "bestSelling" ? await db.Products.SortByHighestSelling():
        category ==="Indoor"? await db.Products.findByCategory("Indoor"):
        category ==="Outdoor" ? await db.Products.findByCategory("Outdoor"):
        category ==="Plant accessories" ? await db.Products.findByCategory("Plant accessories"):


        name!==""?await db.Products.findByNameContainingIgnoreCase(name):
        await db.Products.findAll()
    ))(), [sort,category,name])

    const clear = async () => {
        setSort("")
        setCategory("")
        setName("")
    }

    //-------------------------------------------------------------------------------------------------------
    const [carts, setCarts] = useState([])
    useEffect(() => (async () => setCarts(await db.Carts.findAll()))(), [])
    //console.log('all carts', carts);

    const { user } = useContext(UserContext)

    const [cart, setCart] = useState([])
    useEffect(() => (async () => setCart(await db.Carts.findByUseridAndStatus(user.id, 'unpaid')))(), [user.id])
    //console.log('person cart ', cart);

    return (
        <>
            <br></br>
            <h1 style={{ textAlign: 'center' }}>All Plants</h1>
            <p style={{ textAlign: 'center' }}>With so many plants online to choose from and grow with, it’s hard to pick just one for plant delivery! From bamboo to herb gardens to large indoor plants -- each one is ready to fit in with your (or a friend’s) personality, space or occasion.</p>
            <br></br>
            <hr></hr>

            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <Form.Label style={{ margin: '4px' }}>Sort By Popularity: </Form.Label>
                        <Form.Control as="select" size="sm" onChange={event => setSort(event.target.value)} placeholder="sort" value={sort} style={{ width: '15rem' }}>
                            <option key={""} value={""} disabled>-Select-</option>
                            <option key="sortByLowest" value="sortByLowest">Price: Low to High</option>
                            <option key="sortByHighest" value="sortByHighest">Price: High to Low</option>
                            <option key="sortByNew" value="sortByNew">Product: Newest to Oldest </option>
                            <option key="sortByOld" value="sortByOld">Product: Oldest to Newest</option>
                            <option key="bestSelling" value="bestSelling">Product: Best Selling</option>
                        </Form.Control>
                    </div>
                    <div className="col-sm">
                        <Form.Label style={{ margin: '4px' }}>Sort By Category:</Form.Label>
                        <Form.Control as="select" size="sm" onChange={event => setCategory(event.target.value)} placeholder="sort" value={category} style={{ width: '15rem' }}>
                            <option key={""} value={""} disabled>-Select-</option>
                            <option key="Indoor" value="Indoor">Indoor</option>
                            <option key="Outdoor" value="Outdoor">Outdoor</option>
                            <option key="Plant accessories" value="Plant accessories">Plant Accessories</option>
                        </Form.Control>
                    </div>
                    <div className="col-sm">
                        <Form.Label style={{ margin: '4px' }}>Search Products by Name:</Form.Label>
                        <Form.Control size="sm" type="text" onChange={event => setName(event.target.value)} placeholder="Name" value={name} style={{ width: '15rem' }} />
                    </div>
                    <div className="col-sm">
                        <Button variant="success" onClick={clear} style={{ marginTop: '25px' }}>Clear</Button>
                    </div>
                    <div className="col-sm-2">
                            <p style={{ marginTop: '25px' }}>{`Showing all ${products.length} results`}</p>
                        </div>
                   
                </div>
                

            </div>

            <hr></hr>
            <br></br>
            {
                products.map(product => <ProductShort key={product.id} product={product} cart={cart} />)
            }
        </>
    )
}