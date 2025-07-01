document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("user-table");
  const searchInput = document.getElementById("searchInput");

  const defaultUsers = [
    {
      code: "TR001",
      name: "Leanne Graham",
      email: "Sincere@april.biz",
      role: "ADMIN",
      birthday: "31/01/1995",
      status: "active"
    },
    {
      code: "TR002",
      name: "Ervin Howell",
      email: "Shanna@melis.tv",
      role: "USER",
      birthday: "25/10/1985",
      status: "inactive"
    },
    {
      code: "TR003",
      name: "Clementine Bauch",
      email: "Julianne@kory.org",
      role: "USER",
      birthday: "29/10/1995",
      status: "active"
    },
    {
      code: "TR004",
      name: "Patricia Lebsack",
      email: "Lucio@annie.ca",
      role: "USER",
      birthday: "15/07/1995",
      status: "inactive"
    },
    {
      code: "TR005",
      name: "Kurtis Weissnat",
      email: "Telly.Hger@billy.biz",
      role: "ADMIN",
      birthday: "14/09/1999",
      status: "inactive"
    }
  ];

  // Khởi tạo nếu chưa có
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(defaultUsers));
  }

  function renderUsers(users) {
  tableBody.innerHTML = "";

  users.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.code}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td class="${user.role === 'ADMIN' ? 'admin' : ''}">${user.role}</td>
      <td>${user.birthday}</td>
      <td>
        <span class="status ${user.status === 'active' ? 'active' : 'inactive'}">
          ● ${user.status === 'active' ? 'Active' : 'Deactivate'}
        </span>
      </td>
      <td>
        <i class="fas fa-trash-alt delete" data-index="${index}"></i>
        <i class="fas fa-edit edit" data-index="${index}"></i>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // Sau khi render xong: Gán sự kiện click cho nút Edit
  document.querySelectorAll(".edit").forEach(btn => {
    btn.addEventListener("click", function () {
      const index = this.getAttribute("data-index");

      // Lấy danh sách users
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userToEdit = users[index];

      // Lưu dữ liệu tạm
      localStorage.setItem("userToEdit", JSON.stringify(userToEdit));
      localStorage.setItem("editIndex", index);

      // Chuyển sang trang sửa
      window.location.href = "addnewuser.html";
     }); 
});     
}
 let allUsers = JSON.parse(localStorage.getItem("users")) || [];
  renderUsers(allUsers);
});