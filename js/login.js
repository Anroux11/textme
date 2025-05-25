const login = () => {
  const usernameInput = document.getElementById("username").value;
  const passwordInput = document.getElementById("password").value;

  let users = localStorage.getItem("users");
  let userFound = false;

  if (users) {
    let hasUser = false;
    let userList = JSON.parse(users);

    for (let i = 0; i < userList.length; i++) {
      let _user = userList[i];
      if (_user.username == usernameInput) {
        userFound = true;
        const decryptedPassword = decryptPassword(
          _user.password,
          "my-secret-key"
        );
        if (decryptedPassword == passwordInput) {
          sessionStorage.setItem("me", usernameInput);
          userList[i].status = true;
          hasUser = true;
        } else {
          displayAlert("Username and password does not match");
        }
      }
    }

    if (hasUser) {
      displayAlert("User is authenticated");
      localStorage.setItem("users", JSON.stringify(userList));
      window.location.href = "../pages/chat.html";
    }

    if (!userFound) {
      displayAlert("This user has not registered yet");
    }
  } else {
    displayAlert("There are no users registered");
  }
};

function decryptPassword(ciphertext, key) {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    return originalPassword;
  } catch (e) {
    console.error("Decryption error:", e);
    return null;
  }
}

const loginAlertModal = document.getElementById("loginAlertModal");

const displayAlert = (message) => {
  let alertModal = document.getElementById("login-alert-modal");
  alertModal.innerHTML = message;

  loginAlertModal.style.display = "block";

  setTimeout(hideAlert(), 500);
};

const hideAlert = () => {
  loginAlertModal.style.display = "none";
};
