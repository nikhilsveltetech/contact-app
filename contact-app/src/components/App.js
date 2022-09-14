import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header.js';
import api from '../api/contacts';
import ContactList from './ContactList.js'
import DeleteContact from './DeleteContact.js'
import AddContact from './AddContact.js'
import ContactDetail from './ContactDetail.js'
import EditContact from './EditContact.js'
import { useState, useEffect } from 'react';
import uuid from "uuidv4";


function App() {

  const [contacts, setContacts] = useState([]);
  const LOCAL_STORAGE_KEY = 'contacts';
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

 
  const updateContactHandler = async (contact)=>{
    const response = await api.put(`/contacts/${contact.id}`, contact)
    const {id, name,email} = response.data;
    
    setContacts(contacts.map(contact=>{
      return contact.id === id ? {...response.data} : contact
    }))
}

  const retrieveContacts = async ()=>{
    const response = await api.get('/contacts');
    return response.data;
  }

  const addContactHandler = async (contact) => {
    const request ={
      id: uuid(),
      ...contact
    }

    const response = await api.post('/contacts', request)

    setContacts([...contacts, response.data]);
  }

  const removeContactHandler = async (id) => {
   await api.delete(`contacts/${id}`)
    const newContactList = contacts.filter(contact => {
      return contact.id !== id;
    })
    setContacts(newContactList);
  }

  const searchHandler = (searchTerm)=>{
    setSearchTerm(searchTerm);
    
    if(searchTerm !== ""){
      
      const newContactList = contacts.filter(contact => {
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      }); 
        setSearchResults(newContactList);
      }
    else{
      setSearchResults(contacts);
    }
  }

  useEffect(() => {
    const getAllContacts = async ()=>{
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    }

    getAllContacts();
  }, [])


  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route path="/contact/:id" element={<ContactDetail  />} />
          <Route path="/" element={<ContactList 
            contacts={searchTerm.length < 1 ? contacts : searchResults} 
            getContactId={removeContactHandler}
            term={searchTerm}  
            searchKeyword={searchHandler}
            />}
           />
          <Route path="/add" element={<AddContact addContactHandler={addContactHandler} />} />
          <Route path="/edit/:id" element={<EditContact updateContactHandler={updateContactHandler} />} />
          <Route path="/delete/:id" element={<DeleteContact getContactId={removeContactHandler} />} />
        </Routes>
      </Router>
    </div>
  )

}

export default App;