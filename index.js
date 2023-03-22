import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://wancho-bread-olly-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)

    clearInputFieldEl()
})


onValue(shoppingListInDB, function(snapshot){
   
    let shopListArray = Object.entries(snapshot.val())
    if (snapshot.exists()) {
        
    
        clearShoppingListEl()

        for (let i = 0; i < shopListArray.length; i++) {
            let currentItem = shopListArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItemToShoppingListEl(currentItem)
        }
    }
    else{
        shoppingListEl.innerHTML = "No items added yet!"
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue
    newEl.addEventListener("click", function(){
        let itemDBAddy = ref(database, `shoppingList/${itemID}`)
        remove(itemDBAddy)
    })

    shoppingListEl.append(newEl)
}