import React, { useContext, useEffect, useState } from 'react';
import db from '../../../db';
import Button from 'react-bootstrap/Button';
import UserContext from '../../../UserContext';
import { Link } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


export default function CartItemTotal() {

  const { user } = useContext(UserContext)

  const [carts, setCarts] = useState([])
  useEffect(() => (async () => setCarts(await db.Carts.findByUseridAndStatus(user.id, "unpaid")))(), [user.id])
  //const x = carts[0]
  //console.log(carts && carts[0].status);

  const [cartItem, setCartItem] = useState([])
  useEffect(() => (async () => carts.length > 0 && setCartItem(await db.Cartitems.findByCartid(carts[0].id)))(), [carts])
  //console.log('cartItem', cartItem);

  const [total, setTotal] = useState(0);

  function dateDiffInDays(today, date) {
    return Math.round((date - today) / (1000 * 60 * 60 * 24));
  }

  useEffect(() => (async () => {
    let totalCart = 0;
    //console.log('total', total);
    cartItem && cartItem.map(async (item) => {
      if (item.productid !== null) {
        const productSa = await db.Sales.findByProductid(item.productid)
        if (productSa.length > 0) {
          // console.log('productSa',productSa);
          if (dateDiffInDays(new Date(), productSa[0].enddate) > 0 && productSa[0].publish === 'Published') {
            const productTable = await db.Products.findOne(item.productid)
            const x = productTable.price - (productSa[0].discountpercent / 100 * productTable.price) //150 ->50
            //console.log('x', x);
            const y = x * item.productqty
            //const saleproCount = totalCart + y
            totalCart += y
            //totalCart = saleproCount + totalCart

            // setTotal(total + saleproCount)
            setTotal(totalCart)
            //console.log('sale product', totalCart);
          } else {
            const product = await db.Products.findOne(item.productid)
            //const x31 = totalCart + (product.price * item.productqty)
            totalCart += product.price * item.productqty
            //totalCart =  x31 + totalCart

            setTotal(totalCart)
            // setTotal(total + x31)
            //console.log('product', totalCart);
          }
        }
        else {
          const product = await db.Products.findOne(item.productid)
          //const x31 = totalCart + (product.price * item.productqty)
          totalCart += product.price * item.productqty
          //totalCart =  x31 + totalCart

          setTotal(totalCart)
          // setTotal(total + x31)
          //console.log('product', totalCart);
        }
      }
      if (item.packageid !== null) {
        const packageItem = await db.Packages.findOne(item.packageid)
        //console.log(packageItem);

        if (packageItem.publish === 'Published' && dateDiffInDays(new Date(), packageItem.enddate) > 0) {
          const packCount = totalCart + (packageItem.price * item.packageqty)
          totalCart = packCount + totalCart
          setTotal(total + packCount)
          //console.log('pack', totalCart);
        }
      }
    });

    setTotal(totalCart)
    //console.log('total', totalCart);
  })(), [cartItem])



  const Referencer = () => {
    window.location = "http://localhost:3000/cartitem"
  }

  const [discountValeCoupon, setDiscountValeCoupon] = useState(0);
  const [totalWithDiscountCoupon, setTotalWithDiscountCoupon] = useState(0);


  const [discountUser, setDiscountUser] = useState("");
  const [discountUserERR, setDiscountUserERR] = useState("")


  const DiscountVild = async () => {
    const code = await db.Discounts.findByDiscountcode(discountUser)
    console.log(code);
    if (code.length > 0) {
      if (code[0].enddate > new Date() && code[0].publish === "Published") {
        const x = await db.Carts.findByUseridAndStatus(user.id, 'paid')
        const now = await db.Carts.findByUseridAndStatus(user.id, 'unpaid')
        var use = "";
        if (x.length > 0) {
          x.map(async (item) => {
            if (item.discountid === code[0].id) {
              use = "the code is used"
              console.log(item.discountid);
              console.log(use);
            }
            else {
              use = "the code is not used"
              console.log(item.discountid);
              console.log(use);
              await db.Carts.update(() => { }, { ...now[0], discountid: code[0].id })
              setDiscountUserERR("")
              window.location = "http://localhost:3000/cartitem"
              //setDiscountUser("")
            } if (use = "the code is used") {
              setDiscountUserERR("The code is used Befor")
            }
          })

        }
        console.log('now', x.length);

        if (code[0].enddate > new Date() && code[0].publish === "Published") {
          if (x.length === 0) {
            console.log("hello");
            await db.Carts.update(() => { }, { ...now[0], discountid: code[0].id })
            console.log(now);
            setDiscountUserERR("")
            setDiscountUser("")
            window.location = "http://localhost:3000/cartitem"
          }
          // if (now[0].discountid === code[0].id) {
          //   setDiscountUserERR("The code is used Befor")
          // }

        }
      }
      else {
        setDiscountUserERR("The Code Is Expired");
      }
    }
    else {
      setDiscountUserERR("The Code Is Not Valid");
    }


  }


  //discountid that is in the cart table
  useEffect(() => (async () => {
    const x = carts.length > 0 && carts[0].discountid !== null ? await db.Discounts.findOne(carts[0].discountid) : null
    //console.log(x);
    if (x !== null) {
      setDiscountValeCoupon(x.discountvalue)
    } else {
      //console.log('null')
    }

  })(), [carts])






  const [overAllTotal, setOverAllTotal] = useState(0);
  const [fiveCartUserDiscountVale, setFiveCartUserDiscountVale] = useState(0);
  const [firstTimeUserDiscountVale, setfirstTimeUserDiscountVale] = useState(0);


  const [discountCodeInforUser, setDiscountCodeInforUser] = useState("");
  // const [totalFirstTimeUserDiscountVale, settotalFirstTimeUserDiscountVale] = useState(0);

  const [cartsPaid, setCartsPaid] = useState([])
  useEffect(() => (async () => setCartsPaid(await db.Carts.findByUseridAndStatus(user.id, "paid")))(), [user.id])
  //console.log('cartsPaid',cartsPaid.length);


  useEffect(() => (async () => {
    var disTotal = 0;
    if (discountValeCoupon !== 0) {
      disTotal = discountValeCoupon
      console.log('cop', disTotal);
      setOverAllTotal(disTotal)


    } if (cartsPaid.length === 0 && carts.length === 1) {
      setfirstTimeUserDiscountVale(30)
      disTotal += 30
      console.log('30', disTotal);
      setOverAllTotal(disTotal)
    }
    if (cartsPaid.length === 5) {
      setFiveCartUserDiscountVale(50)
      disTotal += 50
      setOverAllTotal(disTotal)
    }

    setOverAllTotal(total - (disTotal) / 100 * total)
    console.log('v', disTotal);
  }


  )(), [discountValeCoupon, overAllTotal, total, carts, cartsPaid])



  //cheack if the discount code is vaild
  //discount table find the discoint id if date okay > shipping else the code is used+update the cart inorder to cexkout update the datebeace

  const vaild = async () => {
    const now = await db.Carts.findByUseridAndStatus(user.id, 'unpaid')
    console.log(now[0].discountid);
    if (now[0].discountid === null) {
      if (total > 0) {
        window.location = window.location = `http://localhost:3000/Shipping/${overAllTotal.toFixed(2)}`
        console.log('didnt use the code');
      }
    }

    if (now[0].discountid !== null) {
      const code = now.length > 0 && now[0].discountid !== null ? await db.Discounts.findOne(now[0].discountid) : null
      if (code && code.enddate > new Date() && code.publish === "Published") {
        if (total > 0) {
          window.location = window.location = `http://localhost:3000/Shipping/${overAllTotal.toFixed(2)}`
          console.log('okay go');
        }
      }
      else {
        setDiscountCodeInforUser("The Code Is Expired Update The Card For Purchaseing")
        await db.Carts.update(() => { }, { ...now[0], discountid: null })
        console.log(now[0]);
      }
    }

  }


  return (
    <>
      <br></br>
      <div className="row">
        <div className="col-sm">
          <InputGroup className="mb-3">
            <FormControl onChange={event => setDiscountUser(event.target.value)} value={discountUser}
              placeholder="Enter your discount code"
              aria-label="Enter your discount code"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button variant="warning" onClick={DiscountVild} >Apply Code</Button>
            </InputGroup.Append>
          </InputGroup>
          <span style={{ fontWeight: 'bold', color: 'red' }}>{discountUserERR}</span>
        </div>
        <div className="col-sm-2">
        </div>
        <div className="col-sm-5">
          <Button variant="warning" style={{ float: 'right', margin: '2px' }} onClick={() => Referencer()}>Update Cart</Button>
          <br></br><br></br>
          <h2 style={{ color: 'green' }}>Order summary</h2>
          <h3 style={{ fontSize: '18px' }}>Sub Total <span style={{ float: 'right' }}>{total.toFixed(2)} QR</span> </h3>

          <h3 style={{ fontSize: '18px' }}>Coupon discount
            <span style={{ float: 'right' }}>{discountValeCoupon && discountValeCoupon !== 0 ? discountValeCoupon : 0} %</span>
          </h3>
          <span style={{ fontWeight: 'bold', color: 'red' }}>{discountCodeInforUser}</span>

          <h3 style={{ fontSize: '18px' }}> First Time Shopping
          <span style={{ float: 'right' }}>
              {
                cartsPaid.length === 0 && carts.length === 1 ? firstTimeUserDiscountVale + '%' : 0 + '%'
              }
            </span>
          </h3>

          <h3 style={{ fontSize: '18px' }}>
            Regular Purchaseing
            <span style={{ float: 'right' }}>
              {
                cartsPaid.length === 5 ? fiveCartUserDiscountVale + '%' : 0 + '%'
              }
            </span>
          </h3>




          <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>
            Shipping Cost
            <span style={{ float: 'right', color: '#804d00' }}>Calculating at checkout</span>
            <p style={{ fontWeight: 'bold', fontSize: '14px' }}>Free Shipping over 1000 QR</p>
          </h3>

          <hr></hr>
          <h3 style={{ fontSize: '18px' }}>Estimated Total<span style={{ float: 'right' }}>{overAllTotal.toFixed(2)} QR</span> </h3>
          <br></br>
          {/* <Button variant="primary" style={{ float: 'right', margin: '2px' }} as={Link} to={`/Shipping/${100}`}>Check Out</Button> */}
          <Button variant="primary" style={{ float: 'right', margin: '2px' }} onClick={vaild}>Check Out</Button>
          <Button variant="primary" style={{ float: 'left', margin: '2px' }} as={Link} to={`/productpage`}>Buy More</Button>
        </div>


      </div>






    </>
  )
}



// useEffect(() => (async () => {
//   const x = carts.length > 0 && carts[0].discountid !== null ? await db.Discounts.findOne(carts[0].discountid) : null
//   console.log(x);
//   if (x !== null) {
//     setDiscountValeCoupon(x.discountvalue)
//   } else {
//     console.log('null')
//   }

// })(), [carts])