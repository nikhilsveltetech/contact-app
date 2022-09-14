import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const DeleteContact = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleDeleteOption = (e) => {
        if (e.target.value === 'yes') {
            props.getContactId(location.state.id)
            navigate('/');
        }else{
            console.log('no value');
        }
        console.log(e.target.value);
    }

    return (
        <div>
            <h1>Are you sure, you wanna delete this entry?</h1>
            <div>
                <button type="submit" onClick={handleDeleteOption} value='yes'>Yes</button>
                <button type="submit" onClick={handleDeleteOption} value='no'>No</button>
            </div>
        </div>
    )
}

export default DeleteContact