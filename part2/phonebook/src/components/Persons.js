import React from 'react'

const Persons = ({persons,onClick}) => {

    const personStyle = {
        'liStyle':{
            color:'grey',
            paddingTop: 8,
            fontSize: 15,
        }          
          
    }

    const rows = () => persons.map(person => <li style={personStyle.liStyle} key={person.name}>{person.name} - {person.number} &nbsp; <button onClick={()=>onClick(person)}>Delete</button></li>)

    return(
        <ul>
            {rows()}
        </ul>
    )

}

export default Persons