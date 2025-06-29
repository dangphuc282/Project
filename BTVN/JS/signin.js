// lay thong tin tu localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];
console.log("Tài khoản hệ thống:", users);

let form = document.getElementById("signup-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  let errorBox = document.getElementById("errorBox");
  let successBox = document.getElementById("successBox");

  errorBox.style.display = "none";
  successBox.style.display = "none";
  errorBox.innerHTML = "";

  // Validate input
  let errors = [];
  if (email === "") errors.push("Email không được bỏ trống");
  if (password === "") errors.push("Mật khẩu không được bỏ trống");

  if (errors.length > 0) {
    errorBox.innerHTML = `<strong>Error:</strong><br>` + errors.join("<br>");
    errorBox.style.display = "block";
    return;
  }
// check thong tin nguoi dung
  let user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    errorBox.innerHTML = `<strong>Error:</strong><br>Đăng nhập thất bại! Email hoặc mật khẩu sai.`;
    errorBox.style.display = "block";
  } else {
// luu thong tin nguoi dung
    localStorage.setItem("currentUser", JSON.stringify(user));

    successBox.textContent = "Đăng nhập thành công! Đang chuyển hướng...";
    successBox.style.display = "block";

    setTimeout(() => {
      window.location.href = "index.html"; // đổi nếu bạn có trang khác
    }, 1500);
  }
});
