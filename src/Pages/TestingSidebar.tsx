import React, { useState } from 'react'
import { ROLES, type Role } from '../lib/roles';
import { SideBar } from '../components/Layout/Sidebar';


function Testsidebar() {
  const [role, setRole] = useState<Role>(ROLES.ADMIN);
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as Role);
  }
  return (
    <>
      <div className='flex gap-16'>

        <SideBar role={role} />
        <div>
          <h1>Role Based Sidebar (Test)</h1>

          <select value={role} onChange={handleRoleChange}>
            <option value={ROLES.ADMIN}>Admin</option>
            <option value={ROLES.USER}>User</option>
            <option value={ROLES.STAFF}>Staff</option>
          </select>
        </div>




      </div>
    </>
  )
}

export default Testsidebar