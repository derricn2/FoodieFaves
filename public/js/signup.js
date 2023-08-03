// function to handle form submission for user signup
document.getElementById("signupForm").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // perform AJAX request to sign up the user using Fetch API
    fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // handle success response and update the UI accordingly
        console.log("User signed up successfully:", data);
        window.location.href = "/home";
      })
      .catch((error) => {
        // handle error and update the UI accordingly
        console.error("Error signing up:", error);
      });
  });
  