// submit form them nguoi dung
document.getElementById("user-form").addEventListener("submit", function (e) {
  e.preventDefault();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const userCode = document.getElementById("userCode").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;
  const birthday = document.getElementById("birthday").value;
  const status = document.querySelector('input[name="status"]:checked').value === "active" ? "Active" : "Deactivate";
  const description = document.getElementById("description").value;

  // validate khong duoc trong
  if (userCode === "") {
    alert("User code không được để trống.");
    return;
  }

  if (username === "") {
    alert("Username không được để trống.");
    return;
  }

  if (email === "") {
    alert("Email không được để trống.");
    return;
  }

  if (password === "") {
    alert("Password không được để trống.");
    return;
  }

//   password validate

if (password.length < 8) {
  alert("Password phải có ít nhất 8 ký tự.");
  return;
}

if (!/[a-z]/.test(password)) {
  alert("Password phải chứa ít nhất một chữ thường.");
  return;
}

if (!/[A-Z]/.test(password)) {
  alert("Password phải chứa ít nhất một chữ in hoa.");
  return;
}


  // dinh dang lai email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Email không đúng định dạng.");
    return;
  }

  // check trung lap
  const isEmailDuplicate = users.some((u) => u.email === email);
  if (isEmailDuplicate) {
    alert("Email đã tồn tại. Vui lòng chọn email khác.");
    return;
  }

  const isUsernameDuplicate = users.some((u) => u.username === username);
  if (isUsernameDuplicate) {
    alert("Username đã tồn tại. Vui lòng chọn username khác.");
    return;
  }

  const isUserCodeDuplicate = users.some((u) => u.userCode === userCode);
  if (isUserCodeDuplicate) {
    alert("User code đã tồn tại. Vui lòng chọn user code khác.");
    return;
  }

  // add nguoi dung
  const newUser = {
    userCode,
    username,
    email,
    password,
    role,
    birthday: formatToDisplayDate(birthday),
    status,
    description
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Thêm người dùng thành công!");
  window.location.href = "../HTML/user.html";
});

// ham ho tro
function formatToDisplayDate(dateStr) {
  if (!dateStr.includes("-")) return dateStr;
  const [yyyy, mm, dd] = dateStr.split("-");
  return `${dd}/${mm}/${yyyy}`;
}

// nut back
document.querySelector(".back-btn").addEventListener("click", () => {
  window.location.href = "../HTML/user.html";
});
