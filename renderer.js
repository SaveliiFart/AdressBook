// -*- coding: utf-8 -*-

const fs = require("fs-extra");

let dom = {
  add: document.getElementById("add"),
  delete: document.getElementById("delete"),
  searchInput: document.getElementById("search_input"),
  searchBtn: document.getElementById("search_btn"),
};

let dom_add = {
  addFullName: document.getElementById("add_fullName"),
  addHomeAddress: document.getElementById("add_homeAddress"),
  addWorkAddress: document.getElementById("add_workAddress"),
  addPhone: document.getElementById("add_phone"),
  addInfo: document.getElementById("add_info"),
  addBtn: document.getElementById("add_btn"),
};

let dom_delete = {
  delFullName: document.getElementById("del_fullName"),
  delBtn: document.getElementById("del_btn"),
};

const filePath = "./src/data.json";
let tableWrapper = document.querySelector(".table-wrapper");

document.addEventListener("DOMContentLoaded", () => {
  dom.add.addEventListener("click", () => {
    dom.add.classList.add("main__toolbar-operation-addItem-action");
    dom.delete.classList.remove("main__toolbar-operation-deleteItem-action");

    function checkDeleteItem() {
      let deleteItem = document.querySelector(
        ".main__toolbar-operation-delete"
      );
      let addItem = document.querySelector(".main__toolbar-operation-add");
      if (deleteItem) {
        deleteItem.style.display = "none";
        addItem.style.display = "block";
      }
    }

    checkDeleteItem();
  });
});

document.addEventListener("DOMContentLoaded", (e) => {
  dom.delete.addEventListener("click", () => {
    dom.delete.classList.add("main__toolbar-operation-deleteItem-action");
    dom.add.classList.remove("main__toolbar-operation-addItem-action");

    function checkAddItem() {
      let addItem = document.querySelector(".main__toolbar-operation-add");
      let deleteItem = document.querySelector(
        ".main__toolbar-operation-delete"
      );
      if (addItem) {
        addItem.style.display = "none";
        deleteItem.style.display = "block";
      }
    }

    checkAddItem();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  dom_add.addBtn.addEventListener("click", () => {
    let fullName = dom_add.addFullName.value;
    let homeAddress = dom_add.addHomeAddress.value;
    let workAddress = dom_add.addWorkAddress.value;
    let phone = dom_add.addPhone.value;
    let info = dom_add.addInfo.value;

    if (
      fullName === "" ||
      homeAddress === "" ||
      workAddress === "" ||
      phone === "" ||
      info === ""
    ) {
      alert("Заполните все поля");
    } else {
      let table = document.createElement("div");
      table.classList.add("main__window-table-row");
      table.innerHTML = `
      <div class="main__window-table-cell">${fullName}</div>
      <div class="main__window-table-cell">${homeAddress}</div>
      <div class="main__window-table-cell">${workAddress}</div>
      <div class="main__window-table-cell">${phone}</div>
      <div class="main__window-table-cell">${info}</div>
    `;

      tableWrapper.appendChild(table);

      let tableJson = {
        fullName: fullName,
        homeAddress: homeAddress,
        workAddress: workAddress,
        phone: phone,
        info: info,
      };

      dom_add.addFullName.value = "";
      dom_add.addHomeAddress.value = "";
      dom_add.addWorkAddress.value = "";
      dom_add.addPhone.value = "";
      dom_add.addInfo.value = "";

      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
          throw err;
        }
        let tableData = JSON.parse(data);

        tableData.push(tableJson);

        fs.writeFile(filePath, JSON.stringify(tableData, null, 2), (err) => {
          if (err) {
            throw err;
          }
          console.log("Данные успешно записаны в файл.");
        });
      });
    }
  });
});

function createTable() {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      throw err;
    }
    let tableData = JSON.parse(data);

    console.log(tableData);

    tableData.forEach((item) => {
      let table = document.createElement("div");
      table.classList.add("main__window-table-row");
      table.innerHTML = `
        <div class="main__window-table-cell">${item.fullName}</div>
        <div class="main__window-table-cell">${item.homeAddress}</div>
        <div class="main__window-table-cell">${item.workAddress}</div>
        <div class="main__window-table-cell">${item.phone}</div>
        <div class="main__window-table-cell">${item.info}</div>
      `;

      tableWrapper.appendChild(table);
    });
  });
}

createTable();

document.addEventListener("DOMContentLoaded", () => {
  dom_delete.delBtn.addEventListener("click", () => {
    delFullName = dom_delete.delFullName.value;
    let tableData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    let newTableData = tableData.filter(
      (item) => item.fullName !== delFullName
    );
    fs.writeFileSync(filePath, JSON.stringify(newTableData, null, 2));
    location.reload();

    dom_delete.delFullName.value = "";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  dom.searchBtn.addEventListener("click", () => {
    let search = dom.searchInput.value;
    let tableData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    let newTableData = tableData.filter((item) => item.fullName === search);
    console.log(newTableData);

    tableWrapper.innerHTML = "";

    newTableData.forEach((item) => {
      let table = document.createElement("div");
      table.classList.add("main__window-table-row");
      table.innerHTML = `
        <div class="main__window-table-cell">${item.fullName}</div>
        <div class="main__window-table-cell">${item.homeAddress}</div>
        <div class="main__window-table-cell">${item.workAddress}</div>
        <div class="main__window-table-cell">${item.phone}</div>
        <div class="main__window-table-cell">${item.info}</div>
      `;

      tableWrapper.appendChild(table);
    });

    dom.searchInput.value = "";

    if (newTableData.length === 0) {
      tableWrapper.innerHTML = `
        <div class="main__window-table-row">
          <div class="main__window-table-cell">Ничего не найдено</div>
        </div>
      `;
    }

    if (search === "") {
      location.reload();
    }
  });
});
