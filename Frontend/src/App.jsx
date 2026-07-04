import { useState } from 'react';
import {Routes,Route} from 'react-router-dom';

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import ProtectedRoute from "./components/ProtectedRoutes";


function App() {
  return (
      
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}
      ></Route>

      <Route path='/dashboard' element={  <ProtectedRoute>
        <Dashboard/>
      </ProtectedRoute>
      }></Route>
      <Route path='/expenses' element={<ProtectedRoute>
        <Expenses/>
      </ProtectedRoute>}></Route>
      <Route path='/products' element={<ProtectedRoute>
        <Products/>
      </ProtectedRoute>}></Route>
      <Route path='/orders' element={<ProtectedRoute>
        <Orders/>
      </ProtectedRoute>}></Route>
      <Route path='*' element={<NotFound/>}></Route>
    </Routes>

  )
}

export default App;
