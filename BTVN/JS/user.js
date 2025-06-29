const users = [
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

const tableBody = document.getElementById("user-table");

users.forEach(user => {
  const row = document.createElement("tr");

  // Tạo nội dung HTML cho từng dòng
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
      <i class="fas fa-trash-alt delete"></i>
      <i class="fas fa-edit edit"></i>
    </td>
  `;

  // them dong vao bang
  tableBody.appendChild(row);
});
