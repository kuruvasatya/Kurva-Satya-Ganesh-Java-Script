class Authentication {
  constructor() {
    this.user = new Map();
    this.init();
    this.submit_btn = this.documentHelper("submit_btn");
    this.switch_action = this.documentHelper("switch_action");
    this.show_rules = this.documentHelper("show_rules");
    this.username_field = this.documentHelper("username");
    this.password_field = this.documentHelper("password");
  }
  init() {
    this.user.set("sushant@gmail.com", "Epam123");
    this.user.set("alex@gmail.com", "123Epam");
    this.user.set("arjun@gmail.com", "Password1");
  }
  checkValidEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
  checkPassword(password) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password);
  }
  submitHandler() {
    const username = this.username_field.value;
    const password = this.password_field.value;
    if (username.length == 0 || password.length == 0) {
      swal({
        text: "No input provided"
      });
    } else if (username.length > 0 && password.length > 0) {
      const type = this.submit_btn.getAttribute("data-actionType");
      if (type == 1)
        this.onLogin({
          username,
          password,
        });
      else if (type == 2) {
        this.onRegister({
          username,
          password,
        });
      }
    } else {
      swal({
        text: "Error Occured"
      });
    }
  }
  onLogin(payload) {
    const validUser = this.user.has(payload.username);
    if (!validUser) {
      swal({
        text: "User does not exist"
      });
    } else {
      if (this.user.get(payload.username) == payload.password) {
        swal({
          text: "Welcome back to EPAM Systems"
        });
      } else swal({
        text: "Wrong Credentials"
      });
    }
    this.resetField();
  }
  onRegister(payload) {
    if (this.user.has(payload.username)) {
      swal({
        text: "User already exists"
      });
    } else {
      if (
        this.checkValidEmail(payload.username) &&
        this.checkPassword(payload.password)
      ) {
        this.user.set(payload.username, payload.password);
        swal({
          text: "Registration done!! \nIt's so exciting to have you on board. You may proceed with sign in now",
        });
      } else {
        if (
          !this.checkValidEmail(payload.username) &&
          !this.checkPassword(payload.password)
        )
          swal({
            text: "Wrong email and password"
          });
        else if (!this.checkValidEmail(payload.username))
          swal({
            text: "Invalid Email"
          });
        else if (!this.checkPassword(payload.password))
          swal({
            text: "Password does not match criteria"
          });
      }
    }
    this.resetField();
  }
  switchHandler() {
    const type = document
      .getElementById("submit_btn")
      .getAttribute("data-actionType");
    if (type == 1) {
      this.submit_btn.setAttribute("data-actionType", 2);
      this.submit_btn.innerText = "REGISTER";
      this.switch_action.innerText = "Sign in";
    } else if (type == 2) {
      this.submit_btn.setAttribute("data-actionType", 1);
      this.submit_btn.innerText = "SIGN IN";
      this.switch_action.innerText = "Register";
    }
    this.resetField();
    this.documentHelper("header_text").innerText = this.submit_btn.innerText;
  }
  resetField() {
    this.username_field.value = "";
    this.password_field.value = "";
  }
  documentHelper(arg) {
    return document.getElementById(arg);
  }
}

const authHandler = new Authentication();
const authSwitch = () => authHandler.switchHandler();
const submit = () => authHandler.submitHandler();

const showRules = () => {
  swal({
    text: "Password should be 6-20 characters long and contain at least one numeric digit, one uppercase and one lowercase letter",
  });
};