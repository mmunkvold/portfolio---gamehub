const form = document.querySelector(".login-form");

const email = document.querySelector("#email");
const emailError = document.querySelector("#email + div.error");

const showSuccessMessage = document.querySelector(".success");

function validateForm(event) {
  event.preventDefault();

  if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (validateEmail(email.value) === true) {
    showSuccessMessage.style.display = "block";
    form.style.display = "none";
  }
  /* console.log("something wrong with the login..."); */
}

form.addEventListener("submit", validateForm);

function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}
