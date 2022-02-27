import React, { useEffect, useState } from 'react';
import DisplayPackageinfoRow3 from './DisplayPackageinfoRow3'
import db from '../../../db'

export default function DisplayPackageProduct({ pack }) {
   
    const [packageproducts, setPackageproducts] = useState([])
    useEffect(() => (async () => pack && setPackageproducts( await db.Packageproducts.findByPackageid(pack.id)))(), [pack])

    return (
        pack && packageproducts &&
        <div>
            {
                packageproducts.map(pack =>
                    <DisplayPackageinfoRow3 key={pack.productid} pack={pack.productid}  />
                )
            }
        </div>
    )
}

