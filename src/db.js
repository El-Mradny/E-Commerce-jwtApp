// const calculateAge = birthdate =>
//     Math.floor((new Date().getTime() - birthdate.getTime()) / (1000 * 60 * 60 * 24 * 365.25))

// const toJavaString = date => {
//     // console.log('date', date)
//     return date.toISOString().replace('T', ' ').replace('Z', '')
// }

const getJwtUser = () => sessionStorage.getItem("jwtUser") ? JSON.parse(sessionStorage.getItem("jwtUser")) : null
const setJwtUser = user => user ? sessionStorage.setItem("jwtUser", JSON.stringify(user)) : sessionStorage.removeItem("jwtUser")

const authFetch = (url, options) => {
    const jwtUser = getJwtUser()
    if (jwtUser) {
        options = options || {}
        options.headers = options.headers || {}
        options.headers.Authorization = `Bearer ${jwtUser.token}`
    }
    return fetch(url, options)
}

const uploadImage = async (imageFile, name) => {
    console.log('imageFile object', imageFile)
    const body = new FormData()
    body.append('file', imageFile, name)
    const result = await authFetch('/images', {
        method: 'POST',
        body
    })
    console.log('uploadImage result', result)
    return result
}

const email = async (to, subject, text) => {
    const result = await fetch('/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, text })
    })
    console.log('email result', result)
    return result
}

const uploadFile = async (imageFile, name) => {
    console.log('imageFile object', imageFile)
    const body = new FormData()
    body.append('file', imageFile, name)
    const result = await authFetch('/images', {
        method: 'POST',
        body
    })
    console.log('uploadImage result', result)
    return result
}

class DB {

    constructor(table) {
        this.table = table
    }


    async create(set, item) {
        console.log(item)
        // const response = 
        await authFetch(`/${this.table}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            }
        )
        // console.log('create response', response)
        set(await this.findAll())
    }

    async remove(set, id) {
        // const response = 
        await authFetch(`/${this.table}/${id}`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            }
        )
        // console.log('response', response)
        set(await this.findAll())
    }

    async update(set, item) {
        // const response = 
        await authFetch(`/${this.table}/${item.id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            }
        )
        // console.log('response', response)
        set(await this.findAll())
    }

    reformatOne(item) {
        // console.log('reformatOne in', item)
        if (item) {
            const { _links, ...rest } = item
            const id = _links.self.href.split(`${this.table}/`)[1]
            item = { id, ...rest }
            // console.log('reformatOne out', item)
        }
        return item
    }

    reformatAll(items) {
        // console.log('reformatAll in', items)
        items = items._embedded[this.table].map(item => this.reformatOne(item))
        // console.log('reformatAll out', items)
        return items
    }

    async find(query) {
        // access the server through url, issuing GET request
        // for url: http://localhost:8080/registers (for example)
        const response = await authFetch(`/${this.table}/${query}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        // console.log('response', response)
        if (response.ok) {
            const json = await response.json()
            // console.log('json', json)
            return json
        }
        else {
            return undefined
        }
    }

    async findAll() {
        return this.reformatAll(await this.find(""))
    }

    async findOne(id) {
        return this.reformatOne(await this.find(id))
    }
}

class Users extends DB {

    constructor() {
        super("users")
    }

    reformatOne(item) {
        if (item) {
            item = super.reformatOne(item)
            item = { ...item, birthdate: new Date(item.birthdate), createaccountdate: new Date(item.createaccountdate) }
            return item
        }
        else return undefined
    }

    async findByRole(role) {
        return this.reformatAll(await this.find(`search/findByRole?role=${role}`))
    }

}



class Promotionemails extends DB {

    constructor() {
        super("promotionemails")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id }
        return item
    }

    async findByEmail(email) {
        return this.reformatAll(await this.find(`/search/findByEmail?email=${email}`))
    }

}

class Applications extends DB {

    constructor() {
        super("applications")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id, applieddate: new Date(item.applieddate) }
        return item
    }

    async findByUserid(id) {
        return this.reformatAll(await this.find(`search/findByUserid?id=${id}`))
    }

}

class Products extends DB {

    constructor() {
        super("products")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id, date: new Date(item.date) }
        return item
    }

    async findByNameContaining(name) {
        return this.reformatAll(await this.find(`search/findByNameContaining?name=${name}`))
    }

    async findByNameContainingIgnoreCase(name) {
        return this.reformatAll(await this.find(`search/findByNameContainingIgnoreCase?name=${name}`))
    }

    //ASC>small    Dec>Big
    async SortByLowestPrice() {
        return this.reformatAll(await this.find(`search/findByOrderByPriceAsc`))
    }

    async SortByHighestPrice() {
        return this.reformatAll(await this.find(`search/findByOrderByPriceDesc`))
    }

    async SortByNewest() {
        return this.reformatAll(await this.find(`search/findByOrderByDateDesc`))
    }

    async SortByOldest() {
        return this.reformatAll(await this.find(`search/findByOrderByDateAsc`))
    }

    async findByCategory(categ) {
        return this.reformatAll(await this.find(`search/findByCategory?category=${categ}`))
    }


    async findByCategoryAndPriceLowest(categ) {
        return this.reformatAll(await this.find(`search/findByCategoryOrderByPriceAsc?category=${categ}`))
    }

    async findByCategoryAndPriceHighest(categ) {
        return this.reformatAll(await this.find(`search/findByCategoryOrderByPriceDesc?category=${categ}`))
    }


    async findByCategoryAndSortByNewest(categ) {
        return this.reformatAll(await this.find(`search/findByCategoryOrderByDateDesc?category=${categ}`))
    }

    async findByCategoryAndSortByOldest(categ) {
        return this.reformatAll(await this.find(`search/findByCategoryOrderByDateAsc?category=${categ}`))
    }

    async findDistinctCategory() {
        return [...new Set((await this.findAll()).map(user => user.category))]
    }

    async findByName(name) {
        return this.reformatAll(await this.find(`search/findByName?name=${name}`))
    }

    async findByCategoryOrderBySoldcountDesc(categ) {
        return this.reformatAll(await this.find(`search/findByCategoryOrderBySoldcountDesc?category=${categ}`))
    }
    

    async SortByHighestSelling() {
        return this.reformatAll(await this.find(`search/findByOrderBySoldcountDesc`))
    }

}

class Carts extends DB {

    constructor() {
        super("carts")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id , checkoutdate: new Date(item.checkoutdate)}
        return item
    }

    async findByUseridAndStatus(userid, status) {
        return this.reformatAll(await this.find(`search/findByUseridAndStatus?userid=${userid}&status=${status}`))
    }

    async findByUserid(id) {
        return this.reformatAll(await this.find(`search/findByUserid?id=${id}`))
    }

    async findByUseridAndStatusAndOrderStatus(userid, status,Order) {
        return this.reformatAll(await this.find(`search/findByUseridAndStatusAndOrderstatus?userid=${userid}&status=${status}&Order=${Order}`))
    }

    
    async findByUseridAndId(user,cartId) {
        return this.reformatAll(await this.find(`search/findByUseridAndId?userid=${user}&&id=${cartId}`))
    }
    
    

    async findByShippingid(id) {
        return this.reformatAll(await this.find(`search/findByShippingid?id=${id}`))
    }

    async findByPaymentid(id) {
        return this.reformatAll(await this.find(`search/findByPaymentid?id=${id}`))
    }
}

class Feedbacks extends DB {

    constructor() {
        super("feedbacks")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id }
        return item
    }

    async findByUserid(id) {
        return this.reformatAll(await this.find(`search/findByUserid?id=${id}`))
    }

}



class Faqs extends DB {

    constructor() {
        super("faqs")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id }
        return item
    }


    async findByQuestionIgnoreCaseAndUsername(question, username) {
        return this.reformatAll(await this.find(`search/findByQuestionIgnoreCaseAndUsername?question=${question}&username=${username}`))
    }

    async findByUserid(id) {
        return this.reformatAll(await this.find(`search/findByUsername?id=${id}`))
    }

}

class Contacts extends DB {

    constructor() {
        super("contacts")
    }
    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id }
        return item
    }
    
    async findByUserid(id) {
        return this.reformatAll(await this.find(`search/findByUsername?id=${id}`))
    }
}

class Packageproducts extends DB {

    constructor() {
        super("packageproducts")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id}
        return item
    }

    async findByPackageid(id) {
        return this.reformatAll(await this.find(`search/findByPackageid?id=${id}`))
    }

    async findByProductid(id) {
        return this.reformatAll(await this.find(`search/findByProductid?id=${id}`))
    }


}


class Packages extends DB {

    constructor() {
        super("packages")
    }
    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id ,startdate: new Date(item.startdate), enddate: new Date(item.enddate)}
        return item
    }

    async findByName(name) {
        return this.reformatAll(await this.find(`/search/findByName?name=${name}`))
    }

}

class Wishlists extends DB {

    constructor() {
        super("wishlists")
    }
    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id}
        return item
    }

    async findByUserid(id) {
        return this.reformatAll(await this.find(`search/findByUserid?id=${id}`))
    }
    async findByProductid(id) {
        return this.reformatAll(await this.find(`search/findByProductid?id=${id}`))
    }

    
    async findByProductidAndUserid(productId,userId) {
        return this.reformatAll(await this.find(`search/findByProductidAndUserid?productId=${productId}&userId=${userId}`))
    }

    async findByProductidAndUseridContains(productId,userId) {
        return this.reformatAll(await this.find(`search/findByProductidAndUseridContains?productId=${productId}&userId=${userId}`))
    }

    //--------------------------------------------------------------

    
    async findByPackageidAndUserid(Packageid,userId) {
        return this.reformatAll(await this.find(`search/findByPackageidAndUserid?packageId=${Packageid}&userId=${userId}`))
    }

    

    async findByPackageidAndUseridContains(Packageid, userid) {
        return this.reformatAll(await this.find(`search/findByPackageidAndUseridContains?packageId=${Packageid}&userId=${userid}`))
    }
}

class Sales extends DB {

    constructor() {
        super("sales")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id , startdate: new Date(item.startdate), enddate: new Date(item.enddate)}
        return item
    }
    
    async findByProductid(id) {
        return this.reformatAll(await this.find(`search/findByProductid?id=${id}`))
    }

}

class Ratings extends DB {

    constructor() {
        super("ratings")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id , ratingdate: new Date(item.ratingdate)}
        return item
    }
    
    async findByProductid(id) {
        return this.reformatAll(await this.find(`search/findByProductid?id=${id}`))
    }

    async findByProductidAndUserid(productId,userId) {
        return this.reformatAll(await this.find(`search/findByProductidAndUserid?productId=${productId}&userId=${userId}`))
    }

    
    async findByProductidAndStars(productId,star) {
        return this.reformatAll(await this.find(`search/findByProductidAndStars?productId=${productId}&star=${star}`))
    }

    async findByUserid(id) {
        return this.reformatAll(await this.find(`search/findByUserid?id=${id}`))
    }
}

class Payments extends DB {

    constructor() {
        super("payments")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id , expirydate: new Date(item.expirydate)}
        return item
    }
    
    
}

class Shippings extends DB {

    constructor() {
        super("shippings")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id}
        return item
    }

    async findByUserid(id) {
        return this.reformatAll(await this.find(`search/findByUserid?id=${id}`))
    }

   
}


class Discounts extends DB {

    constructor() {
        super("discounts")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id, startdate: new Date(item.startdate), enddate: new Date(item.enddate)}
        return item
    }

    
    async findByDiscountcode(code) {
        return this.reformatAll(await this.find(`search/findByDiscountcode?discountcode=${code}`))
    }
}

class Stores extends DB {

    constructor() {
        super("stores")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id, paymentdate: new Date(item.paymentdate)}
        return item
    }
    async findByUserid(id) {
        return this.reformatAll(await this.find(`search/findByUserid?id=${id}`))
    }
}

class Suppliers extends DB {

    constructor() {
        super("suppliers")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id}
        return item
    }
    async findByUserid(id) {
        return this.reformatAll(await this.find(`search/findByUserid?id=${id}`))
    }
   
}

class Blogs extends DB {

    constructor() {
        super("blogs")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id, publishdate: new Date(item.publishdate)}
        return item
    }
  
   
}

class Blogcomments extends DB {

    constructor() {
        super("blogcomments")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id, commentdate: new Date(item.commentdate)}
        return item
    }

    async findByBlogid(id) {
        return this.reformatAll(await this.find(`search/findByBlogid?id=${id}`))
    }


    async findByBlogidAndUserid(id,user) {
        return this.reformatAll(await this.find(`search/findByBlogidAndUserid?id=${id}&user=${user}`))
    }

    async findByUserid(id) {
        return this.reformatAll(await this.find(`search/findByUserid?id=${id}`))
    }
}

class Blogcommentreplays extends DB {

    constructor() {
        super("blogcommentreplays")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id, commentdate: new Date(item.commentdate)}
        return item
    }

    async findByBlogcommentid(id) {
        return this.reformatAll(await this.find(`search/findByBlogcommentid?id=${id}`))
    }


    async findByBlogcommentidAndBlogid(id, blog) {
        return this.reformatAll(await this.find(`search/findByBlogcommentidAndBlogid?id=${id}&blog=${blog}`))
    }

    async findByUserid(id) {
        return this.reformatAll(await this.find(`search/findByUserid?id=${id}`))
    }
}


class Bloglikes extends DB {

    constructor() {
        super("bloglikes")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id}
        return item
    }

    
    async findByBlogid(id) {
        return this.reformatAll(await this.find(`search/findByBlogid?id=${id}`))
    }
    
    async findByBlogidAndUserid(id,user) {
        return this.reformatAll(await this.find(`search/findByBlogidAndUserid?id=${id}&user=${user}`))
    }

   
}

class Compaers extends DB {

    constructor() {
        super("compaers")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id}
        return item
    }
    async findByUserid(id) {
        return this.reformatAll(await this.find(`search/findByUserid?id=${id}`))
    }
    async findByProductidAndUserid(productId,userId) {
        return this.reformatAll(await this.find(`search/findByProductidAndUserid?productId=${productId}&userId=${userId}`))
    }
   
}

class Cartitems extends DB {

    constructor() {
        super("cartitems")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id}
        return item
    }

    async findByProductid(id) {
        return this.reformatAll(await this.find(`search/findByProductid?id=${id}`))
    }

    async findByProductidAndCartid(productid, cartid) {
        return this.reformatAll(await this.find(`search/findByProductidAndCartid?productid=${productid}&cartid=${cartid}`))
    }

    async findByCartid(id) {
        return this.reformatAll(await this.find(`search/findByCartid?id=${id}`))
    }

    async findByPackageidAndCartid(Packageid, cartid) {
        return this.reformatAll(await this.find(`search/findByPackageidAndCartid?packageid=${Packageid}&cartid=${cartid}`))
    }


}



const db = {
    getJwtUser,
    setJwtUser,
    uploadImage,
    email,
    uploadFile,
    Products: new Products(),
    Users: new Users(),
    Carts: new Carts(),
    Cartitems: new Cartitems(),
    Feedbacks: new Feedbacks(),
    Faqs: new Faqs(),
    Contacts: new Contacts(),
    Promotionemails: new Promotionemails(),
    Applications: new Applications(),
    Sales: new Sales(),
    Packages : new Packages(),
    Packageproducts: new Packageproducts(),
    Payments : new Payments(),
    Shippings : new Shippings(),
    Compaers : new Compaers(),
    Wishlists : new Wishlists(),
    Discounts : new Discounts(),
    Stores : new Stores(),
    Suppliers : new Suppliers(),
    Ratings : new Ratings(),
    Blogs : new Blogs(),
    Bloglikes : new Bloglikes(),
    Blogcomments : new Blogcomments(),
    Blogcommentreplays : new Blogcommentreplays(),
}

export default db