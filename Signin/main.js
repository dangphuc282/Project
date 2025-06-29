// B1: Lấy thông tin users từ localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];
console.log("Tài khoản hệ thống:", users);

// B2: Bắt sự kiện submit của form
let form = document.getElementById("main-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  console.log("Người dùng nhập:", email, password);

  // B3: Kiểm tra người dùng có tồn tại trong danh sách hay không
  let user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    alert("Đăng nhập thất bại! Email hoặc mật khẩu sai.");
  } else {
    // B4: Lưu thông tin người dùng vừa đăng nhập
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Đăng nhập thành công!");
    // Chuyển hướng về trang chính
    window.location.href = "index.html";
  }
});
