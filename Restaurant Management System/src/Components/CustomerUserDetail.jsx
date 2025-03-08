import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const CustomerUserDetail = () => {
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const customerId = Cookies.get("id");
    if (customerId) {
      fetch(`http://localhost:3000/customers/${customerId}`)
        .then((response) => response.json())
        .then((data) => {
          setCustomer(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching customer:", err);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="search-container">
      <div className="background-overlay">
        <div className="content-wrapper">
          <div className="search-header">
            <h1>Customer Details</h1>
            <p className="subtitle">Details of the selected customer</p>
          </div>

          {isLoading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading customer details...</p>
            </div>
          ) : customer ? (
            <div className="customer-card">
              <div className="card-header">
                <div className="profile-image">
                  {customer.ProfilePicture ? (
                    <img src={customer.ProfilePicture} alt={customer.Name} />
                  ) : (
                    <div className="profile-placeholder">
                      {customer.Name.charAt(0)}
                    </div>
                  )}
                </div>
                <h2>{customer.Name}</h2>
              </div>
              <div className="card-content">
                {customer.Email && (
                  <div className="info-row">
                    <span className="icon">📧</span>
                    <span>{customer.Email}</span>
                  </div>
                )}
                {customer.ContactNumber && (
                  <div className="info-row">
                    <span className="icon">📱</span>
                    <span>{customer.ContactNumber}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <p>No customer details found.</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .search-container {
          min-height: 100vh;
          background: #000000;
          background-image: 
            linear-gradient(45deg, rgba(26, 32, 44, 0.6) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(26, 32, 44, 0.6) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(26, 32, 44, 0.6) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(26, 32, 44, 0.6) 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
          position: relative;
        }

        .background-overlay {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.97) 0%, rgba(0, 0, 0, 0.95) 100%);
          min-height: 100vh;
          padding: 2rem;
        }

        .content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .search-header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .search-header h1 {
          font-size: 2.8rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .subtitle {
          color: #a0aec0;
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        .customer-card {
          background: rgba(26, 32, 44, 0.8);
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          border: 1px solid #2d3748;
          backdrop-filter: blur(10px);
        }

        .customer-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
          background: rgba(26, 32, 44, 0.9);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .profile-image {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
        }

        .profile-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #4299e1, #667eea);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .card-header h2 {
          font-size: 1.25rem;
          color: #ffffff;
          font-weight: 600;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          color: #a0aec0;
        }

        .icon {
          font-size: 1.2rem;
        }

        .loading-state {
          text-align: center;
          padding: 3rem;
          color: #a0aec0;
        }

        .loading-spinner {
          border: 4px solid #2d3748;
          border-top: 4px solid #4299e1;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #a0aec0;
        }
      `}</style>
    </div>
  );
};

export default CustomerUserDetail;

// import React, { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import './CustomerUserDetail.css'; // Move styles to a separate CSS file

// const CustomerUserDetail = () => {
//   const [customer, setCustomer] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const customerId = Cookies.get("id");
//     if (customerId) {
//       fetch(`http://localhost:3000/customers/${customerId}`)
//         .then((response) => response.json())
//         .then((data) => {
//           // Log the data to see what we're receiving
//           console.log("Received customer data:", data);
          
//           // Transform the data to match the expected structure
//           const transformedData = {
//             ...data,
//             ProfilePicture: data.ProfileImage ? `http://localhost:3000/uploads/${data.ProfileImage}` : null,
//             Name: data.Name || 'Unknown',
//             Email: data.Email || '',
//             ContactNumber: data.Phone || '', // Adjust if your field name is different
//           };
          
//           setCustomer(transformedData);
//           setIsLoading(false);
//         })
//         .catch((err) => {
//           console.error("Error fetching customer:", err);
//           setIsLoading(false);
//         });
//     } else {
//       setIsLoading(false);
//     }
//   }, []);

//   return (
//     <div className="search-container">
//       <div className="background-overlay">
//         <div className="content-wrapper">
//           <div className="search-header">
//             <h1>Customer Profile</h1>
//             <p className="subtitle">Your account details</p>
//           </div>

//           {isLoading ? (
//             <div className="loading-state">
//               <div className="loading-spinner"></div>
//               <p>Loading customer details...</p>
//             </div>
//           ) : customer ? (
//             <div className="customer-detail-card">
//               <div className="card-header">
//                 <div className="profile-image-large">
//                   {customer.ProfilePicture ? (
//                     <img 
//                       src={customer.ProfilePicture} 
//                       alt={customer.Name}
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = '/default-avatar.png'; // Provide a default image
//                       }}
//                     />
//                   ) : (
//                     <div className="profile-placeholder">
//                       {customer.Name.charAt(0)}
//                     </div>
//                   )}
//                 </div>
//                 <div className="customer-info-header">
//                   <h2>{customer.Name}</h2>
//                   <span className="customer-id">ID: {customer.CustomerID}</span>
//                 </div>
//               </div>

//               <div className="card-content">
//                 <div className="info-section">
//                   <h3>Contact Information</h3>
//                   {customer.Email && (
//                     <div className="info-row">
//                       <span className="icon">📧</span>
//                       <span className="label">Email:</span>
//                       <span className="value">{customer.Email}</span>
//                     </div>
//                   )}
//                   {customer.ContactNumber && (
//                     <div className="info-row">
//                       <span className="icon">📱</span>
//                       <span className="label">Phone:</span>
//                       <span className="value">{customer.ContactNumber}</span>
//                     </div>
//                   )}
//                   {customer.Address && (
//                     <div className="info-row">
//                       <span className="icon">📍</span>
//                       <span className="label">Address:</span>
//                       <span className="value">{customer.Address}</span>
//                     </div>
//                   )}
//                 </div>

//                 <div className="info-section">
//                   <h3>Account Details</h3>
//                   <div className="info-row">
//                     <span className="icon">🎯</span>
//                     <span className="label">Status:</span>
//                     <span className="value status-badge">
//                       {customer.IsPremium ? 'Premium Member' : 'Regular Member'}
//                     </span>
//                   </div>
//                   <div className="info-row">
//                     <span className="icon">📅</span>
//                     <span className="label">Member Since:</span>
//                     <span className="value">
//                       {new Date(customer.JoinDate).toLocaleDateString()}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="empty-state">
//               <p>No customer details found.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerUserDetail;