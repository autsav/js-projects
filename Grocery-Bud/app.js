// ****** SELECT ITEMS **********
    const alert = document.querySelector(".alert");
    const form = document.querySelector(".grocery-form");
    const grocery = document.getElementById("grocery");
    const submitBtn = document.querySelector(".submit-btn");
    const container = document.querySelector(".grocery-container");
    const list = document.querySelector(".grocery-list");
    const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editID = "";
// ****** EVENT LISTENERS **********
// submit form
form.addEventListener("submit",addItem);
//clear items
clearBtn.addEventListener("click",clearItems);
//load items
window.addEventListener("DOMContentLoaded", setupItems);


// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
    const value = grocery.value;

    const id = new Date().getTime().toString();
    if(value && !editFlag){ //if the field is not empty and you are not editing but inserting item for the first time
        createListItem(id, value);
       //display alert
       displayAlert("Item added to the list", "success");
       //show conteiner
       container.classList.add("show-container");
        //add to local storage
        addToLocalStorage(id, value);
        //set back to default
        setBackToDefault();
    }
    else if(value && editFlag){ //if the field is not empty and user want to edit the item
        editElement.innerHTML = value;
        displayAlert('Value Updated', "success");
        //edit local storage
        editLocalStorage(editID,value);
        setBackToDefault();
    }
    else{
     displayAlert('Please enter value', "danger");
    }
    
}
//display alert
function displayAlert(text, action){
        alert.textContent = text;
        alert.classList.add(`alert-${action}`);
        //remove alert
            setTimeout(function(){
                alert.textContent = "";
                alert.classList.remove(`alert-${action}`);
            }, 1000);
}
//clear items
function clearItems(){
    const items = document.querySelectorAll('.grocery-item');

    if(items.length > 0){
        items.forEach(function(item){
            list.removeChild(item);
        }); 
    }
    container.classList.remove("show-container");
    displayAlert("empty list", "danger");
    setBackToDefault();
    localStorage.removeItem('list');
}

//edit function
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
//set edit item
//This search for the class title 
editElement = e.currentTarget.parentElement.previousElementSibling;
//set form value
grocery.value = editElement.innerHTML;
editFlag = true;
editID = element.dataset.id;
submitBtn.textContent = 'edit';
     
}
//delete function
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    // console.log(element);
    list.removeChild(element);
    if(list.children.length === 0){
        container.classList.remove("show-container");
    }
    displayAlert("item removed", "danger");
    setBackToDefault();
    //remove from local storage

    removeFromLocalStorage(id);

}

//set back to default
function setBackToDefault(){
    //here It makes sure that the thing go to its nitial setup
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value){
    const grocery = {id, value};
    let items = getLocalStorage();
    console.log(items);
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));

}
function removeFromLocalStorage(id){
    let items = getLocalStorage();
    items = items.filter(function(item){
        if(item.id !==id ){
            return item
        }
    });
    localStorage.setItem("list", JSON.stringify(items));

}
function editLocalStorage(id, value){
    let items = getLocalStorage();
    items = items.map(function (item){
        if(item.id === id){
            item.value = value;
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage(){
   return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];

}
// ****** LOCAL STORAGE **********



//store data in localStorage API
//setItem
localStorage.setItem("apple", JSON.stringify(["Utsab", "Sita"]));
//getItem
//save as strings
const apple = JSON.parse(localStorage.getItem("apple"));
console.log(apple);

//removeItem
localStorage.removeItem("apple");
// ****** SETUP ITEMS **********
function setupItems(){
    let items = getLocalStorage();
    
    if(items.length > 0){
        items.forEach(function(item){
            createListItem(item.id, item.value)
        });
        container.classList.add('show-container');
    }
}

function createListItem(id, value){
    const element = document.createElement('article');
    //add class
    element.classList.add('grocery-item');
    //add id
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML =`  <p class="title">${value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>   `;
// Need to setup this because without it the buttons wont work
    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");
 //    console.log(deleteBtn);
     deleteBtn.addEventListener('click',deleteItem);
     editBtn.addEventListener('click',editItem);

     
    //append child
    list.appendChild(element);
}