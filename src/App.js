import React, { StrictMode } from 'react'
import Navigation from './components/navigationComponents/Navigation'
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom'
import ReservationPage from './components/reservationComponents/ReservationPage'
import "./App.css"
import AddReservationTable from './components/addReservationComponents/AddReservationTable'
import DeleteResourcePage from './components/deleteResourceComponents/DeleteResourcePage'
import UpdateResourcePage from './components/updateResourceComponents/UpdateResourcePage'
import { useAuth } from './components/auth/AuthContext'
import { AuthProvider } from './components/auth/AuthContext'; 
import Login from './components/auth/Login'
import LoggedIn from './components/auth/LoggedIn'

const ProtectedRoute = ({element}) =>{
  const {isAuthenticated} = useAuth();
  return isAuthenticated ? element :<Navigate to="/settings/login" />;
};


function App() {
  return (
    <StrictMode>
    <BrowserRouter>
      <Navigation />
      <AuthProvider>
      <Routes>
        <Route path='/' element={<ReservationPage />} />
        <Route path='/reservation/:resourceId' element={<ReservationPage />} />
        <Route path='/settings/login' element={<Login />}/>
        <Route path='/settings/add-reservation-table' element={<ProtectedRoute element={<AddReservationTable />} />} />
        <Route path='/settings/delete-resource'  element={<ProtectedRoute element={<DeleteResourcePage />} />} />
        <Route path='/settings/update-resource'  element={<ProtectedRoute element={<UpdateResourcePage />} />} />
        <Route path='/settings/logged-in' element={<LoggedIn/>}/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
    </StrictMode>
  )
}

export default App
