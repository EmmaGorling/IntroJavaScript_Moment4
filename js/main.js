"use strict"

// Variabler
const inputEl = document.getElementById("newtodo");
const addButtonEl = document.getElementById("newtodobutton");
const messageEl = document.getElementById("message");
const outputEl = document.getElementById("todolist");
const clearButtonEl = document.getElementById("clearbutton");


// Eventlistener
inputEl.addEventListener("keyup", checkItemText);
addButtonEl.addEventListener("click", addItem);
clearButtonEl.addEventListener("click", deleteItem);
window.onload = init;


// Start-funktion
function init() {

    // Lägg till-knapp AV
    addButtonEl.disabled = true;

    // Läs in att göra-items
    loadStorage();
}

// Funktion som kollar längden på input
function checkItemText() {
    if (inputEl.value.length < 5 ) {
        messageEl.innerHTML = "Ange minst fem tecken.";
        addButtonEl.disabled = true;
    } else {
        messageEl.innerHTML = "";
        addButtonEl.disabled = false;
    }
}

// Funktion som lägger till att göra
function addItem() {

    // Skapar element
    const item = document.createElement("article");
    const itemText = document.createTextNode(inputEl.value);
    item.className = "listitem";
    item.appendChild(itemText);
    
    // Lägg till element
    outputEl.appendChild(item);

    // Raderar i input-fält
    inputEl.value = "";

    // Stänger av lägg till-knapp igen
    addButtonEl.disabled = true;

    // Klickhanterare
    item.addEventListener("click", function(e) {
        e.target.remove();
    });

    // Anropar spara-funktion
    storeItem();
}

// Spara att göra-lista
function storeItem() {
    
    // Läs in att göra
    const todos = document.getElementsByClassName("listitem");

    const tempArr = [];

    //Loopa igenom och lagra till array
    for (let i=0; i<todos.length; i++) {
        tempArr.push(todos[i].innerHTML);
    }

    // Konvertera till JSON-sträng
    const jsonStr = JSON.stringify(tempArr);

    // Lagra i webstorage
    localStorage.setItem("todolist", jsonStr);

}

// Läs in att göra-items
function loadStorage() {
    
    //Läs in att göra
    const todo = JSON.parse(localStorage.getItem("todolist"));

    // Loopa igenom array för att skriva ut enskilt
    if(todo != null) {
        for(let i=0; i<todo.length; i++) {

            // Skapar element
            const item = document.createElement("article");
            const itemText = document.createTextNode(todo[i]);
            item.className = "listitem";
            item.appendChild(itemText);
    
            // Lägg till element
            outputEl.appendChild(item);

            // Klickhanterare
            item.addEventListener("click", function(e) {
                e.target.remove();

                // Lagra in på nytt
                storeItem();
            
         });
        }   
    }    
    
}
// Ta bort att göra-item
function deleteItem() {
    
    outputEl.innerHTML = "";
    localStorage.clear();
    
}

