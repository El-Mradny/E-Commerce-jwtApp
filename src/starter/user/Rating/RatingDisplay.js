import React, { useEffect, useState } from 'react'
import db from '../../../db';

export default function RatingDisplay({ rating }) {
    // private String userid;
    // private Timestamp ratingdate;


    // private String reviwecomment;
    // private Long stars;
    // private String image;

    const [user, setUser] = useState(null);
    useEffect(() => (async () => rating && setUser(await db.Users.findOne(rating.userid)))(), [rating])

    return (
        user &&
        <>
            <br></br>
            <div class="row" key={rating.id}>
                <div class="col-sm-3">
                    <div class="col"><img alt={`images for ${user.picture}`} src={user.picture} height={100} width={100} style={{borderRadius:'60px'}}/></div>
                    <br></br>
                    <div class="col">{rating.userid.substring(0, rating.userid.indexOf("@"))+'*********'}</div>
                    <div class="col">{rating.ratingdate.toDateString()}</div>
                </div>
                <div class="col-sm-3">
                    <div class="col">
                        {(() => {
                            let row = []
                            for (var i = 0; i < rating.stars; i++) {
                                row.push(<svg key={i} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#fbd46a" className="bi bi-star-fill" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>)
                            }
                            return row
                        })()
                        }

                        {(() => {
                            let row = []
                            for (var i = rating.stars; i < 5; i++) {
                                row.push(<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#e5e5e5" className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg> )
                            }
                            return row
                        })()
                        }


                    </div>
                    
                    <div class="col" style={{marginTop:'10px',marginBottom:'10px'}}>{rating.reviwecomment}</div>
                    <div class="col-sm-8"><img alt={`images for ${rating.image}`} src={rating.image} height='100%' width='100%' />
                    </div>
                </div>

            </div>
            <hr></hr>
        </>
    )
}