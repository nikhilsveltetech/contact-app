import { Link, useNavigate } from 'react-router-dom';
import React, {useRef} from 'react';
import ContactCard from './ContactCard';



const ContactList = (props) => {
    const inputEl = useRef("");

    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard contact={contact} key={contact.id} getContactId={props.getContactId}></ContactCard>
        )
    })

    const getSearchTerm = (e)=>{
        props.searchKeyword(inputEl.current.value);
    }

    return (
        <div className="main marginForty">
            <h2> Contact List
                <Link to="/add">
                    <button className="ui button blue right">Add Contact</button>
                </Link>
            </h2>
            <div className="ui search">
                <div className="ui icon input">
                    <input type="text" className="propmpt"
                    ref={inputEl}
                     placeholder="Search Contacts"
                     value={props.term}
                     onChange={getSearchTerm}
                     />
                    <i className="search icon"></i>
                </div>  
            </div>
            <div className="ui celled list">
                {renderContactList.length > 0? renderContactList : "No contacts available"}
            </div>
        </div>
    )
}

export default ContactList;