import React from 'react'

const PersonForm = (props) => {    

    return (

     <form onSubmit={(e) => props.onSubmit(e)}>
          
        <div>
          name: <input value={props.newName}
                       onChange={(e)=> props.handleChangeName(e.target.value)} required/>
        </div>

        <br></br>
        <div>number: <input value={props.newNumber} 
                            onChange={(e) => props.handleChangeNumber(e.target.value)} required />
        </div>
        <br></br>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    )
}

export default PersonForm