import { useState } from 'react'
import './Counter.css'
import CounterButton from './CounterButton'

export default function Counter(){
    const [count, setCount]=useState(0)
    function Incrementfunction(by){
        return(
            setCount(count+by)
        )
    }
    function Decrementfunction(by){
        return(
            setCount(count-by)
        )
    }
    function Reset(){
        return(
            setCount(0)
        )
    }
    return(   
        <div>
         <span className='totalcount'>{count}</span>
         <CounterButton by={1} incrementmethod={Incrementfunction} decrementMethod={Decrementfunction}/>
         <CounterButton by={2} incrementmethod={Incrementfunction} decrementMethod={Decrementfunction}/>
         <CounterButton by={5} incrementmethod={Incrementfunction} decrementMethod={Decrementfunction}/>
         <div>
            <button className="resetbutton" onClick={Reset}>Reset</button>
            </div>
        </div>
    )
}

