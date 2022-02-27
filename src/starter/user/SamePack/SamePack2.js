import React, { useEffect, useState } from 'react'
import db from '../../../db';
import SamePack3 from "./SamePack3";


export default function SamePack2({ pack }) {

    const [packageproducts, setPackageproducts] = useState([])
    useEffect(() => (async () => pack && setPackageproducts(await db.Packageproducts.findByPackageid(pack.id)))(), [pack])
    //console.log(packageproducts);

   
    return (
        pack && packageproducts &&
        <div>
            {
                packageproducts.map(pack =>
                    <SamePack3 key={pack.productid} pack={pack.productid} />
                )
            }
        </div>



    )
}