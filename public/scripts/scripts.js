document.getElementById("contact-form").onsubmit = function () {
  // clears errors that were fixed
  clearErrors();
  let isValid = true;

  // validate first name
  let fname = document.getElementById("fname").value;
  if (fname === "") {
    document.getElementById("fname-err").style.display = "inline";
    isValid = false;
  }

  // validate last name
  let lname = document.getElementById("lname").value;
  if (lname === "") {
    document.getElementById("lname-err").style.display = "inline";
    isValid = false;
  }

  // email optional but validates format if something is in it
  let email = document.getElementById("email").value;
  // regex for anything but white space and @ in format of email
  let emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email !== "" && !email.match(emailValidate)) {
    document.getElementById("email-err").style.display = "inline";
    isValid = false;
  }

  // validates email if mailing list is selected and shows what format
  let checkbox = document.getElementById("checkbox");
  if (checkbox.checked && email === "") {
    document.getElementById("emptyEmail-err").style.display = "inline";
    isValid = false;
  }
  if (checkbox.checked) {
    document.getElementById("emailFormat").style.display = "inline";
  }

  // validates linkedIn URL if something is typed
  let linkedin = document.getElementById("linkedin").value;
  let linkedinValidator = /^https:\/\/linkedin.com\/in\//;
  if (linkedin !== "" && !linkedin.match(linkedinValidator)) {
    document.getElementById("linkedin-err").style.display = "inline";
    isValid = false;
  }

  // How did we meet validator
  let meetSelect = document.getElementById("meet").value;
  let meetOther = document.getElementById("meet-specify").value;
  if (meetSelect === "none") {
    document.getElementById("meet-err").style.display = "inline";
    isValid = false;
  }
  // if (meetSelect === "other") {
  //   document.getElementById("meetOther").style.display = "flex";
  //   document.getElementById("meet-select").style.width = "47%";
  // }

  // how did we meet text box validator
  if (meetSelect === "other" && meetOther === "") {
    document.getElementById("meetOther-err").style.display = "inline";
    isValid = false;
  }
  // let htmlRadio = document.getElementById("html");
  // let textRadio = document.getElementById("text");
  // if (!htmlRadio.checked && !textRadio.checked) {
  //   document.getElementById("emailFormat-err").style.display = "inline";
  //   isValid = false;
  // }

  // prevents form from submitting if any validators dont pass
  return isValid;
};

// function that clears errors that were fixed
function clearErrors() {
  let errors = document.getElementsByClassName("err");
  for (let i = 0; i < errors.length; i++) {
    errors[i].style.display = "none";
  }
}

// function that will show html and text radio button when checkbox is checked
document.getElementById("checkbox").addEventListener("change", function () {
  if (this.checked) {
    document.getElementById("emailFormat").style.display = "inline";
    htmlRadio = document.getElementById("html").checked = true;
  } else {
    document.getElementById("emailFormat").style.display = "none";
  }
});

// function that will display others text area if Others option is selected in drop down
document.getElementById("meet").addEventListener("change", function () {
  if (this.value === "other") {
    document.getElementById("meetOther").style.display = "flex";
    document.getElementById("meet-select").style.width = "47%";
  } else {
    document.getElementById("meetOther").style.display = "none";
    document.getElementById("meet-select").style.width = "100%";
  }
});
