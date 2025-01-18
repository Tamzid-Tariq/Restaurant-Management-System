// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const RemoveCustomer = () => {
//   const [searchCategory, setSearchCategory] = useState("Name");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch customers based on search criteria
//   const fetchCustomers = async () => {
//     setLoading(true);
//     try {
//       console.log(`Fetching customers with category: ${searchCategory}, query: ${searchQuery}`);
//       const response = await axios.get(`http://localhost:3000/customers/search`, {
//         params: {
//           category: searchCategory,
//           query: searchQuery,
//         },
//       });
//       setCustomers(response.data);
//       setError(null);
//     } catch (err) {
//       console.error('Fetch Customers Error:', err);
//       setError('Failed to fetch customers');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle customer removal
//   const handleRemoveCustomer = async (customerId) => {
//     if (window.confirm("Are you sure you want to remove this customer?")) {
//       try {
//         await axios.delete(`http://localhost:3000/customers/${customerId}`);
//         fetchCustomers(); // Refresh the list
//       } catch (err) {
//         setError("Failed to remove customer");
//         console.error("Error:", err);
//       }
//     }
//   };

//   // Fetch customers on search
//   useEffect(() => {
//     if (searchQuery) {
//       fetchCustomers();
//     }
//   }, [searchQuery, searchCategory]);

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//         padding: "2rem",
//       }}
//     >
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-12">
//             <div
//               className="card"
//               style={{
//                 background: "rgba(255, 255, 255, 0.1)",
//                 backdropFilter: "blur(10px)",
//                 borderRadius: "20px",
//                 border: "1px solid rgba(255, 255, 255, 0.2)",
//                 boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
//               }}
//             >
//               <div className="card-body p-4">
//                 <h2 className="text-center text-white mb-4">Remove Customer</h2>

//                 {/* Search Interface */}
//                 <div className="row mb-4">
//                   <div className="col-md-4">
//                     <select
//                       className="form-control"
//                       value={searchCategory}
//                       onChange={(e) => setSearchCategory(e.target.value)}
//                       style={{
//                         background: "rgba(255, 255, 255, 0.1)",
//                         border: "1px solid rgba(255, 255, 255, 0.2)",
//                         color: "#fff",
//                         borderRadius: "10px",
//                       }}
//                     >
//                       <option value="Name">Name</option>
//                       <option value="Email">Email</option>
//                       <option value="ContactNumber">Contact Number</option>
//                     </select>
//                   </div>
//                   <div className="col-md-8">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Search..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       style={{
//                         background: "rgba(255, 255, 255, 0.1)",
//                         border: "1px solid rgba(255, 255, 255, 0.2)",
//                         color: "#fff",
//                         borderRadius: "10px",
//                       }}
//                     />
//                   </div>
//                 </div>

//                 {/* Results Table */}
//                 {loading ? (
//                   <div className="text-center text-white">Loading...</div>
//                 ) : error ? (
//                   <div className="text-center text-danger">{error}</div>
//                 ) : (
//                   <div className="table-responsive">
//                     <table className="table table-hover">
//                       <thead>
//                         <tr className="text-white">
//                           <th>Image</th>
//                           <th>Name</th>
//                           <th>Email</th>
//                           <th>Contact Number</th>
//                           <th>Total Spending</th>
//                           <th>Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {customers.map((customer) => (
//                           <tr key={customer.id} className="text-white">
//                             <td>
//                               <img
//                                 src={customer.Image}
//                                 alt={customer.Name}
//                                 style={{
//                                   width: "40px",
//                                   height: "40px",
//                                   borderRadius: "50%",
//                                   objectFit: "cover",
//                                 }}
//                               />
//                             </td>
//                             <td>{customer.Name}</td>
//                             <td>{customer.Email}</td>
//                             <td>{customer.ContactNumber}</td>
//                             <td>${customer.TotalSpending}</td>
//                             <td>
//                               <button
//                                 className="btn btn-danger btn-sm"
//                                 onClick={() => handleRemoveCustomer(customer.id)}
//                                 style={{
//                                   background: "rgba(220, 53, 69, 0.8)",
//                                   border: "none",
//                                 }}
//                               >
//                                 Remove
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RemoveCustomer;

import React, { useState } from 'react';

const CustomerPage = () => {
    const [category, setCategory] = useState('Name');
    const [query, setQuery] = useState('');
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/customers/search?category=${category}&query=${query}`);
            
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error('Error fetching customers:', error);
            alert('Failed to fetch customers. Please check your input or try again later.');
        } finally {
            setLoading(false);
        }
    };
    

    const deleteCustomer = async (id) => {
        if (!window.confirm('Are you sure you want to delete this customer?')) return;

        try {
            const response = await fetch(`/api/customers/${id}`, { method: 'DELETE' });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                setCustomers(customers.filter((customer) => customer.id !== id));
            } else {
                console.error(data.error);
                alert(data.error);
            }
        } catch (error) {
            console.error('Error deleting customer:', error);
            alert('An error occurred while deleting the customer.');
        }
    };

    return (
        <div>
            <h1>Customer Management</h1>
            <div style={{ marginBottom: '20px' }}>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Name">Name</option>
                    <option value="Email">Email</option>
                    <option value="ContactNumber">Contact Number</option>
                </select>
                <input
                    type="text"
                    value={query}
                    placeholder="Search..."
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={fetchCustomers} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.length > 0 ? (
                        customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.Name}</td>
                                <td>{customer.Email}</td>
                                <td>{customer.ContactNumber}</td>
                                <td>
                                    <button onClick={() => deleteCustomer(customer.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No customers found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerPage;
