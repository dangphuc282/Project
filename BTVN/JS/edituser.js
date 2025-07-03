// do du lieu vao khi load trang
window.addEventListener("DOMContentLoaded", () => {
  const editingUser = JSON.parse(localStorage.getItem("editingUser"));
  if (!editingUser) return;

  document.getElementById("userCode").value = editingUser.userCode || "";
  document.getElementById("username").value = editingUser.username || "";
  document.getElementById("email").value = editingUser.email || "";
  document.getElementById("password").value = editingUser.password || "";
  document.getElementById("role").value = editingUser.role || "USER";
  document.getElementById("birthday").value = convertToInputDate(editingUser.birthday);

  const statusValue = editingUser.status.toLowerCase(); // "active" hoặc "deactivate"
  document.querySelector(`input[name="status"][value="${statusValue}"]`).checked = true;

  document.getElementById("description").value = editingUser.description || "";
});

// khi click vao hien nen do o readonly
["userCode"].forEach((id) => {
  const input = document.getElementById(id);
  input.addEventListener("click", () => {
    input.classList.add("highlight-error");
    setTimeout(() => {
      input.classList.remove("highlight-error");
    }, 1500);
  });
});

// submit form luu chinh sua
document.getElementById("user-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const editingUser = JSON.parse(localStorage.getItem("editingUser"));
  if (!editingUser) {
    alert("Không tìm thấy người dùng để chỉnh sửa.");
    return;
  }

  const userCode = document.getElementById("userCode").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;
  const birthday = document.getElementById("birthday").value;
  const status = document.querySelector('input[name="status"]:checked').value === "active" ? "Active" : "Deactivate";
  const description = document.getElementById("description").value;

  // validate
  if (email === "") {
    alert("Email không được để trống.");
    return;
  }
  

  if (username === "") {
    alert("Username không được để trống.");
    return;
  }

  // validate password
if (password === "") {
  alert("Password không được để trống.");
  return;
}

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


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Email không đúng định dạng.");
    return;
  }

//   kiem tra trung email
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const isDuplicate = users.some((u, index) => u.email === email && index !== editingUser.index);
  if (isDuplicate) {
    alert("Email đã tồn tại. Vui lòng chọn email khác.");
    return;
  }
  
  // kiem tra trung user name
  const isUsernameDuplicate = users.some((u, index) => u.username === username && index !== editingUser.index);
  if (isUsernameDuplicate) {
    alert("Username đã tồn tại. Vui lòng chọn username khác.");
    return;
  }

  
  

  // cap nhat nguoi dung
  const updatedUser = {
    userCode: editingUser.userCode, // readonly
    username,
    email: editingUser.email, // readonly
    password,
    role,
    birthday: formatToDisplayDate(birthday),
    status,
    description
  };

  users[editingUser.index] = { ...users[editingUser.index], ...updatedUser };

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.removeItem("editingUser");

  alert("Đã sửa thành công");
  window.location.href = "user.html";
});

// nut back
document.querySelector(".back-btn").addEventListener("click", () => {
  window.location.href = "../HTML/user.html";
});

// ham ho tro
function convertToInputDate(dateStr) {
  if (!dateStr.includes("/")) return dateStr;
  const [dd, mm, yyyy] = dateStr.split("/");
  return `${yyyy}-${mm}-${dd}`;
}

function formatToDisplayDate(dateStr) {
  if (!dateStr.includes("-")) return dateStr;
  const [yyyy, mm, dd] = dateStr.split("-");
  return `${dd}/${mm}/${yyyy}`;
}
