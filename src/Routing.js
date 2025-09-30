import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from "./auth/pages/signup/Signup"
import UserInformation from './auth/pages/usersInfo/userInfo';
import LoginPage from "./auth/pages/login/login"
import './App.css';
import Home from './Dashboard/pages/home/home';
import Verification from './Dashboard/pages/verification/verificaionPage';
import ContractorsInformation from './Dashboard/pages/tenantsInfo/contractors';
import TransactionExpenses from './Dashboard/pages/Transactions/expenses/expenseReport';
import ExpenseViewer from './Dashboard/pages/Transactions/expenses/expenseView';


const Routing = () => {

  document.addEventListener("mousemove", (e) => {
    const cursor = document.querySelector(".circle-cursor");
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
  
  return (
    <>
      <BrowserRouter>
       <div class="circle-cursor"></div>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/personal-information' element={<UserInformation />} />
          <Route path='/verification/:code/:account/:token' element={<Verification />} />
          <Route path='/contractors-information' element={<ContractorsInformation/>} />
          <Route path='/transaction-expenses' element={<TransactionExpenses/>} />
          <Route path='/expense-view' element={<ExpenseViewer />} />
        </Routes>
      </BrowserRouter>

    </>

  )
}

export default Routing;
