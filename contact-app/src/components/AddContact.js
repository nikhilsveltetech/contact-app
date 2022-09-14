import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


function AddContact(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const add = (e) => {
        e.preventDefault();
        if (name === "" || email === "") {
            alert("All fields are required!")
            return
        }

        props.addContactHandler({ "name": name, "email": email });
        setName("");
        setEmail("");

        navigate('/')
    }

    return (
        <div className="ui main">
            <h2>Add Contacts</h2>
            <form className="ui form" onSubmit={add}>
                <div className="field">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="field">
                    <label>Email</label>
                    <input type="text" name="email" placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button className="ui button blue">Add</button>
            </form>
        </div>
    )
}

export default AddContact;