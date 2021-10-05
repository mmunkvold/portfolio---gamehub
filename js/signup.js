const signupForm = document.querySelector(".signup-form");

const fullname = document.querySelector("#fullname");
const fullnameError = document.querySelector("#fullname + div.error");

const email = document.querySelector("#email");
const emailError = document.querySelector("#email + div.error");

const password = document.querySelector("#password");
const passwordError = document.querySelector("#password + div.error");

const passwordMatch = document.querySelector("#repeatpassword");
const passwordMatchError = document.querySelector("#repeatpassword + div.error");

/* const number = document.querySelector("#birthday");
const numberError = document.querySelector(".number-error"); */

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

  /* if (validateNumber(number.value) === true) {
    numberError.style.display = "none";
    console.log("riktig lengde");
  } else {
    numberError.style.display = "block";
    console.log("for lang");
  } */

  if (
    checkLength(fullname.value, 3) &&
    validateEmail(email.value) &&
    checkLength(password.value, 7) &&
    checkMatch(passwordMatch.value, password.value) === /* && validateNumber(number.value) */ true
  ) {
    showSuccessMessage.style.display = "block";
    signupForm.style.display = "none";
  } else {
    /* console.log("something wrong with the form..."); */
  }
}

signupForm.addEventListener("submit", validateForm);

// the functions used in the function above:

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

/* function validateNumber(number) {
  const regEx = /^(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])(19|20)\\d\\d$/;
  const patternMatches = regEx.test(number);
  return patternMatches;
} */
