import React, { useState,useEffect} from 'react';
import axios from 'axios'

const App = () => {

  useEffect(()=> {
    axios.get('https://restcountries.eu/rest/v2/all')
         .then( response=> {
            setCountries(response.data)
         })              

  },[])

  const [countries, setCountries] = useState([])  
  const [searchText,setSearchText]= useState('')
  
  const filteredCountries = () => {
    const countries_filter = countries.filter(country => country.name.toLowerCase().includes(searchText.toLowerCase())) 
    
    switch(countries_filter.length){
      case 1:        
        return displayCountry(countries_filter[0])           
        
      case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9:
        return(
           <ul>
               {countries_filter.map(country => <li key={country.alpha3Code}>{country.name} &nbsp;<button onClick={()=>setSearchText(country.name)}>Show</button></li>)}
           </ul>
          
        )
        
      default:
        return(
          <p> Too many matches,specify another filter!</p>
      )
       
    }
  }  

  const handleChangeSearchText = e => {
      setSearchText(e.target.value)
  }
  
  const displayCountry = (country) => {

    return (
      <>
      <h2>{country.name}</h2>
      <p> Capital:{country.capital}</p>
      <p> Population:{country.population} </p>
      <h3>Languages: </h3>
      <ul>
        {country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
      </ul>
      <img src={country.flag} width="200" height="180" alt=""></img>
      </>
    )

  }
  
  return (
    <div>
      <p>Find Countries:<input value={searchText}
            onChange={handleChangeSearchText}/></p>   
      
      <div>
        {filteredCountries()}          
      </div>     

    </div>
  )
}

export default App