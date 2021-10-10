const signupForm = document.querySelector(".signup-form");

const fullname = document.querySelector("#fullname");
const fullnameError = document.querySelector("#fullname + div.error");

const email = document.querySelector("#email");
const emailError = document.querySelector("#email + div.error");

const password = document.querySelector("#password");
const passwordError = document.querySelector("#password + div.error");

const passwordMatch = document.querySelector("#repeatpassword");
const passwordMatchError = document.querySelector("#repeatpassword + div.error");

const showSuccessMessage = document.querySelector(".success");

function validateForm(event) {
  event.preventDefault();

  if (checkLength(fullname.value, 3) === true) {
    fullnameError.style.display = "none";
  } else {
    fullnameError.style.display = "block";
  }

  if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (checkLength(password.value, 7) === true) {
    passwordError.style.display = "none";
  } else {
    passwordError.style.display = "block";
  }

  if (checkMatch(passwordMatch.value, password.value) === true) {
    passwordMatchError.style.display = "none";
    console.log("matcher");
  } else {
    passwordMatchError.style.display = "block";
    console.log("matcher ikke");
  }

  if (
    checkLength(fullname.value, 3) &&
    validateEmail(email.value) &&
    checkLength(password.value, 7) &&
    checkMatch(passwordMatch.value, password.value) === true
  ) {
    showSuccessMessage.style.display = "block";
    signupForm.style.display = "none";
  } else {
    /* console.log("something wrong with the form..."); */
  }
}

signupForm.addEventListener("submit", validateForm);

// The functions used in the function above:

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

function checkMatch(value1, value2) {
  if (JSON.stringify(value1) === JSON.stringify(value2)) {
    return true;
  } else {
    return false;
  }
}
