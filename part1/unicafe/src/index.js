import React, { useState,useEffect } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {

  if(!props.feedback){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  
  return (
    <>
    <table>
      <tbody>
        <tr>
          <Statistic text="Good" value={props.good}/>          
        </tr>
        <tr><Statistic text="Neutral"  value={props.neutral}/></tr>
        <tr><Statistic text="Bad"  value={props.bad}/></tr>
        <tr><Statistic text="All"  value={props.all}/></tr>
        <tr><Statistic text="Average" value={props.average}/></tr>
        <tr><Statistic text="Positive" value={props.positive}/></tr>
      </tbody>
    </table>

    </>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Statistic = ({text,value}) =>{
  return(
    <>
    <td>{text}</td>  
    <td>{value}</td>
    </>
  )
}

const App = () => {

  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total,setTotal] = useState(0)
  const [average,setAverage] = useState(0)
  const [goodPercent,setGoodPercent] = useState(0)
  const [feedbackOn,setFeedbackOn] = useState(false)

  const increaseGood = () => {    
    setGood(good + 1)
    updateTotal()       
  }

  useEffect(()=>{
    {/*recalculate statistics if any of good,bad,neutral change*/}

    const sum = (good * 1) - (bad * 1) + (neutral * 0)  
    setAverage(sum/total)
    setGoodPercent((good/total)*100)

  },[good,bad,neutral,total])

  const updateTotal = () => {
    setTotal(t => t + 1)
    setFeedbackOn(true)
  }  

  const increaseNeutral = () => {    
    setNeutral(neutral+1) 
    updateTotal()  
  }

  const increaseBad = () =>  {    
    setBad(bad+1) 
    updateTotal()
  }  

  return (
    <div>
      <p> Give feedback </p>
      <Button onClick={increaseGood} text="good"/>
      <Button onClick={increaseNeutral} text="neutral"/>
      <Button onClick={increaseBad} text="bad"/>

      <br></br>

      <p> Statistics:</p>

      <Statistics good={good} 
                  bad={bad} neutral={neutral} 
                  all={total} average={average}
                  positive={goodPercent} feedback={feedbackOn}/>     
         
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)