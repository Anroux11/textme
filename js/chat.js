window.addEventListener("storage", (event) => {
  if (event.key === "messages") {
    const selectedUser = getSelectedUser();
    getChatHistory(selectedUser);
  }

  if (event.key === "users") {
    const storedContacts = localStorage.getItem("users");
    let userList = JSON.parse(storedContacts);
    for (let i = 0; i < userList.length; i++) {
      let userObj = userList[i];
      let contacts = document.getElementById("contacts").children;
      for (let j = 0; j < contacts.length; j++) {
        if (userObj.isTyping) {
          if (contacts[j].innerText == userObj.username) {
            for (let k = 0; k < contacts[j].children; k++) {
              contacts[j].children[k].children[0].children[1].innerText =
                "is typing...";
            }
          }
        }
      }
    }
  }
});

const onload = () => {
  loggedInUser();
  getContactList();
  getGroupList();
  setTimeout(getChatHistory(), 300);
};

const loggedInUser = () => {
  const storedUser = sessionStorage.getItem("me");

  setLoggedInUser(storedUser);
};

const setLoggedInUser = (user) => {
  const name = document.getElementById("name");
  name.innerHTML = `${user}`;
};

const getContactList = () => {
  loadUserChat();
  const name = sessionStorage.getItem("me");
  const storedContacts = localStorage.getItem("users");
  let userList = JSON.parse(storedContacts);
  const contacts = document.getElementById("contacts");
  for (let i = 0; i < userList.length; i++) {
    let userObj = userList[i];
    let username = userObj.username;
    if (username != name) {
      var div = document.createElement("div");
      let isTyping = userObj.isTyping ? "is typing..." : "";

      if (userObj.status) {
        div.innerHTML =
          `<div class="contact-name" id='${username}' onclick="setSelectedUser(${username})">` +
          `<div>` +
          `<span>${username}</span>` +
          `<span id="user-typing" class="online"> </span>` +
          `</div>` +
          `<div class="typing">${isTyping}</div>` +
          `</div>`;
      } else {
        div.innerHTML =
          `<div class="contact-name" id='${username}' onclick="setSelectedUser(${username})">` +
          `<div>` +
          `<span>${username}</span>` +
          `<span id="user-typing" class="offline"> </span>` +
          `</div>` +
          `<div class="typing">${isTyping}</div>` +
          `</div>`;
      }
      contacts.appendChild(div);
    }
  }
};

const setSelectedUser = (username) => {
  let contacts = document.querySelectorAll(".active");
  for (let i = 0; i < contacts.length; i++) {
    contacts[i].classList.remove("active");
  }
  let element = document.getElementById(
    `${username.firstChild.firstChild.innerText}`
  );
  element.classList.add("active");

  getChatHistory(username.firstChild.firstChild.innerText);
};

const sendMessage = () => {
  let sending = localStorage.getItem("sending");
  if (sending == "user") {
    sendUserMessage();
  } else if (sending == "group") {
    sendGroupMessage();
  }
};

const sendUserMessage = () => {
  const messageInput = document.getElementById("user-message").value;
  const loggedInUser = sessionStorage.getItem("me");
  const selectedUser = getSelectedUser();

  const message = {
    from: loggedInUser,
    to: selectedUser,
    date: formatDate(),
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

  setIsTyping(false);

  getChatHistory(selectedUser);
};

const getSelectedUser = () => {
  const user = document.querySelectorAll(".active")[0];
  return user.firstChild.innerText;
};

const getChatHistory = (username) => {
  // Clear history - so that we do not display all messages
  document.getElementById("chatmessage").innerHTML = "";

  // Get and display the other messages
  const msgElement = document.getElementById("chatmessage");
  const messages = localStorage.getItem("messages");
  if (messages != null) {
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
      div.style.display = "inline-block";
      div.style.width = "-webkit-fill-available";

      if (msgObj.from == username) {
        div.innerHTML =
          `<span class='message from'>
        <p >` +
          msgObj.message +
          `</p><p class='date'>` +
          msgObj.date +
          `</p>
        </span>`;
        msgElement.appendChild(div);
      } else {
        div.innerHTML =
          `<span class='message to'>
        <p >` +
          msgObj.message +
          `</p><p class='date'>` +
          msgObj.date +
          `</p>
        </span>`;
        msgElement.appendChild(div);
      }
    }
  }
};

const addGroupChat = () => {
  document.getElementById("group-name").value = "";
  document.getElementById("users-group").innerHTML = "";

  const storedContacts = localStorage.getItem("users");
  let userList = JSON.parse(storedContacts);
  const users = document.getElementById("users-group");

  for (let i = 0; i < userList.length; i++) {
    let username = userList[i].username;
    var div = document.createElement("div");

    div.innerHTML =
      `<input type="checkbox" id="${username}" name="groupUser" value="${username}">` +
      `<label for="${username}">${username}</label><br>`;
    users.appendChild(div);
  }
};

const logout = () => {
  const name = sessionStorage.getItem("me");
  const storedContacts = localStorage.getItem("users");
  let userList = JSON.parse(storedContacts);
  for (let i = 0; i < userList.length; i++) {
    let userObj = userList[i];
    if (userObj.username == name) {
      userList[i].status = false;
      break;
    }
  }

  localStorage.setItem("users", JSON.stringify(userList));
  sessionStorage.removeItem("me");
  window.location.href = "../pages/login.html";
};

const isTyping = () => {
  const val = document.getElementById("user-message").value;
  if (val.length > 0) {
    setIsTyping(true);
  } else {
    setIsTyping(false);
  }
};

const setIsTyping = (bool) => {
  const name = sessionStorage.getItem("me");
  const storedContacts = localStorage.getItem("users");
  let userList = JSON.parse(storedContacts);
  for (let i = 0; i < userList.length; i++) {
    let userObj = userList[i];
    if (userObj.username == name) {
      userList[i].isTyping = bool;

      localStorage.setItem("users", JSON.stringify(userList));

      let contacts = document.getElementById("contacts").children;
      for (let j = 0; j < contacts.length; j++) {
        if (userList[i].isTyping) {
          if (contacts[j].innerText == userObj.username) {
            for (let k = 0; k < contacts[j].children; k++) {
              contacts[j].children[k].children[0].children[1].innerText =
                "is typing...";
            }
          }
        }
      }
      break;
    }
  }
};

const loadUserChat = () => {
  // Clear history - so that we do not display all messages
  document.getElementById("chatmessage").innerHTML = "";
  document.getElementById("groups").style.display = "none";
  document.getElementById("contacts").style.display = "block";
  document.getElementById("add-group-btn").classList.remove("g-active");
  document.getElementById("add-contact-btn").classList.add("g-active");
  localStorage.setItem("sending", "user");
};

const loadGroupChat = () => {
  // Clear history - so that we do not display all messages
  document.getElementById("chatmessage").innerHTML = "";
  document.getElementById("contacts").style.display = "none";
  document.getElementById("groups").style.display = "block";
  document.getElementById("add-group-btn").classList.add("g-active");
  document.getElementById("add-contact-btn").classList.remove("g-active");
  localStorage.setItem("sending", "group");
};

const saveGroup = () => {
  const groups = localStorage.getItem("groups");
  const hasGroups = groups ? true : false;

  const groupName = document.getElementById("group-name").value;
  const checkboxes = document.querySelectorAll(
    'input[name="groupUser"]:checked'
  );
  const checkedValues = Array.from(checkboxes).map(
    (checkbox) => checkbox.value
  );

  if (hasGroups) {
    let groupList = JSON.parse(groups);
    let group = {
      name: groupName,
      users: checkedValues,
      messages: [],
    };

    groupList.push(group);

    localStorage.setItem("groups", JSON.stringify(groupList));
  } else {
    let group = {
      name: groupName,
      users: checkedValues,
      messages: [],
    };

    localStorage.setItem("groups", JSON.stringify([group]));
  }

  document.getElementById("group-name").value = "";
  groupModal.style.display = "none";
  document.getElementById("users-group").innerHTML = "";

  getGroupList();
};

const getGroupList = () => {
  loadGroupChat();
  const name = sessionStorage.getItem("me");
  const storedGroups = localStorage.getItem("groups");
  if (storedGroups != null) {
    let groupList = JSON.parse(storedGroups);
    const groups = document.getElementById("groups");
    let myGroups = [];

    for (let i = 0; i < groupList.length; i++) {
      let groupObj = groupList[i];
      let groupUsers = groupObj.users;

      if (groupUsers.includes(name)) {
        myGroups.push(groupObj);
      }
    }

    if (myGroups.length > 0) {
      for (let k = 0; k < myGroups.length; k++) {
        var div = document.createElement("div");
        let group = myGroups[k];

        div.innerHTML =
          `<div class="group-name" id='${group.name}' onclick="setSelectedGroup(${group.name})">` +
          `<div>` +
          `<span>${group.name}</span>` +
          `</div>` +
          `</div>`;
        groups.appendChild(div);
      }
    }
  }
};

const setSelectedGroup = (groupname) => {
  localStorage.setItem(
    "selectedGroup",
    groupname.firstChild.firstChild.innerText
  );
  let groups = document.querySelectorAll(".active");
  for (let i = 0; i < groups.length; i++) {
    groups[i].classList.remove("active");
  }
  let element = document.getElementById(
    `${groupname.firstChild.firstChild.innerText}`
  );
  element.classList.add("active");

  getGroupChatHistory(groupname.firstChild.firstChild.innerText);
};

const getGroupChatHistory = (groupname) => {
  // Clear history - so that we do not display all messages
  document.getElementById("chatmessage").innerHTML = "";

  // Get and display the other messages
  const msgElement = document.getElementById("chatmessage");
  const groups = localStorage.getItem("groups");
  let messages = [];

  if (groups != null) {
    let groupList = JSON.parse(groups);
    for (let i = 0; i < groupList.length; i++) {
      if (groupname == groupList[i].name) {
        messages = groupList[i].messages;
        break;
      }
    }

    if (messages != []) {
      for (let i = 0; i < messages.length; i++) {
        let msgObj = messages[i];
        var div = document.createElement("div");
        div.innerHTML =
          `<span class='message'>
        <p >` +
          msgObj.message +
          `</p><p class='date'>` +
          msgObj.date +
          `</p><p class=''>` +
          msgObj.from +
          `</p>
        </span>`;
        msgElement.appendChild(div);
      }
    }
  }
};

const sendGroupMessage = () => {
  const groupname = localStorage.getItem("selectedGroup");
  const messageInput = document.getElementById("user-message").value;
  const loggedInUser = sessionStorage.getItem("me");

  const message = {
    from: loggedInUser,
    date: formatDate(),
    message: messageInput,
  };

  const groups = localStorage.getItem("groups");
  let groupList = JSON.parse(groups);
  for (let i = 0; i < groupList.length; i++) {
    if (groupname == groupList[i].name) {
      let groupMessages = groupList[i].messages;

      if (groupMessages.length > 0) {
        groupList[i].messages.push(message);
      } else {
        groupList[i].messages = [message];
      }

      localStorage.setItem("groups", JSON.stringify(groupList));
      break;
    }
  }

  document.getElementById("user-message").value = "";

  getGroupChatHistory(groupname);
};

const updateUsername = () => {
  const usernameInput = document.getElementById("new-username").value;

  const storedUser = sessionStorage.getItem("me");
  const storedContacts = localStorage.getItem("users");
  let userList = JSON.parse(storedContacts);

  for (let i = 0; i < userList.length; i++) {
    let user = userList[i].username;

    if (user == storedUser) {
      userList[i].username = usernameInput;
    }
    break;
  }

  sessionStorage.setItem("me", usernameInput);
  localStorage.setItem("users", JSON.stringify(userList));
  userModal.style.display = "none";
  const name = document.getElementById("name");
  name.innerHTML = `${usernameInput}`;
};

const formatDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const mins = String(date.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} - ${hours}:${mins}`;
};

const groupModal = document.getElementById("myGroupModal");
const openGroupModalBtn = document.getElementById("openGroupModalBtn");
const closeGroupModalBtn = document.getElementById("closeGroupModalBtn");

const userModal = document.getElementById("myUserModal");
const openUserModalBtn = document.getElementById("openUserModalBtn");
const closeUserModalBtn = document.getElementById("closeUserModalBtn");

openGroupModalBtn.onclick = () => {
  addGroupChat();
  groupModal.style.display = "block";
};

closeGroupModalBtn.onclick = () => {
  groupModal.style.display = "none";
};

openUserModalBtn.onclick = () => {
  userModal.style.display = "block";
};

closeUserModalBtn.onclick = () => {
  userModal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === groupModal) {
    groupModal.style.display = "none";
  }
  if (e.target === userModal) {
    userModal.style.display = "none";
  }
};
