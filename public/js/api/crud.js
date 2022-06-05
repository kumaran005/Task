onload = () => {
  get_user();
};

var user_name = document.getElementById("user_name");
var user_age = document.getElementById("user_age");
var user_gender = document.getElementById("user_gender");
var user_color = document.getElementById("user_color");

function toggle(params) {
  if (params == "add") {
    user_name.value =
      user_age.value =
      user_color.value =
      user_gender.value =
        "";
    document.querySelector(".modal-footer").innerHTML = `
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
     <button type="button" class="btn btn-success" onclick="add_user()" >Add</button>`;
  } else {
    getSingle(params);
    document.querySelector(".modal-footer").innerHTML = `
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
     <button  class="btn btn-danger" onclick="delete_user('${params}')" >Delete</button>
      <button type="button" class="btn btn-success"onclick="update_user('${params}')">Update</button>`;
  }
  $(`#addModal`).modal("toggle");
}
function add_user() {
  fetch("/crud/post", {
    method: "POST",
    body: JSON.stringify({
      user_name: user_name.value,
      user_age: user_age.value,
      user_gender: user_gender.value,
      user_color: user_color.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.text())
    .then((res) => {
      $(`#addModal`).modal("toggle");
      displaymsg(res);
      get_user();
    });
}
function update_user(id) {
  fetch("/crud/put", {
    method: "PUT",
    body: JSON.stringify({
      user_name: user_name.value,
      user_age: user_age.value,
      user_gender: user_gender.value,
      user_color: user_color.value,
      id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.text())
    .then((res) => {
      displaymsg(res);
      $(`#addModal`).modal("toggle");
      get_user();
    });
}
function delete_user(params) {
  fetch("/crud/delete", {
    method: "DELETE",
    body: JSON.stringify({ id: params }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.text())
    .then((res) => {
      displaymsg(res);
      $(`#addModal`).modal("toggle");
      get_user();
    });
}
function get_user() {
  var tbody = document.getElementById("class-section");
  tbody.innerHTML = null;
  fetch("/crud/get")
    .then((result) => result.json())
    .then((result) => {
      result.forEach((element) => {
        var tr = document.createElement("tr");
        tr.innerHTML = ` <td>${element.user_name}</td>
                            <td>${element.user_age}</td>
                            <td>${element.user_gender}</td>
                            <td> ${element.user_color}</td>`;
        tr.setAttribute("onclick", `toggle('${element._id}')`);
        tbody.append(tr);
      });
    })
    .catch((err) => {});
}

function getSingle(params) {
  fetch(`/crud/getSingle`, {
    method: "POST",
    body: JSON.stringify({ id: params }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      user_name.value = res.user_name;
      user_age.value = res.user_age;
      user_gender.value = res.user_gender;
      user_color.value = res.user_color;
    })
    .catch((err) => {});
}

function displaymsg(response) {
  i = 0;
  var data = "";
  var time = setInterval(() => {
    document.getElementById("displaymsg").innerText = data += response[i++];

    data.length == response.length ? clearInterval(time) : "";
  }, 20);
  setTimeout(function () {
    document.getElementById("displaymsg").innerHTML = null;
  }, 4000);
}
