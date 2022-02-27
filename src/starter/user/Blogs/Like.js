import React, { useEffect, useState } from 'react';
import db from '../../../db';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export default function Like({blogID}) {

   

//   const [jwtUser,] = useState(db.getJwtUser())

  const [LikeLeng, setLikeLeng] = useState([])
  useEffect(() => (async () => setLikeLeng(await db.Bloglikes.findByBlogid(blogID)))(), [blogID,LikeLeng])


  const likes = LikeLeng.reduce((s, e) => s = s + e.likecount, 0);

  return (
    <>
  {likes}
    



    </>
  )
}