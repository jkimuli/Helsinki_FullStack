import React, { useState,useEffect} from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Footer from './components/Footer';
import Filter from './components/Filter';
import SuccessAlert from './components/SuccessAlert'
import ErrorAlert from './components/ErrorAlert'
import phoneService from './services/phone'

const App = () => {

  useEffect(()=> {
         phoneService.getAll()
           .then(initialPhones => {
            setPersons(initialPhones)
         })
           .catch(error => console.log(error))     

  },[])

  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber]= useState('')
  const [searchText,setSearchText]= useState('')
  const [successMessage,setSuccessMessage]=useState('')
  const [errorMessage,setErrorMessage] = useState('')

  const filteredPersons = () => {
    return persons.filter(person => person.name.toLowerCase().includes(searchText.toLowerCase()))
  }  

  const addName = (e) => {

      e.preventDefault()      
      const person_names = persons.map(person => person.name)
      
      if(person_names.includes(newName)){
          window.confirm(`${newName} already exists in the phonebook,replace the old number with the new number?`)
          const person = persons.filter(person => person.name === newName)
          console.log(person[0].id)
          const id = person[0].id

          const changedPerson = {...person[0], number: newNumber}
          phoneService.update(id,changedPerson)
                      .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
                        setNewName('')
                        setNewNumber('')
                        showSuccessMessage(`${returnedPerson.name} number changed!`)                        
          })
           
      }else{

        const newPersonObject = {
            name: newName,
            number: newNumber
        }

        {/* Post the entered new phone number to the server */}

        phoneService.create(newPersonObject)
                    .then(returnedPerson => {
                      setPersons([...persons,newPersonObject])
                      setNewName('')
                      setNewNumber('')
                      showSuccessMessage(`${newPersonObject.name} has been added`)
                    })   

        }     
  }

  const handleChangeName = value => {
      console.log(value)
      setNewName(value)
  }
  
  const handleChangeNumber = value => {
      console.log(value)
      setNewNumber(value)
  }

  const handleChangeSearchText = value => {
      setSearchText(value)
  }

  const deleteName = person => {
     const id = person.id

     if(window.confirm(`Delete ${person.name}?`)){
      phoneService.deleteItem(id)
      .then(data => {
       setPersons(persons.filter(person => person.id!==id )) 
       showSuccessMessage(`${person.name} has been deleted`)

      })
      .catch(error => showErrorMessage(error))
     }
     
  }

  const showSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage('')
    }, 5000)
  }

  const showErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <SuccessAlert message={successMessage}/>
      </div>

      <div>
        <ErrorAlert message={errorMessage}/>
      </div>

      <div>
        <h5>Search Phonebook:</h5>
        <Filter searchText={searchText} handleChangeSearchText={handleChangeSearchText}/>
      </div>
      
      
      <h4>Add New:</h4>
      <PersonForm onSubmit={addName}
                  handleChangeName={handleChangeName}
                  handleChangeNumber={handleChangeNumber}
                  newName={newName}
                  newNumber={newNumber}/>

      <h2>Numbers</h2>
      
      <Persons persons={filteredPersons()} onClick={deleteName}/>

      <hr></hr>
      <Footer />
      
    </div>
  )
}

export default App