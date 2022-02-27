import React, { useEffect, useState } from 'react';
import db from '../../../db'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import PackageproductAdminRow from './PackageproductAdminRow'
import Button from 'react-bootstrap/Button';


export default function PackageproductAdmin() {

    const [packageproducts, setPackageproducts] = useState([])
    useEffect(() => (async () => setPackageproducts(await db.Packageproducts.findAll()))(), [])

    const [id, setId] = useState(0)
    const [packageid, setPackageId] = useState(0)
    const [productid, setProductId] = useState(0)


    const [packages, setPackages] = useState([])
    useEffect(() => (async () => setPackages(await db.Packages.findAll()))(), [])


    // const [products, setProducts] = useState([])
    // useEffect(() => (async () => setProducts(await db.Products.findAll()))(), [])


    const create = async () => {
        await db.Packageproducts.create(setPackageproducts, { id, packageid, productid })
        setId(0)
        setPackageId(0)
        setProductId(0)
    }

    const edit = async id => {
        const packproduct = await db.Packageproducts.findOne(id)
        setId(packproduct.id)
        setPackageId(packproduct.packageid)
        setProductId(packproduct.productid)
    }

    const remove = async id => await db.Packageproducts.remove(setPackageproducts, id)

    const update = async () => {
        await db.Packageproducts.update(setPackageproducts, { id, packageid, productid })
        setId(0)
        setPackageId(0)
        setProductId(0)
    }

    const [package1, setPackage] = useState(null)
    useEffect(() => (async () => packageid && setPackage(await db.Packages.findOne(packageid)))(), [packageid])

    const [AllProdects, setAllProdects] = useState(0)
    useEffect(() => (async () => packageid &&  setAllProdects(await db.Packageproducts.findByPackageid(packageid)))(), [packageid])

    // const [qtyErr, setQtyErr] = useState("")
    // const [packageidErr, setPackageidErr] = useState("")
    // const [productidErr, setProductidErr] = useState("")

    const [validCreate, setValidCreate] = useState(false)
    useEffect(() => setValidCreate(
        productid > 0 &&
        packageid > 0 &&
        AllProdects.length < package1.qty
    ), [productid,packageid,AllProdects,package1])


    // const validCreate =()=>{
    //     if(AllProdects  && AllProdects.length < package1 && package1.qty){
    //         setQtyErr("")
    //     }else{
    //         setQtyErr("This package cant have more products")
    //     }if(packageid > 0){
    //         setPackageidErr("")
    //     }else{
    //         setPackageidErr("This package cant have more products")
    //     }if(productid > 0){
    //         setProductidErr("")
    //     }else{
    //         setProductidErr("This package cant have more products")
    //     }
    //     if(AllProdects.length < package1.qty && packageid > 0 && productid > 0 ){
    //         create()
    //     }
    // }

    const [validUpdate, setValidUpdate] = useState(false)
    useEffect(() => (async () => setValidUpdate(
        id > 0 &&
        productid > 0 &&
        packageid > 0 &&        
        await db.Packageproducts.findOne(id) !== undefined
    ))(), [id, packageid, productid])


    const [CategoryList, setCategoryList] = useState([])
    useEffect(() => (async () => setCategoryList(await db.Products.findDistinctCategory()))(), [])

    const [category, setcategory] = useState("");

    const [ProductList, setProductList] = useState([])
    useEffect(() => (async () => setProductList(await db.Products.findByCategory(category)))(), [category])

    const clear = async () => {
        setId(0)
        setPackageId(0)
        setProductId(0)
        setcategory("")
    }

    return (
        <div>
            <br></br>
            <h1>Packages</h1>
            <br></br>
            <Table striped bordered hover responsive variant="success" size="sm">
                <thead>
                    <tr>
                        <th>Package Name</th>
                        <th>Product Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Form.Control as="select" value={packageid} onChange={event => setPackageId(1 * event.target.value)} placeholder="packageid" >
                                <option key={0} value={0} disabled>Select Package</option>
                                {
                                    packages.map(pack =>
                                        <option key={pack.id} value={pack.id} >{pack.name} | Product Qty {pack.qty}</option>)
                                }
                            </Form.Control>
                            <span style={{ fontWeight: 'bold'}} >Package cant have more products then required</span>
                        </td>
                        <td>
                            <Form.Control as="select" value={category} onChange={event => setcategory(event.target.value)} placeholder="category" >
                                <option key={""} value={""} disabled>Select Category</option>
                                {
                                    CategoryList.map(product =>
                                        <option key={product} value={product} >{product}</option>)
                                }
                            </Form.Control>

                            <Form.Control as="select" value={productid} onChange={event => setProductId(1 * event.target.value)} placeholder="productid" >
                                <option key={0} value={0} disabled>Select Product</option>
                                {
                                    ProductList.filter(product => product.quantity > 0).map(product =>
                                        <option key={product.id} value={product.id} >{product.name}</option>)
                                }
                            </Form.Control>

                        </td>

                        <td>
                            <Button variant="success"  onClick={create} disabled={!validCreate}>Create</Button>
                            <Button variant="warning" onClick={update} disabled={!validUpdate}>Update</Button>
                            <Button variant="light" style={{ backgroundColor: "#4582ec", color: 'white' }} onClick={clear}>Clear</Button>
                        </td>

                    </tr>
                    {
                        packageproducts.map(packproduct =>
                            <PackageproductAdminRow key={packproduct.id} packproduct={packproduct} edit={edit} remove={remove} />
                        )
                    }
                </tbody>
            </Table>

           
        </div>
    )
}
