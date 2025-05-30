const validateRegistration = (username, password) => {
  const usernameError = validateUsername(username);
  const passwordError = validatePassword(password);
  if (usernameError || passwordError) {
    if (usernameError) {
      alert("Username Error: " + usernameError);
      return false;
    }
    if (passwordError) {
      alert("Password Error: " + passwordError);
      return false;
    }
  }
  return true;
};

const validateUsername = (username) => {
  if (username.length < 5 || username.length > 15) {
    return "Username must be between 6 and 16 characters.";
  } else {
    return false;
  }
};

const validatePassword = (password) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  } else {
    return false; // No error
  }
};

const register = () => {
  let users = [];
  const usernameInput = document.getElementById("username").value;
  const passwordInput = document.getElementById("password").value;

  const user = {
    username: usernameInput,
    password: encryptPassword(passwordInput, "my-secret-key"),
    isTyping: false,
    status: false,
  };

  const validated = validateRegistration(usernameInput, passwordInput);
  if (validated) {
    users = localStorage.getItem("users");
    if (users != null) {
      let userList = JSON.parse(users);
      let userExists = false;

      for (let i = 0; i < userList.length; i++) {
        let _user = userList[i].username;
        if (_user == usernameInput) {
          userExists = true;
          alert("User already exists");
          break;
        }
      }

      if (!userExists) {
        userList.push(user);
        localStorage.setItem("users", JSON.stringify(userList));
        window.location.href = "../pages/login.html";
      }
    } else {
      let userList = [user];
      localStorage.setItem("users", JSON.stringify(userList));
      window.location.href = "../pages/login.html";
    }
  } else {
    alert("Registration form is not valid");
  }
};

function encryptPassword(password, key) {
  try {
    const ciphertext = CryptoJS.AES.encrypt(password, key).toString();
    return ciphertext;
  } catch (e) {
    console.error("Encryption error:", e);
    return null;
  }
}
