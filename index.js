let ulListCont = document.getElementById("ulListCont");
let inputId = document.getElementById("inputId");
let addBtn = document.getElementById("addBtn");
let saveBtnId = document.getElementById("saveBtnId");

function getItemsFromLocalStorage() {
    let getitemfromlocal = localStorage.getItem("todolist");
    let parseConvertItem = JSON.parse(getitemfromlocal);
    if (parseConvertItem === null) {
        return [];
    } else {
        return parseConvertItem;
    }
}
let todolist = getItemsFromLocalStorage();
console.log
let todocount = todolist.length;
saveBtnId.onclick = function() {
    localStorage.setItem("todolist", JSON.stringify(todolist));
};

function completedTask(checkboxId, divId, listId) {
    let div = document.getElementById(divId);
    div.classList.toggle("checked");
    let checkingBox = todolist.findIndex(function(eachitem) {
        let checking = "listId" + eachitem.uniqueNo;
        if (checking === listId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todolist[checkingBox];
    console.log(todoObject);
    console.log(todolist[checkingBox]);
    if (todoObject.isStatus === true) {
        todoObject.isStatus = false;
    } else {
        todoObject.isStatus = true;
    }
}

function deleteTodolist(listId) {
    let listremove = document.getElementById(listId);
    ulListCont.removeChild(listremove);
    let delteindex = todolist.findIndex(function(eachitem) {
        let deleteitems = "listId" + eachitem.uniqueNo;
        if (deleteitems === listId) {
            return true;
        } else {
            return false;
        }
    });
    todolist.splice(delteindex, 1);
}

function editTodoList(labelId, listId, addBtn) {
    let labelEditid = document.getElementById(labelId);
    inputId.value = labelEditid.textContent;
    let listEditId = document.getElementById(listId);
    ulListCont.removeChild(listEditId);
    addBtn.textContent = "Edit";
    let editindex = todolist.findIndex(function(eachitem) {
        let edititems = "listId" + eachitem.uniqueNo;
        if (edititems === listId) {
            return true;
        } else {
            return false;
        }
    });
    todolist.splice(editindex, 1);
}

function todolistitems(todo) {
    let checkboxId = "checkboxId" + todo.uniqueNo;
    let labelId = "labelId" + todo.uniqueNo;
    let divId = "divId" + todo.uniqueNo;
    let listId = "listId" + todo.uniqueNo;
    let listElement = document.createElement("li");
    listElement.id = listId;
    listElement.classList.add("li-container");
    ulListCont.appendChild(listElement);
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isStatus;
    inputElement.title = "Checkbox";
    inputElement.classList.add("checkbox");
    listElement.appendChild(inputElement);
    let divElement = document.createElement("div");
    divElement.classList.add("label-container");
    divElement.id = divId;
    if (todo.isStatus === true) {
        divElement.classList.add("checked");
    }
    divElement.style.backgroundColor = todo.backgroundRandomColor;
    divElement.style.borderLeft = "3px";
    divElement.style.borderStyle = "solid";
    divElement.style.borderLeftColor = todo.borderRandomColor;
    divElement.style.borderRight = "none";
    divElement.style.borderBottom = "none";
    divElement.style.borderTop = "none";
    listElement.appendChild(divElement);
    let labelElement = document.createElement("label");
    labelElement.id = labelId;
    labelElement.textContent = todo.text;
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("label-heading");
    inputElement.onclick = function() {
        completedTask(checkboxId, divId, listId);
    };
    divElement.appendChild(labelElement);
    let deleteCont = document.createElement("div");
    deleteCont.classList.add("delete-cont");
    divElement.appendChild(deleteCont);
    let editicon = document.createElement("i");
    editicon.classList.add("fa-solid", "fa-pen", "edit-icon");
    editicon.title = "edit";
    editicon.onclick = function() {
        editTodoList(labelId, listId, addBtn);
    };
    deleteCont.appendChild(editicon);
    let deleteicon = document.createElement("i");
    deleteicon.classList.add("fa-solid", "fa-trash-can", "delete-icon");
    deleteicon.title = "delete";
    deleteicon.onclick = function() {
        deleteTodolist(listId);
        if (todolist.length <= 2) {
            ulListCont.classList.remove("active-ul-list-cont");
        }
    };
    deleteCont.appendChild(deleteicon);
    let paraEle = document.createElement("p");
    paraEle.classList.add("paragraph");
    paraEle.innerHTML = todo.newdate;
    listElement.appendChild(paraEle);
    let timeIcon = document.createElement("i");
    timeIcon.classList.add("fa-regular", "fa-calendar-days", "time-icon");
    timeIcon.style.display = todo.Display;
    listElement.appendChild(timeIcon);
}
for (let todo of todolist) {
    todolistitems(todo);
}

if (todolist.length < 2) {
    ulListCont.classList.remove("active-ul-list-cont");
}

let randomColorBorder = ["#B756E7", "#0AE7B3", "#04F61D", "#A44E88", "#1EA4C9", "#254D2A", "#2182AB", "#D4A248", "#B571BA", "#FD1A36", "#F49904"];
let randomColorBackground = ["#f5e0ff", "#e3fff8", "#ccfcd2", "#f7dfef", "#dcf3fa", "#e8ffeb", "#def5ff", "#faf2e3", "#fcf2fc", "#ffedef", "#fff5e6"];

function inputTodocreate(addBtn) {
    addBtn.textContent = "Add";
    let newdate = new Date();
    newdate = newdate.toLocaleDateString();
    let borderNumber = Math.ceil(Math.random() * 10);
    let inputId = document.getElementById("inputId");
    let inputValue = inputId.value;
    if (inputValue.length > 20) {
        inputValue = inputValue.slice("0", "15") + "...";
    } else {
        inputValue = inputValue;
    }
    if (inputValue === "") {
        alert("Enter a Valid Input");
        return;
    }
    todocount = todocount + 1;
    let inputText = {
        text: inputValue,
        uniqueNo: todocount,
        borderRandomColor: randomColorBorder[borderNumber],
        backgroundRandomColor: randomColorBackground[borderNumber],
        newdate: newdate,
        Display: "block",
        isStatus: false
    };
    todolist.push(inputText);
    todolistitems(inputText);
    inputId.value = "";
}
let msg = document.getElementById("msgId");
let countmsg = 0;
let intervalId = null;

function msgdisplay(countmsg = 0) {
    intervalId = setInterval(function() {
        countmsg = countmsg + 1;
        msg.classList.add("msg-cont2");
        if (countmsg > 10) {
            clearInterval(intervalId);
            msg.classList.remove("msg-cont2");
        }
    }, 100);
}
inputId.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        inputTodocreate(addBtn);
        msgdisplay()
        if (todolist.length > 2) {
            ulListCont.classList.add("active-ul-list-cont");
        }
    }
});
addBtn.onclick = function() {
    inputTodocreate(addBtn);
    msgdisplay()
    console.log(todolist, "todolist")
    if (todolist.length > 2) {
        ulListCont.classList.add("active-ul-list-cont");
    }
}