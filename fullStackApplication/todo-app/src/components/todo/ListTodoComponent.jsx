import { useEffect, useState } from "react"
import { deleteByIdTodo, retrieveAllTodo } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"

export default function ListTodoComponent(){
    const [todos,setTodos]=useState([])
    const [message,setMessage]=useState(null)
    const username=useAuth().username
    const navigate=useNavigate()
    useEffect(
        () => refreshFunction(),[]
    )

    function deleteTodo(id){
        deleteByIdTodo(username,id)
        .then(() => {
        setMessage(`Delete of todo with id = ${id} successfully`)
        refreshFunction()
        }
        )
        .catch(error=>console.log(error))
        }

    function updateTodo(id){
        console.log("updated"+id)
        navigate(`/todo/${id}`)
    }   
    function addTodo(){
        navigate('/todo/-1')
    }
    function refreshFunction(){
        retrieveAllTodo(username)
        .then(response => {
        setTodos(response.data)
        }
        )
        .catch(error=>console.log(error))
    }
    
    return(
    <div className='Container'>
        <h1>Things you want to do!</h1>
        {message && <div className="alert alert-warning">{message}</div>}
    <table className='table'>
        <thead>
            <tr>
                <th>Description</th>
                <th>Status</th>
                <th>Target Date</th>
                <th>Delete</th>
                <th>Update</th>
            </tr>
        </thead>
        <tbody>
            {
              todos.map( 
                todo => (<tr key={todo.id}>
                    <td>{todo.description}</td>
                    <td>{todo.done.toString()}</td>
                    <td>{todo.targetDate.toString()}</td>
                    <td><button className="btn btn-warning" onClick={() =>deleteTodo(todo.id)}>Delete</button></td>
                    <td><button className="btn btn-success" onClick={() =>updateTodo(todo.id)}>Update</button></td>
                </tr>)
              )    
            }  
        </tbody>
    </table>
    <div><button className="btn btn-success m-5" onClick={addTodo}>Add New todo</button></div>
    </div>
    
    )
}