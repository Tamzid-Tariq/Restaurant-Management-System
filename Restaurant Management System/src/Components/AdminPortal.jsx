import React from "react";
import styled from "styled-components";

const AdminPortal = () => {
  return (
    <div>AdminPortal</div>
    // <AdminPortalContainer>
    //   <PageTitle>Admin Portal</PageTitle>

    //   <Sidebar>
    //     <ul>
    //       <li>
    //         <a href="/add-admin">Add a new Admin</a>
    //       </li>
    //       <li>
    //         <a href="/remove-admin">Remove an Admin</a>
    //       </li>
    //     </ul>
    //   </Sidebar>
    // </AdminPortalContainer>
  );
};

export default AdminPortal;

const AdminPortalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`
const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Sidebar = styled.div`
  width: 200px;
  margin-right: 20px;

  ul {
    list-style-type: none;
    padding: 0;
  }

  ul li {
    margin-bottom: 10px;
  }

  ul li a {
    text-decoration: none;
    color: #000;
    font-weight: bold;
  }
`;
