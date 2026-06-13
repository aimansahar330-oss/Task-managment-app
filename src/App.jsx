import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/login'
import Register from './pages/register'
import Dashboard from "./pages/dashboard"
import  AddTask  from "./pages/AddTask" 
import Settings from "./pages/settings"
import MyTasks from "./pages/MyTasks"
import ForgotPassword from "./pages/forgotPassword"
import ResetPassword from "./pages/ResetPassword"
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-task" element={<AddTask />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/tasks" element={<MyTasks />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
    </BrowserRouter>
      
      
    </>
  )
}

export default App
