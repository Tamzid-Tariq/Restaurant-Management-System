import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import AdminPortal from "./Components/AdminPortal";
import CustomerLogin from "./Components/CustomerLogin";
import ManageCustomers from "./Components/ManageCustomers";
import RemoveCustomer from "./Components/RemoveCustomer";
import CustomerDetail from "./Components/CustomerDetail";
import CustomerDashboard from "./Components/CustomerDashboard";
import CustomerProfile from "./Components/CustomerProfile";
import Home from './Components/Home'
import ManageStaff from "./Components/ManageStaff";
import ManageMenu from "./Components/ManageMenu";
import ManageOrder from "./Components/ManageOrder";
import ManageBookings from "./Components/ManageBookings";
import UserDetail from "./Components/UserDetail";
import StaffDetail from "./Components/StaffDetail";
import MenuDetail from "./Components/MenuDetail";
import OrderDetail from "./Components/OrderDetail";

import StaffProfile from "./Components/StaffProfile";
import MenuProfile from "./Components/MenuProfile";
import OrderProfile from "./Components/OrderProfile";
// import Start from './Start'
// import EmployeeDetail from './EmployeeDetail'
// import EmployeeLogin from './EmployeeLogin'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<Home />} ></Route>
        <Route path="/customerlogin" element={<CustomerLogin />}></Route>
        <Route path="/customerdash" element={<CustomerDashboard />}>
          <Route path="/customerdash/user-profile" element={<CustomerProfile />}></Route>
          </Route>
        <Route path="/adminlogin" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/AdminPortal" element={<AdminPortal />}></Route>
          <Route path="/dashboard/ManageCustomers" element={<ManageCustomers />}></Route>
          <Route path="/dashboard/RemoveCustomer" element={<RemoveCustomer />}></Route>
          <Route path="/dashboard/CustomerDetail" element={<CustomerDetail />}></Route>
          <Route path="/dashboard/StaffDetail" element={<StaffDetail />}></Route>
          <Route path="/dashboard/MenuDetail" element={<MenuDetail />}></Route>
          <Route path="/dashboard/OrderDetail" element={<OrderDetail />}></Route>

          <Route path="/dashboard/ManageStaff" element={<ManageStaff />}></Route>
          <Route path="/dashboard/ManageMenu" element={<ManageMenu />}></Route>
          <Route path="/dashboard/ManageOrder" element={<ManageOrder />}></Route>
          <Route path="/dashboard/ManageBookings" element={<ManageBookings />}></Route>
          <Route path="/dashboard/CustomerDetail/customer/:id" element={<UserDetail />} />
          <Route path="/dashboard/StaffDetail/staff/:id" element={<StaffProfile />} />
          <Route path="/dashboard/MenuDetail/menu/:id" element={<MenuProfile />} />
          <Route path="/dashboard/OrderDetail/order/:id" element={<OrderProfile />} />
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
