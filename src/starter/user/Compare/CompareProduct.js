import React, { useContext,useEffect, useState } from 'react';
import db from '../../../db';
import Table from 'react-bootstrap/Table';
import CompareProductRow from './CompareProductRow';
import UserContext from '../../../UserContext'
export default function CompareProduct() {

    const [compaers, setCompaers] = useState([])
    useEffect(() => (async () => setCompaers(await db.Compaers.findAll()))(), [])
    console.log(compaers)


    const { user } = useContext(UserContext)
    // const [id, setId] = useState(0)
    // const [packageid, setPackageId] = useState(0)
    // const [productid, setProductId] = useState(0)
    // const [userid, setUserId] = useState("")

    const [compaerUser, setCompaerUser] = useState([])
    useEffect(() => (async () => setCompaerUser(await db.Compaers.findByUserid(user.id)))(), [])
    console.log(compaerUser);

    const remove = async id => {
        await db.Compaers.remove(setCompaers, id)
    }

    return (
        <>
            <br></br>
            <h2>Compare Product</h2>

            <br></br>
            {
                compaerUser.length !== 0 ?
                    <Table striped bordered hover responsive variant="success" size="sm">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Sunlight</th>
                                <th>Water</th>
                                <th>Statces</th>
                                <th>Temperature</th>
                                <th>Measures</th>
                                <th>Category</th>
                                <th>Image</th>
                                <th>Description</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                compaers.map(comp =>
                                    <CompareProductRow key={comp.id} contact={comp} remove={remove} />
                                )
                            }
                        </tbody>
                    </Table>
                    : <div>Add Some Product To Compaer</div>}
        </>
    )
}