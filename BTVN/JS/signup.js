let users = JSON.parse(localStorage.getItem("users")) || [];

let form = document.getElementById("signup-form");
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // lay gia tri nguoi dung nhap vao
    let email = document.getElementById("email").value.trim();
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    // hien thi phan loi
    let emailError = document.getElementById("emailError");
    let usernameError = document.getElementById("usernameError");
    let passwordError = document.getElementById("passwordError");

    // kiem tra dinh dang
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/;
   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;



    // xoa thong bao loi cu
    emailError.innerText = "";
    usernameError.innerText = "";
    passwordError.innerText = "";

    let isValid = true;

    // check email
    if (!emailRegex.test(email)) {
        emailError.innerText = "Email không hợp lệ";
        isValid = false;
    }

//    check user name
    if (!usernameRegex.test(username)) {
        usernameError.innerText = "Username không hợp lệ";
        isValid = false;
    }

    // check password
    if (!passwordRegex.test(password)) {
        passwordError.innerText = "Password không hợp lệ";
        isValid = false;
    }

    // luu vao sto
   if (isValid) {
    let newUser = {
        id: users.length + 1,
        username: username,
        email: email,
        password: password,
        status: true,
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    alert("Đã đăng ký thành công!");  
    
    

    }
});
