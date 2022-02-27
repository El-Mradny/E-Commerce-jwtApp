import React, {useState, useEffect} from 'react'
import 'bootswatch/dist/united/bootstrap.min.css'
import './background.css'
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Dropdown from 'react-bootstrap/Dropdown'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"
import UserContext from './UserContext'
import db from './db';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Profile from './Profile'
//public
import SearchProductsByName from './starter/public/Search/SearchProductsByName'
import Authenticate from './starter/public/Authenticate'
import HomePublic from './starter/public/HomePublic'
//-----------------------------------------------------------

//user
import Payment from './starter/user/pay/Payment'
import BillEmail from './starter/user/pay/BillEmail'
import Cart from './starter/user/Cart/Cart'
import CartDetails from './starter/user/Cart/CartDetails'
import HomeCustomer from './starter/user/HomeCustomer'
import CartItem from './starter/user/CartItem/CartItem'
import Logout from './starter/user/Logout'
import Product from './starter/user/Product'
import ProductPage from './starter/user/ProductPage';
import ProductDetail from './starter/user/ProductDetail'
import CartItemCount from './starter/user/CartItem/CartItemCount'
import Feedback from './starter/user/Feedback/feedback'
import DisplayFeedback from './starter/user/Feedback/DisplayFeedback'
import FAQ from './starter/user/Faq/FAQ'
import DisplayFaq from './starter/user/Faq/DisplayFaq';
import ContactUs from './starter/user/Contact/ContactUs';
import ContactReply from './starter/user/Contact/ContactReply';
import PromotionSub from './starter/user/Promotion/PromotionSub';
import Unsubscribe from './starter/user/Promotion/Unsubscribe';
import ApplicationForm from './starter/user/Application/ApplicationForm';
import DisplaySales from './starter/user/Sales/DisplaySales';
import DisplayPackageinfo from './starter/user/Packages/DisplayPackageinfo';
import DisplayPackageProductDetail from './starter/user/Packages/DisplayPackageProductDetail';
import CartItemTotal from './starter/user/CartItem/CartItemTotal';
import Shipping from './starter/user/Shipping/Shipping';
import CompareProduct from './starter/user/Compare/CompareProduct';
import WishList from './starter/user/WishList/WishList';
import ProductCategory from './starter/user/Categorys/ProductCategory';
import ConformShopping from './starter/user/pay/ConformShopping';
import Rating from './starter/user/Rating/Rating';
import BlogsDisplay from './starter/user/Blogs/BlogsDisplay';
import BlogsDisplayDetails from './starter/user/Blogs/BlogsDisplayDetails';
import LoctionCustomer from '../src/starter/user/LoctionCustomer'
import BlogsReply from './starter/user/Blogs/BlogsReply';
import DisplayDiscount from './starter/user/Discount/DisplayDiscount';
//-----------------------------------------------------------

// admin
import ProductDetailAdmin from './starter/Admin/Products/ProductDetailAdmin'
import ProductsAdmin from './starter/Admin/Products/ProductsAdmin'
import Feedbackadmin from './starter/Admin/feedback/feedbackAdmin'
import FaqAdmin from './starter/Admin/Faq/FaqAdmin';
import ContactAdmin from './starter/Admin/Contact/ContactAdmin';
import PromotionEmailAdmin from './starter/Admin/Promotion/PromotionEmailAdmin';
import ApplicationAdmin from './starter/Admin/Application/ApplicationAdmin';
import ApplicationCVAdmin from './starter/Admin/Application/ApplicationCVAdmin';
import StatisticsAdmin from './starter/Admin/Statistics/StatisticsAdmin';
import SalesAdmin from './starter/Admin/Sale/SalesAdmin';
import PackagesAdmin from './starter/Admin/Packages/PackagesAdmin';
import PackageproductAdmin from './starter/Admin/Packageproduct/PackageproductAdmin';
import PaymentAdmin from './starter/Admin/payment/PaymentAdmin';
import HomePageAdmin from './starter/Admin/HomePageAdmin';
import ShippingAdmin from './starter/Admin/Shipping/ShippingAdmin';
import ShippingAdminUser from './starter/Admin/Shipping/ShippingAdminUser';
import DiscountAdmin from './starter/Admin/Discount/DiscountAdmin';
import UserAdmin from './starter/Admin/Users/UserAdmin';
import UserAdminDetails from './starter/Admin/Users/UserAdminDetails';
import CartAdmin from './starter/Admin/Cart/CartAdmin';
import CartAdminDetails from './starter/Admin/Cart/CartAdminDetails';
import RatingAdmin from './starter/Admin/Rating/RatingAdmin';
import StoreAdmin from './starter/Admin/Store/StoreAdmin';
import StoreAdminRowDetails from './starter/Admin/Store/StoreAdminRowDetails';
import BlogAdmin from './starter/Admin/Blogs/BlogAdmin';

import ShippingAdminUserRow from './starter/Admin/Shipping/ShippingAdminUserRow'
//-----------------------------------------------------------

// Supplier
import StoreSupplier from './starter/user/Store/StoreSupplier';
import StoreSupplierRowDetails from './starter/user/Store/StoreSupplierRowDetails';
import ProfileSupplier from './ProfileSupplier'

//-----------------------------------------------------------

export default function App() {
    < link rel="icon" href="directory/image.png"></link>
    const [jwtUser, setJwtUser] = useState(db.getJwtUser())
    const [user, setUser] = useState(null)

    useEffect(() => (async () => {
        db.setJwtUser(jwtUser)
        let user = null
        if (jwtUser) {
            user = await db.Users.findOne(jwtUser.username)
            if (!user) {
                await db.Users.create(users => {
                }, {
                    id: jwtUser.username, firstname: jwtUser.username.substring(0, jwtUser.username.indexOf("@")),
                    role: "Customer", picture: '/images/UsersPictureDefault.png', gender: "",
                    lastname: "", birthdate: "", createaccountdate: new Date()
                })
                user = await db.Users.findOne(jwtUser.username)
                await db.Carts.create(users => {
                }, {
                    status: "unpaid", userid: jwtUser.username, paymentid: null,
                    shippingid: null, checkoutdate: null, orderstatus: "Processing", total: 0
                })
            }
        }
        setUser(user)
    })(), [jwtUser])

    const isPublic = () => user === null
    const isLoggedIn = () => user !== null
    const isAdmin = () => user?.role === "Admin"
    const isCustomer = () => user?.role === "Customer"
    const isSupplier = () => user?.role === "Supplier"

    console.log(user, isPublic(), isLoggedIn(), isCustomer(), isAdmin(), isSupplier())

    return (
        <UserContext.Provider value={{user}}>
            <Router>
                <div style={{width: "70%", margin: "auto "}}>
                    <Navbar variant="dark" expand="sm" bg="success"
                            className="navbar navbar-expand-lg navbar-success bg-success">
                        <Navbar.Brand as={Link} to="/" style={{width: '140px', marginRight: "10px"}}>
                            <img
                                // src="./logo.png"
                                src="https://i.pinimg.com/originals/c9/a3/de/c9a3de116f8d327c7d41d37071f8a63f.png"
                                alt="logo"
                                width='100%'
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                {
                                    isPublic() &&
                                    <NavDropdown title="Search" id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/searchproductsbyname">Search Products by
                                            Name</NavDropdown.Item>
                                    </NavDropdown>
                                }
                                {
                                    isCustomer() &&
                                    <>


                                        <Nav.Link as={Link} to="/productpage">Products</Nav.Link>
                                        <Nav.Link as={Link} to="/displaysales">Sales</Nav.Link>
                                        <Nav.Link as={Link} to="/displaypackageinfo">Packages</Nav.Link>
                                        <Nav.Link as={Link} to="/blogsdisplay">Blogs</Nav.Link>
                                        <Nav.Link as={Link} to="/cart">Cart History</Nav.Link>
                                        <Nav.Link as={Link} to="/compareproduct">Compare Product</Nav.Link>
                                        <Nav.Link as={Link} to="/applicationform">Career</Nav.Link>

                                        <NavDropdown title="Customer Service" id="basic-nav-dropdown">
                                            <Dropdown.Item as={Link} to="/feedback">Feedback</Dropdown.Item>
                                            <Dropdown.Item as={Link} to="/displayfaq">FAQ</Dropdown.Item>
                                            <Dropdown.Item as={Link} to="/contactus">ContactUs</Dropdown.Item>
                                        </NavDropdown>

                                    </>
                                }
                                {
                                    isSupplier() &&
                                    <>
                                        <Nav.Link as={Link} to="/storesupplier">Store</Nav.Link>

                                    </>
                                }
                                {
                                    isAdmin() &&

                                    <>
                                        <NavDropdown title="Communication" id="basic-nav-dropdown">
                                            <NavDropdown.Item as={Link} to="/feedbackadmin">Customers
                                                Feedbacks</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/faqadmin">Customers
                                                Questions</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/contactadmin">Customers
                                                Problems</NavDropdown.Item>
                                        </NavDropdown>

                                        <NavDropdown title="Products" id="basic-nav-dropdown">
                                            <NavDropdown.Item as={Link} to="/productsadmin">Products</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/salesadmin">Sales</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/packagesadmin">Packages</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/packageproductadmin">Package
                                                Product</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/discountadmin">Discount</NavDropdown.Item>

                                        </NavDropdown>

                                        <NavDropdown title="Promotion" id="basic-nav-dropdown">
                                            <NavDropdown.Item as={Link} to="/promotionemailadmin">Promotion
                                                Email</NavDropdown.Item>
                                        </NavDropdown>


                                        <Nav.Link as={Link} to="/applicationadmin">Applications</Nav.Link>
                                        <Nav.Link as={Link} to="/cartadmin">Carts</Nav.Link>
                                        <Nav.Link as={Link} to="/ratingadmin">Product Rating</Nav.Link>

                                        <Nav.Link as={Link} to="/statisticsadmin">Statistics</Nav.Link>
                                        <Nav.Link as={Link} to="/useradmin">User</Nav.Link>
                                        <Nav.Link as={Link} to="/paymentadmin">Payments</Nav.Link>
                                        <Nav.Link as={Link} to="/shippingadmin">Shipping</Nav.Link>
                                        <Nav.Link as={Link} to="/blogadmin">Blogs</Nav.Link>
                                        <Nav.Link as={Link} to="/storeadmin">Store</Nav.Link>

                                    </>

                                }
                            </Nav>
                            <Nav style={{textAlign: 'right'}}>
                                {
                                    isPublic()
                                    &&
                                    <>
                                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                    </>
                                }
                                {
                                    isLoggedIn()
                                    &&
                                    <>

                                        {
                                            user.role === "Supplier" ?

                                                <Nav.Link as={Link} to="/profilesupplier">
                                                    <img alt="" src={`${user.picture}?${new Date().getTime()}`}
                                                         height="45" width="45" style={{borderRadius: '50%'}}/>
                                                </Nav.Link>

                                                : <Nav.Link as={Link} to="/profile">
                                                    <img alt="" src={`${user.picture}?${new Date().getTime()}`} height="45"
                                                         width="45" style={{borderRadius: '50%'}}/>
                                                </Nav.Link>
                                        }

                                        {
                                            user.role === "Customer" ?

                                                <Nav.Link as={Link} to="/cartitem">
                                                    <CartItemCount/>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41"
                                                         fill="white" className="bi bi-bag-fill" viewBox="0 0 16 16">
                                                        <path
                                                            d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
                                                    </svg>
                                                </Nav.Link>

                                                : null
                                        }{

                                        user.role === "Customer" ?

                                            <Nav.Link as={Link} to="/wishlist" style={{marginTop: '7px'}}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35"
                                                     fill="white" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd"
                                                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                                </svg>


                                            </Nav.Link>

                                            : null
                                    }


                                        <Nav.Link as={Link} style={{marginTop: '9px'}} to="/logout">Logout</Nav.Link>


                                    </>
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>

                    {
                        isPublic()
                        &&
                        <Switch>
                            <Route path="/register">
                                <Authenticate type="Register" set={setJwtUser}/>
                            </Route>
                            <Route path="/login">
                                <Authenticate type="Login" set={setJwtUser}/>
                            </Route>
                            <Route path="/productdetail/:id">
                                <ProductDetail/>
                            </Route>
                            <Route path="/searchproductsbyname">
                                <SearchProductsByName/>
                            </Route>
                            <Route path="/">
                                <HomePublic/>
                            </Route>
                        </Switch>
                    }
                    {
                        isLoggedIn()
                        &&
                        <Switch>
                            <Route path="/logout">
                                <Logout set={setJwtUser}/>
                            </Route>
                        </Switch>
                    }
                    {
                        isCustomer()
                        &&
                        <Switch>
                            <Route path="/profile">
                                <Profile set={setUser}/>
                            </Route>


                            <Route path="/conformshopping/:total/:totalshipping/:shippingId">
                                <ConformShopping/>
                            </Route>

                            <Route path="/payment/:totalCost/:totalShipping/:ShippingId">
                                <Payment/>
                            </Route>

                            <Route path="/productdetail/:id/:userId">
                                <ProductDetail/>
                            </Route>

                            <Route path="/displaypackageproductdetail/:id">
                                <DisplayPackageProductDetail/>
                            </Route>

                            <Route path="/productpage/:catg">
                                <ProductPage/>
                            </Route>
                            <Route path="/shipping/:total">
                                <Shipping/>
                            </Route>

                            <Route path="/productcategory/:category">
                                <ProductCategory/>
                            </Route>

                            <Route path="/cartdetails/:cartId">
                                <CartDetails/>
                            </Route>

                            <Route path="/billemail/:oldCart">
                                <BillEmail/>
                            </Route>

                            <Route path="/blogsdisplaydetails/:blogId">
                                <BlogsDisplayDetails/>
                            </Route>


                            <Route path="/blogsreply">
                                <BlogsReply/>
                            </Route>

                            {/* <Route path="/blogsreply/:id">
                                <BlogsReply />
                            </Route> */}


                            <Route path="/wishlist">
                                <WishList/>
                            </Route>
                            <Route path="/blogsdisplay">
                                <BlogsDisplay/>
                            </Route>


                            <Route path="/rating">
                                <Rating/>
                            </Route>

                            <Route path="/displaysales">
                                <DisplaySales/>
                            </Route>

                            <Route path="/faq">
                                <FAQ/>
                            </Route>
                            <Route path="/Shipping">
                                <Shipping/>
                            </Route>
                            <Route path="/cart">
                                <Cart/>
                            </Route>

                            <Route path="/cartitem">
                                <CartItem/>
                            </Route>

                            <Route path="/cartitemtotal">
                                <CartItemTotal/>
                            </Route>

                            <Route path="/contactus">
                                <ContactUs/>
                            </Route>

                            <Route path="/displayfaq">
                                <DisplayFaq/>
                            </Route>

                            <Route path="/displayfeedback">
                                <DisplayFeedback/>
                            </Route>

                            <Route path="/feedback">
                                <Feedback/>
                            </Route>

                            <Route path="/product">
                                <Product/>
                            </Route>

                            <Route path="/displaypackageinfo">
                                <DisplayPackageinfo/>
                            </Route>

                            <Route path="/productpage">
                                <ProductPage/>
                            </Route>

                            <Route path="/unsubscribe">
                                <Unsubscribe/>
                            </Route>

                            <Route path="/applicationform">
                                <ApplicationForm/>
                            </Route>

                            <Route path="/compareproduct">
                                <CompareProduct/>
                            </Route>

                            <Route path="/contactreply">
                                <ContactReply/>
                            </Route>

                            <Route path="/">
                                <HomeCustomer/>
                            </Route>
                        </Switch>
                    }
                    {
                        isAdmin()
                        &&
                        <Switch>
                            <Route path="/profile">
                                <Profile set={setUser}/>
                            </Route>


                            <Route path="/productdetailadmin/:id">
                                <ProductDetailAdmin/>
                            </Route>

                            <Route path="/shippingadminuser/:Userid">
                                <ShippingAdminUser/>
                            </Route>
                            <Route path="/applicationcvadmin/:id">
                                <ApplicationCVAdmin/>
                            </Route>
                            <Route path="/displaypackageproductdetail/:id">
                                <DisplayPackageProductDetail/>
                            </Route>

                            <Route path="/cartdetails/:cartId">
                                <CartDetails/>
                            </Route>
                            <Route path="/useradmindetails/:id">
                                <UserAdminDetails/>
                            </Route>
                            <Route path="/cartadmindetails/:cartId">
                                <CartAdminDetails/>
                            </Route>

                            <Route path="/storeadminrowdetails/:id">
                                <StoreAdminRowDetails/>
                            </Route>


                            <Route path="/displaydiscount">
                                <DisplayDiscount/>
                            </Route>

                            <Route path="/storeadmin">
                                <StoreAdmin/>
                            </Route>

                            <Route path="/cartadmin">
                                <CartAdmin/>
                            </Route>
                            <Route path="/ShippingAdminUserRow/:id">
                                <ShippingAdminUserRow/>
                            </Route>


                            <Route path="/loctioncustomer">
                                <LoctionCustomer/>
                            </Route>


                            <Route path="/ratingadmin">
                                <RatingAdmin/>
                            </Route>


                            <Route path="/useradmin">
                                <UserAdmin/>
                            </Route>

                            <Route path="/discountadmin">
                                <DiscountAdmin/>
                            </Route>

                            <Route path="/feedbackadmin">
                                <Feedbackadmin/>
                            </Route>

                            <Route path="/displaysales">
                                <DisplaySales/>
                            </Route>

                            <Route path="/paymentadmin">
                                <PaymentAdmin/>
                            </Route>


                            <Route path="/salesadmin">
                                <SalesAdmin/>
                            </Route>

                            <Route path="/applicationform">
                                <ApplicationForm/>
                            </Route>

                            <Route path="/productsadmin">
                                <ProductsAdmin/>
                            </Route>
                            <Route path="/feedback">
                                <Feedback/>
                            </Route>

                            <Route path="/contactadmin">
                                <ContactAdmin/>
                            </Route>

                            <Route path="/contactus">
                                <ContactUs/>
                            </Route>

                            <Route path="/displayfaq">
                                <DisplayFaq/>
                            </Route>

                            <Route path="/faq">
                                <FAQ/>
                            </Route>

                            <Route path="/blogadmin">
                                <BlogAdmin/>
                            </Route>
                            <Route path="/packageproductadmin">
                                <PackageproductAdmin/>
                            </Route>

                            <Route path="/displaypackageinfo">
                                <DisplayPackageinfo/>
                            </Route>


                            <Route path="/packagesadmin">
                                <PackagesAdmin/>
                            </Route>

                            <Route path="/statisticsadmin">
                                <StatisticsAdmin/>
                            </Route>

                            <Route path="/applicationadmin">
                                <ApplicationAdmin/>
                            </Route>

                            <Route path="/promotionemailadmin">
                                <PromotionEmailAdmin/>
                            </Route>

                            <Route path="/faqadmin">
                                <FaqAdmin/>
                            </Route>

                            <Route path="/shippingadmin">
                                <ShippingAdmin/>
                            </Route>

                            <Route path="/contactreply">
                                <ContactReply/>
                            </Route>

                            <Route path="/displayfeedback">
                                <DisplayFeedback/>
                            </Route>
                            <Route path="/">
                                <HomePageAdmin/>
                            </Route>

                        </Switch>
                    }{
                    isSupplier()
                    &&
                    <Switch>
                        <Route path="/profilesupplier">
                            <ProfileSupplier set={setUser}/>
                        </Route>

                        <Route path="/storesupplierrowdetails/:id">
                            <StoreSupplierRowDetails/>
                        </Route>

                        <Route path="/storesupplier">
                            <StoreSupplier/>
                        </Route>


                        <Route path="/">
                            <StoreSupplier/>
                        </Route>

                    </Switch>
                }
                </div>
                <div style={{clear: 'left'}}></div>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <footer style={{backgroundColor: '#dfdfdf', width: '70%', margin: 'auto'}}>
                    <br></br>
                    <CardGroup style={{backgroundColor: '#dfdfdf'}}>
                        <Card style={{textAlign: 'center', backgroundColor: '#dfdfdf', borderColor: '#dfdfdf'}}>
                            <Card.Title>Business Time</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">________________________</Card.Subtitle>
                            <Card.Body>
                                <Card.Text>
                                    Monday - Friday: 08.00am to 05.00pm
                                </Card.Text>
                                <Card.Text>
                                    Saturday: 10.00am to 08.00pm
                                </Card.Text>
                                <Card.Text>
                                    Sunday: Closed
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        < PromotionSub/>


                        <Card style={{textAlign: 'center', backgroundColor: '#dfdfdf', borderColor: '#dfdfdf'}}>

                            <Card.Title>Social Media</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">________________________</Card.Subtitle>
                            <Card.Body>

                                <Card.Text>
                                    <Card.Link className="btn btn-success" href="https://twitter.com/">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                                             fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                                            <path
                                                d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                                        </svg>
                                    </Card.Link>
                                    <Card.Link className="btn btn-success" href="https://www.facebook.com/">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                                             fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                            <path
                                                d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                        </svg>
                                    </Card.Link>
                                    <Card.Link className="btn btn-success" href="https://www.instagram.com/">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                                             fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                            <path
                                                d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                                        </svg>
                                    </Card.Link>
                                    <br></br><br></br><br></br><br></br>
                                    <Card.Title>Payment</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">________________________</Card.Subtitle>
                                    <img

                                        src="https://raw.githubusercontent.com/riosdcs/react-cc-validation/6e8add0f00f9166dd13ccf09d62236671dfa106e/src/assets/icons8-amex.svg"
                                        alt="AX"
                                    />
                                    <img

                                        src="https://betandslots.com/wp-content/uploads/2020/02/union-pay-logo-300x300.png"
                                        alt="China Union Pay"
                                        width="50px"
                                        style={{borderRadius: '5px'}}
                                    />
                                    <img

                                        src="https://raw.githubusercontent.com/riosdcs/react-cc-validation/6e8add0f00f9166dd13ccf09d62236671dfa106e/src/assets/icons8-discover.svg"
                                        alt="discover"

                                    />
                                    <img

                                        src="data:image/png;base64,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"
                                        alt="jcb"
                                        width="60px"
                                        style={{borderRadius: '5px'}}

                                    />
                                    <img

                                        src="https://raw.githubusercontent.com/riosdcs/react-cc-validation/6e8add0f00f9166dd13ccf09d62236671dfa106e/src/assets/icons8-mastercard.svg"
                                        alt="master"

                                    />


                                </Card.Text>
                                <br></br>

                            </Card.Body>
                        </Card>
                    </CardGroup>
                    <br></br>
                    <div className="row">
                        <div className="col-sm"></div>
                        <div className="col-sm">
                            <p style={{textAlign: 'center'}}>
                                <Button variant="link" as={Link} to="//contactus">Contact Us</Button>
                                <Button variant="link" as={Link} to="/displayfaq">FAQ</Button>
                                <Button variant="link" as={Link} to="/">Terms and Conditions</Button>
                                <Button variant="link" as={Link} to="/">Privacy Policy</Button>
                                <Button variant="link" as={Link} to="/applicationform">applicationform</Button>
                                <Button variant="link" as={Link} to="/displayfeedback">feedback</Button>
                            </p>
                            <p style={{textAlign: 'center'}}> &copy; 2021 - Green World<br></br>
                                Design and Developed by: Ahmed Elmerdany
                            </p>
                        </div>

                        <div className="col-sm">
                            <div className="box bounce-1" style={{textAlign: 'center'}}>
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="green"
                                         className="bi bi-arrow-up-circle" viewBox="0 0 16 16">
                                        <path fillRule="evenodd"
                                              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </Router>
        </UserContext.Provider>
    )
}