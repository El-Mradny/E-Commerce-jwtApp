import React, { useEffect, useState } from 'react'
import db from '../../db'

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";


export default function LoctionCustomer() {

  const [shippings, setShipping] = useState([])
  useEffect(() => (async () => setShipping(await db.Shippings.findAll()))(), [])
  console.log(shippings);


//shippingmethod
  return (
    <MapContainer center={[25.286106, 51.534817]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {
        shippings.map(elem =>
          <Marker
            key={elem.id}
            position={[elem.latitude * 1, elem.longitude * 1]}
          >
            <Popup>
              {
                elem.shippingmethod ==="Express Shipping"?
                <div style={{backgroundColor:'#ff6457a8',padding:'5px',borderRadius:'5px'}}>
                <p style={{fontWeight:'bold',fontSize:'15px'}}>{elem.userid}</p>
                <p>{elem.name}</p>
                <p><span style={{fontWeight:'bold'}}>shipping method:</span> {elem.shippingmethod}</p>
                <p><span style={{fontWeight:'bold'}}>phonenumber:</span> {elem.phonenumber}</p>
                <p><span style={{fontWeight:'bold'}}>streetnum:</span> {elem.streetnum}</p>
                <p><span style={{fontWeight:'bold'}}>city:</span> {elem.city}</p>
                <p><span style={{fontWeight:'bold'}}>address:</span> {elem.address}</p>
                <p><span style={{fontWeight:'bold'}}>email:</span> {elem.email}</p>
                <p><span style={{fontWeight:'bold'}}>pobox:</span> {elem.pobox}</p>
              </div>
              :<div>
               <p style={{fontWeight:'bold',fontSize:'15px'}}>{elem.userid}</p>
              <p>{elem.name}</p>
              <p><span style={{fontWeight:'bold'}}>shipping method:</span> {elem.shippingmethod}</p>
              <p><span style={{fontWeight:'bold'}}>phonenumber:</span> {elem.phonenumber}</p>
              <p><span style={{fontWeight:'bold'}}>streetnum:</span> {elem.streetnum}</p>
              <p><span style={{fontWeight:'bold'}}>city:</span> {elem.city}</p>
              <p><span style={{fontWeight:'bold'}}>address:</span> {elem.address}</p>
              <p><span style={{fontWeight:'bold'}}>email:</span> {elem.email}</p>
              <p><span style={{fontWeight:'bold'}}>pobox:</span> {elem.pobox}</p>
            </div>}
              
              
            
            
            </Popup>
          </Marker>
        )
      }



      





    </MapContainer>


  )
}