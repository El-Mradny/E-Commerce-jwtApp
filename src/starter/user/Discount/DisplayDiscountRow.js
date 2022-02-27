import React from 'react';
import Card from 'react-bootstrap/Card';

export default function DisplayDiscountRow({ code }) {

  function dateDiffInDays(today, date) {
    return Math.round((date - today) / (1000 * 60 * 60 * 24));
  }

  const days = code && dateDiffInDays(new Date(), code.enddate)

  return (
    code && +code.startdate < +new Date()
      && code.enddate > new Date() && code.publish === 'Published' && days > 0 ?
      <Card className="text-center" style={{ margin: '10px'}}>
        <Card.Body style={{ background: '#E8E8E8'}}>
          <Card.Title style={{ fontSize: '50px' }}>{code.discountcode}</Card.Title>
          <Card.Text style={{ fontSize: '20px' }}>
            {code.description}
            <br></br>
            <span style={{ color: 'green' }}>{code.discountvalue}% OFF</span>
          <br></br>
          <span style={{ color: 'red' }}>{days} days left</span>
          </Card.Text>
        </Card.Body>

      </Card>
      : null
      
  )
}