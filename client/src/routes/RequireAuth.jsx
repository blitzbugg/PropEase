import React from 'react'

function RequireAuth() {

    const {currentUser} = useContext(AuthContext);
    if (!currentUser) {
        navigate("/login");
    }
  return (
    <>
      
      </>
    
  )
}

export default RequireAuth