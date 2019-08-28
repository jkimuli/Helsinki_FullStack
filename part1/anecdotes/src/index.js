import React, { useState , useEffect} from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes,setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [max,setMax] = useState(0)
  
  const makeRandom = () =>{
    {/* return random item from the array*/}
  
    let item_index = Math.floor(Math.random()* anecdotes.length)
    setSelected(item_index)
  }

  const increaseVote = () => {
     const copy = [...votes]
     copy[selected] += 1;
     setVotes(copy)     
  }

  useEffect(()=>{
    {/* find largest number in the votes array*/}

    const max = Math.max(...votes)
    setMax(max)

  },[votes])

  return (
    <div>
      <h2> Random Anecdote of the day!</h2>
      {props.anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <p>
       <button onClick={increaseVote}>vote</button>
       <button onClick={makeRandom}>next anecdote</button></p>

      <br></br>
      <h2> Anecdote with the most votes</h2>
      {anecdotes[votes.indexOf(max)]}
      <p> has {max} votes</p> 
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)