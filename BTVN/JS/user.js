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

  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(defaultUsers));
  }

  let allUsers = JSON.parse(localStorage.getItem("users")) || [];

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
          <i class="fas fa-trash-alt delete" data-index="${index}" title="Delete"></i>
          <i class="fas fa-edit edit" data-index="${index}" title="Edit"></i>
        </td>
      `;
      tableBody.appendChild(row);
    });

    // Gán sự kiện xoá
    document.querySelectorAll(".delete").forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        if (confirm("Bạn có chắc muốn xoá người dùng này?")) {
          allUsers.splice(index, 1);
          localStorage.setItem("users", JSON.stringify(allUsers));
          renderUsers(allUsers);
        }
      });
    });

    // Gán sự kiện sửa
    document.querySelectorAll(".edit").forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        editUser(index);
        window.location.href = "edituser.html"; 
      });
    });
    
  }

  // Hiển thị tất cả người dùng ban đầu
  renderUsers(allUsers);

  // Tìm kiếm theo tên
  searchInput?.addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    const filtered = allUsers.filter(user =>
      user.name.toLowerCase().includes(keyword)
    );
    renderUsers(filtered);
  });

  // Sửa người dùng
  const editModal = document.getElementById("edit-modal");
  const editForm = document.getElementById("edit-form");

  function editUser(index) {
    const user = allUsers[index];
    document.getElementById("edit-index").value = index;
    document.getElementById("edit-name").value = user.name;
    document.getElementById("edit-email").value = user.email;
    document.getElementById("edit-role").value = user.role;
    document.getElementById("edit-birthday").value = user.birthday;
    document.getElementById("edit-status").value = user.status;

    editModal.style.display = "flex";
  }

  document.getElementById("cancel-edit").addEventListener("click", function () {
    editModal.style.display = "none";
  });

  editForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const index = document.getElementById("edit-index").value;

    allUsers[index] = {
      ...allUsers[index],
      name: document.getElementById("edit-name").value,
      email: document.getElementById("edit-email").value,
      role: document.getElementById("edit-role").value.toUpperCase(),
      birthday: document.getElementById("edit-birthday").value,
      status: document.getElementById("edit-status").value
    };

    localStorage.setItem("users", JSON.stringify(allUsers));
    renderUsers(allUsers);
    editModal.style.display = "none";
  });
});
