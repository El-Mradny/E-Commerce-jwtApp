import React, { useContext, useEffect, useState } from 'react'
import db from '../../../db';

import UserContext from '../../../UserContext'

export default function ImageDisplay({ elem }) {
    const { user } = useContext(UserContext)

    const [users, setUsers] = useState(null);
    useEffect(() => (async () => elem && setUsers(await db.Users.findOne(elem.userid)))(), [elem])

    return (
        users &&
        <>
            <div class="col"><img alt={`images for ${users.picture}`} src={users.picture} height={50} width={50} style={{ borderRadius: '60px' }} /></div>

        </>
    )
}