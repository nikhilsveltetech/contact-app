import React,{useState} from 'react';
import api from '../api/contacts'
import { useLocation, useNavigate } from 'react-router-dom';



const EditContact = (props)=>{
    const location = useLocation();
    const objData = location.state.contact; 
    
    const [name, setName] = useState(objData.name);
    const [email, setEmail] = useState(objData.email);

    const navigate = useNavigate();

    const updateSubmitHandler = (e)=>{
        e.preventDefault();
        if(name === "" || email === "")
        {
            alert("All the fields are required.")
        }
        props.updateContactHandler({id: objData.id, name:name, email:email})
        navigate('/');
    }
    
    return(
        <div className="ui main">
            <h2>Add Contacts</h2>
            <form className="ui form" onSubmit={updateSubmitHandler}>
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

export default EditContact