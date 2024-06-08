import './TodoApp.css'
import LogoutComponent from './LogoutComponent'
import HeaderComponent from './HeaderComponent'
import LoginComponent from './LoginComponent'
import ListTodoComponent from './ListTodoComponent'
import ErrorComponent from './ErrorComponent'
import WelcomeComponent from './WelcomeComponent'
import TodoComponent from './TodoComponent'
import { BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import AuthProvider, { useAuth } from './security/AuthContext'


export default function Todo(){
    function AuthenticatedRoute({children}){
        const Auth=useAuth()
        if(Auth.isAuthenticated)
           return children
        return <Navigate to='/'/>

    }
    return(
        <div>
           <AuthProvider>
            <BrowserRouter>
            <HeaderComponent/>
            <Routes>
                <Route path='/'element={ <LoginComponent/>}/>
                <Route path='/login'element={ <LoginComponent/>}/>
                <Route path='/welcome/:username'element={
                    <AuthenticatedRoute>
                     <WelcomeComponent/>
                     </AuthenticatedRoute>
                     }/>
                <Route path='/todo'element={ <AuthenticatedRoute>
                    <ListTodoComponent/>
                    </AuthenticatedRoute>}/>
                <Route path='/todo/:id'element={ <AuthenticatedRoute>
                <TodoComponent/>
                </AuthenticatedRoute>}/>    
                <Route path='/logout'element={
                    <AuthenticatedRoute>
                         <LogoutComponent/>
                     </AuthenticatedRoute>
                     
                     }/>
                <Route path='*'element={ <ErrorComponent/>}/>
            </Routes>
        </BrowserRouter>   
        </AuthProvider>
        </div>
    )
}