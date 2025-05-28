const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("success") === "true") {
    const container = document.querySelector(".form-box");
    const successMessage = document.createElement("div");
    successMessage.textContent = "User successfully registered!";
    successMessage.style.backgroundColor = "#4CAF50"; /* Green background */
    successMessage.style.color = "white"; /* White text */
    successMessage.style.padding = "10px";
    successMessage.style.marginBottom = "15px";
    successMessage.style.textAlign = "center";
    successMessage.style.borderRadius = "5px";
    container.prepend(successMessage); // Add the message at the top of the form
  }