import React, { useEffect, useState } from 'react';
import db from '../../../db';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export default function DisLike({blogID}) {



//   const [jwtUser,] = useState(db.getJwtUser())

  const [DisLikeLeng, setDisLikeLeng] = useState([])
  useEffect(() => (async () => setDisLikeLeng(await db.Bloglikes.findByBlogid(blogID)))(), [blogID,DisLikeLeng])


  const dislikes = DisLikeLeng.reduce((s, e) => s = s + e.dislikecount, 0);

  return (
    <>
  {dislikes}
    



    </>
  )
}