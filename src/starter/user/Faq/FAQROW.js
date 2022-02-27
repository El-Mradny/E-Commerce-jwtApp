import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../../UserContext'
import Button from 'react-bootstrap/Button'

function FAQROW({ faq, edit, remove }) {
    const { user } = useContext(UserContext)

    const [validateRemove, setValidateRemove] = useState(false)

    useEffect(() => (async () => setValidateRemove(
        faq.answer === ""
    ))(), [faq])

    return (
        faq && faq.username === user.id ?
            <div className="container" key={faq.id}>

                {
                    faq.answer === "" ?

                        <div className="row" >

                            <div className="col-sm" style={{ backgroundColor: 'white', borderRadius: '10px', padding:'5px' }}> {faq.question} 
                                <br></br>{faq.status === "Sent" ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check2-all" viewBox="0 0 16 16">
                                    <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                                    <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
                                </svg>
                                }
                                <br></br>
                                <Button variant="warning" size="sm" style={{marginRight:'5px'}} onClick={() => edit(faq.id)} >Edit</Button>

                                <Button size="sm" variant="danger" onClick={() => remove(faq.id)} disabled={!validateRemove} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg>
                                </Button>

                            </div>
                        </div>
                        :
                        <div className="row" >
                            <div className="col-sm" style={{ backgroundColor: 'white', borderRadius: '10px' }}>{faq.question}
                                <br></br>{faq.status === "Sent" ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check2-all" viewBox="0 0 16 16">
                                    <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                                    <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
                                </svg>
                                }
                            </div>
                        </div>
                }
                <br></br>
                <div className="row">
                    <div className="col-sm" style={{ backgroundColor: '#85da92ad', borderRadius: '10px'}}>
                        {faq.answer}
                    </div>
                </div>
                <br></br>
            </div> : null
    )

}


export default FAQROW;