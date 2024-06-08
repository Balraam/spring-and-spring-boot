import { useNavigate, useParams } from "react-router-dom"
import { createTodo, retrieveTodo, updateTodo } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { Formik,Form, Field, ErrorMessage } from "formik"
import moment from "moment"


export default function TodoComponent(){
    const {id}=useParams()
    const username=useAuth().username
    const [description,setDescription]=useState('')
    const [targetDate,setTargetDate]=useState('')
    const navigate=useNavigate()
    useEffect(() =>  retrieveTodos() ,[id])
    function retrieveTodos(){
        if(id !== -1){
        retrieveTodo(username,id)
        .then(response => {
         setDescription(response.data.description)
         setTargetDate(response.data.targetDate)
        })
        .catch(error => console.log(error))
    }
    }

    function onSubmit(values){
        console.log(values)
        const todo={
            id: id,
            description:values.description,
            targetDate:values.targetDate,
            done:false
        }
        if(id === -1){
            createTodo(username,todo)
            .then( ()=> {navigate('/todo')})
        .catch(error => console.log(error))
        }else{
        updateTodo(username,id,todo)
        .then( ()=> {navigate('/todo')})
        .catch(error => console.log(error))
        }
    }
    function validate(values){
        let error ={}
        if(values.description.length<5){
            error.description='Length atleast 5 character'
        }
        if(values.targetDate === null || values.targetDate ==='' || !moment(values.targetDate).isValid()){
            error.targetDate='Date should not be null'
        }
        console.log(values)
        return error
    }
    return(
    <div className="Container">
     <h1>Enter Todo details</h1>
     <div>
      <Formik initialValues={{description,targetDate}} 
      enableReinitialize={true}
      onSubmit={onSubmit}
      validate={validate}
      validateOnChange={false}
      validateOnBlur={false}
      >
        {
        (props) =>(
        <Form>
            <ErrorMessage className="alert alert-warning" name="description" component="div"/>
            <ErrorMessage className="alert alert-warning" name="targetDate" component="div"/>
            <fieldset className="form-group">
                <label>Description</label>
                <Field  className= "form-control" type="text" name="description"/>
            </fieldset>
            <fieldset className="form-group">
                <label>targetDate</label>
                <Field className="form-control" type="date" name="targetDate"/>
            </fieldset>
            <div><button className="btn btn-success m-5" type="submit">Save</button></div>
      </Form>
        )
}
        </Formik>
     </div>

    </div>
    )
}