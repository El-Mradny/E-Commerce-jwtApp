import React, { useEffect, useState, PureComponent } from 'react'
import db from '../../../db';
import {
    BarChart, Bar, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Line, Legend, LineChart, PieChart, Pie
} from 'recharts';



function StatisticsAdmin() {

    const [usersCustomer, setUsersCustomer] = useState([])
    useEffect(() => (async () => setUsersCustomer(await db.Users.findByRole('Customer')))(), [])
    const numberOfCustomer = usersCustomer.length;

    const [usersAdmin, setUsersAdmin] = useState([])
    useEffect(() => (async () => setUsersAdmin(await db.Users.findByRole('Admin')))(), [])
    const numberOfAdmin = usersAdmin.length;

    const [usersSupplier, setUsersSupplier] = useState([])
    useEffect(() => (async () => setUsersSupplier(await db.Users.findByRole('Supplier')))(), [])
    const numberOfSupplier = usersSupplier.length;

    const dataUser = [
        {
            name: 'Admin',
            num: numberOfAdmin,
            genderF: usersAdmin.filter((item) => item.gender === "Female").length,
            genderM: usersAdmin.filter((item) => item.gender === "Male").length
        },
        {
            name: 'Customer',
            num: numberOfCustomer,
            genderF: usersCustomer.filter((item) => item.gender === "Female").length,
            genderM: usersCustomer.filter((item) => item.gender === "Male").length
        },
        {
            name: 'Supplier',
            num: numberOfSupplier,
            genderF: usersSupplier.filter((item) => item.gender === "Female").length,
            genderM: usersSupplier.filter((item) => item.gender === "Male").length
        }
    ];

    const [contacts, setContacts] = useState([])
    useEffect(() => (async () => setContacts(await db.Contacts.findAll()))(), []
    )

    const [faqs, setFaqs] = useState([])
    useEffect(() => (async () => setFaqs(await db.Faqs.findAll()))(), []
    )

    const [feedback, setfeedback] = useState([])
    useEffect(() => (async () => setfeedback(await db.Feedbacks.findAll()))(), [])

    const data = [
        {
            name: "Contact Us",
            TotalNum: contacts.length,
            TotalAnswer: contacts.filter((item) => item.answer !== "").length,
            TotalPublished: "-"
        },
        {
            name: "FAQs",
            TotalNum: faqs.length,
            TotalAnswer: faqs.filter((item) => item.answer !== "").length,
            TotalPublished: faqs.filter((item) => item.publish === "Published").length

        },
        {
            name: "Feedbacks",
            TotalNum: feedback.length,
            TotalAnswer: "-",
            TotalPublished: faqs.filter((item) => item.publish === "Published").length

        }
    ];

    // const dataQustionandFeedBack = [
    //     { name: 'Questions', value: 400 },
    //     { name: 'FeedBacks', value: 300 }
    // ];

    //const [QuestionsAsked, setQuestionsAsked] = useState([])
    //useEffect(() => (async () => setQuestionsAsked(await db.Faqs.findAll()))(), [])
    //console.log(QuestionsAsked);
    //const numberOfquestion = QuestionsAsked.length;

    //const totalPrice = mobiles.reduce((tot, pr) => tot + pr.price, 0);

    // const [numberOfservices, setnumberOfservices] = useState([])
    // useEffect(() => (async () => setnumberOfservices(await db.Products.findDistinctCategory()))(), [])
    // const numberOfServices = numberOfservices.length;

    const [productsIndoor, setProductsIndoor] = useState([])
    useEffect(() => (async () => setProductsIndoor(await db.Products.findByCategory('Indoor')))(), [])
    const numProductsIndoor = productsIndoor.length;

    const [productsOutdoor, setProductsOutdoor] = useState([])
    useEffect(() => (async () => setProductsOutdoor(await db.Products.findByCategory('Outdoor')))(), [])
    const numProductsOutdoor = productsOutdoor.length;

    const [productsPlant, setProductsPlant] = useState([])
    useEffect(() => (async () => setProductsPlant(await db.Products.findByCategory('Plant accessories')))(), [])
    const numProductsPlant = productsPlant.length;

    const data01 = [
        { name: 'Indoor', value: numProductsIndoor },
        { name: 'Outdoor', value: numProductsOutdoor },
        { name: 'Plant Accessories', value: numProductsPlant }
    ];

    const [products, setProducts] = useState([])
    useEffect(() => (async () => setProducts(await db.Products.findAll()))(), [])

    const x = products.filter((item) => item.category === "Indoor" && item.quantity)
    const Indoorquantity = x.reduce((s, e) => s = s + e.quantity, 0);
    const Indoorsell = x.reduce((s, e) => s = s + e.soldcount, 0);

    const c = products.filter((item) => item.category === "Outdoor" && item.quantity)
    const Outdoorquantity = c.reduce((s, e) => s = s + e.quantity, 0);
    const Outdoorsell = c.reduce((s, e) => s = s + e.soldcount, 0);

    const z = products.filter((item) => item.category === "Plant accessories" && item.quantity)
    const Plantquantity = z.reduce((s, e) => s = s + e.quantity, 0);
    const Plantsell = z.reduce((s, e) => s = s + e.soldcount, 0);

    //----------------------------------------------------------------------------------------------

    const [carts, setCarts] = useState([])
    useEffect(() => (async () => setCarts(await db.Carts.findAll()))(), [])

    const [stores, setStores] = useState([])
    useEffect(() => (async () => setStores(await db.Stores.findAll()))(), [])


    const year2021C = carts.filter(data => new Date(data.checkoutdate) >= new Date("01/01/2021") && new Date(data.checkoutdate) <= new Date("12/31/2021"));
    const year2021TotalC = year2021C.reduce((s, e) => s = s + e.total, 0);

    const year2020C = carts.filter(data => new Date(data.checkoutdate) >= new Date("01/01/2020") && new Date(data.checkoutdate) <= new Date("12/31/2020"));
    const year2020TotalC = year2020C.reduce((s, e) => s = s + e.total, 0);

    const year2019C = carts.filter(data => new Date(data.checkoutdate) >= new Date("01/01/2019") && new Date(data.checkoutdate) <= new Date("12/31/2019"));
    const year2019TotalC = year2019C.reduce((s, e) => s = s + e.total, 0);

    const year2021S = stores.filter(data => new Date(data.paymentdate) >= new Date("01/01/2021") && new Date(data.paymentdate) <= new Date("12/31/2021"));
    const year2021TotalS = year2021S.reduce((s, e) => s = s + e.totalpricepaid*1, 0);

    const year2020S = stores.filter(data => new Date(data.paymentdate) >= new Date("01/01/2020") && new Date(data.paymentdate) <= new Date("12/31/2020"));
    const year2020TotalS = year2020S.reduce((s, e) => s = s + e.totalpricepaid*1, 0);

    const year2019 = stores.filter(data => new Date(data.paymentdate) >= new Date("01/01/2019") && new Date(data.paymentdate) <= new Date("12/31/2019"));
    const year2019TotalS = year2019.reduce((s, e) => s = s + e.totalpricepaid*1, 0);
console.log(year2019TotalS);
    const money = [
        {
            name: "2019",
            Spend: year2019TotalS,
            Income: year2019TotalC,
            profit: year2019TotalC > year2019TotalS? year2019TotalC - year2019TotalS:year2019TotalS - year2019TotalC,
        },
        {
            name: "2020",
            Spend: year2020TotalS,
            Income: year2020TotalC,
            profit:  year2020TotalC > year2020TotalS ?year2020TotalC - year2020TotalS:year2020TotalS- year2020TotalC,
        },
        {
            name: "2021",
            Spend: year2021TotalS,
            Income: year2021TotalC,
            profit:  year2021TotalC > year2021TotalS? year2021TotalC - year2021TotalS:year2021TotalS -year2021TotalC,
        },
    ];



    const data444 = [
        {
            name: 'Indoor',
            Stock: Indoorquantity,
            Sold: Indoorsell,

        },
        {
            name: 'Outdoor',
            Stock: Outdoorquantity,
            Sold: Outdoorsell,

        },
        {
            name: 'Plant Accessories',
            Stock: Plantquantity,
            Sold: Plantsell,

        },

    ];





    return (
        <div>
            <h1>Report</h1>
            <div className="container">
                <div className="row" >
                    <div className="col-sm" >
                        <h3>Users</h3>
                        <ResponsiveContainer width="100%" height={250} >
                            <AreaChart
                                width={500}
                                height={400}
                                data={dataUser}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="num" stackId="1" stroke="#8884d8" fill="#8884d8" />
                                <Area type="monotone" dataKey="genderF" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                                <Area type="monotone" dataKey="genderM" stackId="1" stroke="#ffc658" fill="#ffc658" />
                            </AreaChart>

                        </ResponsiveContainer>
                    </div>
                    <div className="col-sm" >
                        <h3>Total Number of Date from each Table</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="TotalNum"
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                />
                                <Line type="monotone" dataKey="TotalAnswer" stroke="#1a75ff" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="TotalPublished" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div style={{ clear: 'both' }}></div>
                <br></br>
                <div className="row">

                    <div className="col-sm-7" style={{ height: '400px', padding: '5px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={data444}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Stock" fill="#ffb366" />
                                <Bar dataKey="Sold" fill="#ff80df" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="col-sm-5">
                        <h3> Category Products</h3>
                        <div className="col-sm-9" style={{ height: '400px' }}>
                            <ResponsiveContainer width="100%" height="100%">

                                <PieChart width={400} height={400}>
                                    <Pie
                                        dataKey="value"
                                        isAnimationActive={false}
                                        data={data01}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        label
                                    />

                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>

                <div className="row">

                    <div className="col-sm-7" style={{ height: '400px', padding: '5px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={money}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Spend" fill="#8884d8" />
                                <Bar dataKey="Income" fill="#ff8080" />
                                <Bar dataKey="profit" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
 

                </div>

            </div>

            <div>

            </div>
        </div>

    )
}

export default StatisticsAdmin;
