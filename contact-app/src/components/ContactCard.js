import React from 'react';
import { Link } from 'react-router-dom'
import user from '../images/logo512.png';


const ContactCard = (props) => {
    const { id, name, email } = props.contact;


    return (
        <div className="item">
            <img src={user} className="ui avatar image" alt="user" />
            <div className="content">
                <Link to={`/contact/${id}`} state={{ contact: props.contact }}>
                    <div className="header">{name}</div>
                    <div>{email}</div>
                </Link>
            </div>
            <Link to={`/delete/${id}`} state={{ id: id }}>
                <i className="trash alternate outline icon"
                    style={{ color: "red", marginTop: "7px" }}></i>
            </Link>
            <Link to={`/edit/${id}`} state={{ contact: props.contact }}>
                <i className="edit alternate outline icon"
                    style={{ color: "red", marginTop: "7px" }}></i>
            </Link>
        </div>
    )
}

export default ContactCard;