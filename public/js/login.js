var content = document.querySelector(".content");
var forget_content = document.querySelector(".forget-content");
window.onload = () => {
  content.classList.toggle("show");
};
const password = document.querySelector(".password");
const show = document.querySelector(".show-btn");
const span = show.querySelector("span");
password.addEventListener("keyup", (e) => {
  e.target.value ? (show.style.opacity = 1) : (show.style.opacity = 0);
});
show.addEventListener(
  "click",
  () => {
    password.type == "password"
      ? ((password.type = "text"),
        (span.innerText = "Hide"),
        (span.style.color = "gray"))
      : ((password.type = "password"),
        (span.innerText = "Show"),
        (span.style.color = "whitesmoke"));
  },
  []
);

const submit = document.querySelector("#login-btn");
submit.addEventListener(
  "click",
  async (e) => {
    e.preventDefault();
    var email = document.querySelector('input[name="Email"]');
    var pass = document.querySelector('input[name="password"]');
    var e_mail = email.value;
    var password = pass.value;
    if (!e_mail) {
      email.style.border = "1px solid red";
      return;
    } else {
      email.removeAttribute("style");
    }
    if (!password) {
      pass.style.border = "1px red solid";
      return;
    } else {
      pass.removeAttribute("style");
    }
    const show_res = document.querySelector(".show-res");
    show_res.innerHTML = `<div class="spinner"><div class="inner-spinner"></div></div>`;
    var res = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ e_mail, password }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    try {
      if (res.redirected) {
        window.location.href = res.url;
      }
      if (res.status == 400) {
        show_res.innerText = await res.text();
        setTimeout(() => {
          show_res.innerText = null;
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    }
  },
  []
);

// swap contents
const to_sing_up = document.querySelector(".pass a");
const back_to = document.querySelector(".f-pass a");

to_sing_up.addEventListener("click", (e) => {
  e.preventDefault();
  content.classList.toggle("show");
  forget_content.classList.toggle("show");
});
back_to.addEventListener("click", (e) => {
  e.preventDefault();
  content.classList.toggle("show");
  forget_content.classList.toggle("show");
});

// sign-Up
const signup_btn = document.getElementById("signup-btn");
signup_btn.addEventListener("click", async (e) => {
  e.preventDefault();
  const show_resp = document.querySelector(".show-res2");
  const email = document.querySelector("input[name='_email']");
  const pass_1 = document.querySelector("input[name='password_1']");
  const pass_2 = document.querySelector("input[name='password_2']");
  var e_mail = email.value;
  if (!e_mail) {
    email.style.border = "1px red solid";
    return;
  } else {
    email.removeAttribute("style");
  }
  if (pass_1.value != pass_2.value) {
    pass_1.style.border = "1px red solid";
    pass_2.style.border = "1px red solid";
    show_resp.innerText = "Password Mismatching";
    setTimeout(() => {
      show_resp.innerText = null;
    }, 3000);
  } else {
    pass_1.removeAttribute("style");
    pass_2.removeAttribute("style");
  }
  show_resp.innerHTML = `<div class="spinner"><div class="inner-spinner"></div></div>`;
  var res = await fetch("/signUp", {
    method: "post",
    body: JSON.stringify({ e_mail, password: pass_1.value }),
    headers: { "content-type": "application/json; charset=UTF-8" },
  });

  try {
    email.value = "";
    pass_1.value = "";
    pass_2.value = "";
    show_resp.innerText = await res.text();
    setTimeout(() => {
      show_resp.innerText = null;
    }, 3000);
  } catch (err) {
    console.log(err);
  }
});
