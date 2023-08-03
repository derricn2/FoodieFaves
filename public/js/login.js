// function to handle form submission for user login
document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // perform AJAX request to log in the user using fetch API
    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          // if the response status is not ok (e.g., 400 or 500 error), throw an error
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // handle success response and update the UI accordingly
        console.log("User logged in successfully:", data);
        window.location.href = "/recipes";
      })
      .catch((error) => {
        // handle error and update the UI accordingly
        console.error("Error logging in:", error);
        // display an error message on the page to inform the user
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.textContent = "Invalid username or password. Please try again.";
      });
  });