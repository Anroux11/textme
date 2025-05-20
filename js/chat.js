function onload() {
  loggedInUser();
  getContactList();
}
function loggedInUser() {
  const storedUser = localStorage.getItem("me");

  setLoggedInUser(storedUser);
}

function setLoggedInUser(user) {
  const name = document.getElementById("name");
  name.innerHTML = `${user}`;
}

function getContactList() {
  const name = localStorage.getItem("me");
  const storedContacts = localStorage.getItem("users");
  let userList = JSON.parse(storedContacts);
  const contacts = document.getElementById("contacts");
  for (let i = 0; i < userList.length; i++) {
    let username = userList[i].username;
    if (username != name) {
      var div = document.createElement("div");
      div.innerHTML =
        `<div class='contact-name' id='${username}' onclick='setSelectedUser(${username})'>` +
        username +
        `</div>`;
      contacts.appendChild(div);
    }
  }
}

function setSelectedUser(username) {
  let contacts = document.querySelectorAll(".active");
  for (let i = 0; i < contacts.length; i++) {
    contacts[i].classList.remove("active");
  }
  let element = document.getElementById(`${username.innerText}`);
  element.classList.add("active");

  getChatHistory(username.innerText);
}

function sendMessage() {
  const messageInput = document.getElementById("user-message").value;
  const loggedInUser = localStorage.getItem("me");
  const selectedUser = getSelectedUser();

  const message = {
    from: loggedInUser,
    to: selectedUser,
    date: new Date().toISOString(),
    message: messageInput,
  };

  const messages = localStorage.getItem("messages");

  if (messages != null) {
    let _messages = JSON.parse(messages);
    _messages.push(message);
    localStorage.setItem("messages", JSON.stringify(_messages));
  } else {
    let _messages = [message];
    localStorage.setItem("messages", JSON.stringify(_messages));
  }

  document.getElementById("user-message").value = "";

  getChatHistory(selectedUser);
}

function getSelectedUser() {
  const user = document.querySelectorAll(".active")[0];
  return user.innerHTML;
}

function getChatHistory(username) {
  // Clear history - so that we do not display all messages
  document.getElementById("chatmessage").innerHTML = "";

  // Get and display the other messages
  const msgElement = document.getElementById("chatmessage");
  const messages = localStorage.getItem("messages");
  const messageList = JSON.parse(messages); // this is all messages
  let chatHistory = [];

  // loop through all messages and find the relevant ones
  for (let i = 0; i < messageList.length; i++) {
    let msgObj = messageList[i];
    if (msgObj.to == username || msgObj.from == username) {
      chatHistory.push(msgObj);
    }
  }

  for (let i = 0; i < chatHistory.length; i++) {
    let msgObj = chatHistory[i];
    var div = document.createElement("div");
    div.innerHTML =
      `<span class='message'>
      <p >` +
      msgObj.message +
      `</p><p class=''>` +
      msgObj.date +
      `</p>
      </span>`;
    msgElement.appendChild(div);
  }
}

function logout() {
  localStorage.removeItem("me");
  window.location.href = "/pages/login.html";
}
