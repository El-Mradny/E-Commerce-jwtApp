import React, { useEffect,useState } from 'react';
import db from '../../../db'
import DisplayPackageinfoRow1 from './DisplayPackageinfoRow1'


export default function DisplayPackageinfo() {

    const [packages, setPackage] = useState([])
    useEffect(() => (async () => setPackage(await db.Packages.findAll()))(), [])


    return (
        packages &&
        <div>
            <br></br><br></br>
            {
                packages.map(pack =>
                    < DisplayPackageinfoRow1 pack={pack} key={pack.id}/>
                )
            }
        </div>
    )
}
