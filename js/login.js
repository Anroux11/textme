// function validateLogin(username, password) {
//   const usernameError = validateUsername(username);
//   const passwordError = validatePassword(password);
//   if (usernameError || passwordError) {
//     if (usernameError) {
//       alert("Username Error: " + usernameError);
//     }
//     if (passwordError) {
//       alert("Password Error: " + passwordError);
//     }
//     return false;
//   }
//   return true;
// }

// function validateUsername(username) {
//   if (username.length < 5 || username.length > 15) {
//     return "Username must be between 6 and 16 characters.";
//   } else {
//     return false;
//   }
// }

// function validatePassword(password) {
//   if (password.length < 8) {
//     return "Password must be at least 8 characters.";
//   } else {
//     return false; // No error
//   }
// }

function login() {
  const usernameInput = document.getElementById("username").value;
  const passwordInput = document.getElementById("password").value;

  let users = localStorage.getItem("users");
  let userFound = false;

  if (users) {
    let userList = JSON.parse(users);

    for (let i = 0; i < userList.length; i++) {
      let _user = userList[i];
      if (_user.username == usernameInput) {
        userFound = true;
        if (_user.password == passwordInput) {
          localStorage.setItem("me", usernameInput);
          window.location.href = "../pages/chat.html";
        } else {
          alert("Username and password does not match");
        }
      }
    }

    if (!userFound) {
      alert("This user has not registered yet");
    }
  } else {
    alert("There are no users registered");
  }
}
