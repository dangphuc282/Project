// lay thong tin localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];
console.log("Tài khoản hiện có:", users);

let form = document.getElementById("signup-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // lay gia tri tu input
  let email = document.getElementById("email").value.trim();
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value;

  // check xem ton tai chua
  let existedUser = users.find((u) => u.email === email);
  if (existedUser) {
    alert("Email đã được sử dụng. Vui lòng chọn email khác.");
    return;
  }

//  tao nguoi dung moi
  let newUser = {
    id: Date.now(), 
    email,
    username,
    password,
  };

//   them va luu vao lai
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Đăng ký thành công!");

// chuyen ve home
  window.location.href = "login.html";
});
