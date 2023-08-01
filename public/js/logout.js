// function to handle the logout process
const logout = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // redirect the user to the homepage after successful logout
        window.location.replace('/');
      } else {
        // handle any errors, e.g., show an error message to the user
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  // event listener to call the logout function when the logout button is clicked
  document.getElementById('logoutBtn').addEventListener('click', logout);
  