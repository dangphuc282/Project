
const defaultUsers = [
  {
    
  }
];

// khoi tao localstorage
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(defaultUsers));
}

// bien toan cuc
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentPage = 1;
const rowsPerPage = 5;

// ========== CHUẨN HÓA STATUS ==========
users = users.map(user => {
  if (typeof user.status === "boolean") {
    user.status = user.status ? "Active" : "Deactivate";
  }
  return user;
});

// lay than bang
const tableBody = document.getElementById("user-table");

// hien thi nguoi dung
function renderUsers(data) {
  tableBody.innerHTML = "";

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedUsers = data.slice(start, end);

  paginatedUsers.forEach((user, index) => {
    const statusClass = user.status === "Active" ? "status-active" : "status-deactive";

    const row = `
      <tr>
        <td>${user.userCode || `TR${start + index + 1}`}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.role || "USER"}</td>
        <td>${user.birthday || "01/01/2000"}</td>
        <td><span class="${statusClass}">${user.status}</span></td>
        <td>
          <i class="fa-solid fa-trash" style="color: red; margin-left: 10px; cursor:pointer;" onclick="deleteUser(${start + index})"></i>

          <i class="fa-solid fa-pen-to-square" style="color: orange; margin-left: 15px; cursor:pointer;" onclick="editUser(${start + index})"></i>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });

  renderPagination(data.length);
}

function renderPagination(totalItems) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(totalItems / rowsPerPage);

//  mui ten chuyen trang sang trai
  const prevBtn = document.createElement("button");
  prevBtn.innerHTML = "&larr;";  
  prevBtn.disabled = currentPage === 1; 
  prevBtn.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      renderUsers(users);
    }
  });
  paginationContainer.appendChild(prevBtn);

  // nut so trang
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = i === currentPage ? "active-page" : "";
    btn.addEventListener("click", function () {
      currentPage = i;
      renderUsers(users);
    });
    paginationContainer.appendChild(btn);
  }

  // mui ten sang phai
  const nextBtn = document.createElement("button");
  nextBtn.innerHTML = "&rarr;";  // →
  nextBtn.disabled = currentPage === totalPages; // disable nếu đang trang cuối
  nextBtn.addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      renderUsers(users);
    }
  });
  paginationContainer.appendChild(nextBtn);
}


// xoa nguoi dung
function deleteUser(index) {
  if (confirm("Bạn có chắc muốn xoá người dùng này không?")) {
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    renderUsers(users);
  }
}

// sua nguoi dung
function editUser(index) {
  const user = users[index];
  localStorage.setItem("editingUser", JSON.stringify({ ...user, index }));
  window.location.href = "../HTML/edituser.html";
}

// them nguoi dung
function addUser(index) {
  const user = users[index];
  localStorage.setItem("addUser", JSON.stringify({ ...user, index }));
  window.location.href = "../HTML/addnewuser.html";
}

// tim kiem
document.getElementById("searchInput").addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  const filtered = users.filter(user =>
    user.username.toLowerCase().includes(keyword)
  );
  currentPage = 1;
  renderUsers(filtered);
});

// render ban dau
renderUsers(users);
