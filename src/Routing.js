import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from "./auth/pages/signup/Signup"
import UserInformation from './auth/pages/usersInfo/userInfo';
import LoginPage from "./auth/pages/login/login"
import './App.css';
import Home from './Dashboard/pages/home/home';


const Routing = () => {
  return(
    
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<LoginPage />}/>
    <Route path='/home' element={<Home />}/>
    <Route path='/sign-up' element={<SignUp/>}/>
    <Route path='/personal-information' element={<UserInformation/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default Routing;
