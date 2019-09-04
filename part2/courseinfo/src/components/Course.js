import React from 'react';

const Header = ({name}) =>{
    return(
        <h1>{name}</h1>
    );
}

const Content = ({parts}) => {    
    console.log('parts', parts)
    const rows = parts.map(part => <Part key={part.id} part={part} />)    
      
    return (
    <ul>
      {rows}      
    </ul>
    )
}

const Total =({parts})=>{

  {/* Extract the array exercises from the passed into list of parts Objects*/} 

  const exercises = parts.map(part => part.exercises)
  const total = exercises.reduce((sum,value)=> sum + value)

  return(
      <h3> total of {total} exercises</h3>
  )  
}

const Part = ({part}) => {

    return(
        <li> {part.name} {part.exercises}</li>
    )
}

const Course = (props) => {    
    const { course } = props 

    return(
        <div>
          <Header name={course.name}/>
          <Content parts={course.parts}/> 
          <Total parts={course.parts}/>         
        </div>
    )
}

export default Course