import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import AdminPortal from "./Components/AdminPortal";
import ManageCustomers from "./Components/ManageCustomers";
import RemoveCustomer from "./Components/RemoveCustomer";
import CustomerDetail from "./Components/CustomerDetail";
import Home from './Components/Home'
import ManageStaff from "./Components/ManageStaff";
import ManageMenu from "./Components/ManageMenu";
import ManageBookings from "./Components/ManageBookings";
// import Start from './Start'
// import EmployeeDetail from './EmployeeDetail'
// import EmployeeLogin from './EmployeeLogin'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminlogin" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}>
        {/* </Route>
        <Route> */}
          <Route path='' element={<Home />}></Route>
          <Route path="/dashboard/AdminPortal" element={<AdminPortal />}></Route>
          <Route path="/dashboard/ManageCustomers" element={<ManageCustomers />}></Route>
          <Route path="/dashboard/RemoveCustomer" element={<RemoveCustomer />}></Route>
          <Route path="/dashboard/CustomerDetail" element={<CustomerDetail />}></Route>

          <Route path="/dashboard/ManageStaff" element={<ManageStaff />}></Route>
          <Route path="/dashboard/ManageMenu" element={<ManageMenu />}></Route>
          <Route path="/dashboard/ManageBookings" element={<ManageBookings />}></Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>
        {/* <Route path='/start' element={<Start />}></Route>  */}
        {/* <Route path='/employeeLogin' element={<EmployeeLogin />}></Route>
      <Route path='/employeedetail/:id' element={<EmployeeDetail />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
