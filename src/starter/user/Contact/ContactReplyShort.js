import React, { useContext } from 'react'
import UserContext from '../../../UserContext'

function ContactReplyShort({ contact }) {
    const { user } = useContext(UserContext)
    //console.log(contact);
    return (
        <>
            {
                contact.userid===user.id?

                <div className="container" key={contact.id}>
                    <div className="row">
                        <div className="col-sm">
                            <strong style={{ fontWeight: 'bold' }}>Problem</strong><br></br>
                            {contact.problem}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm">
                            <strong style={{ fontWeight: 'bold', color: 'green' }}>answer</strong><br></br>
                            {contact.answer}

                        </div>
                    </div>
                    <hr></hr>
                </div>:null

            }

        </>
    )
}
export default ContactReplyShort;