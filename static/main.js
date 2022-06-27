
/* TODO:
 DONE: add support for Hover over X/Undo and show tooltip of what it does
1. add text-decoration: line-through

2. Add another X in deleted for permanent removal. 

3. Add alert Dialog like in Book Tracker. 

4. Validate that Input is not empty. 

5. CTRL  + F doesnt bring up a browser dialog but the one built into the app.

*/

function cj(variable) {
    return console.log(JSON.stringify(variable, true, 3));
};
function ct(variable) {
    return console.table(variable);
}
function cl(variable) {
    return console.log(variable);
}

//my name diff color. 
var myname = document.getElementById('my-name');
myname.style.color = 'pink';
myname.style.fontWeight = 'bold';
var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var textBox = document.getElementById('textBox');
var itemsCompleted = document.getElementById('itemsCompleted');
var searchBox = document.getElementById('filter');
var allItems = document.getElementsByClassName('list-group-item');
var output = document.getElementById('output');
 
// API vars
const apiUrl = "";
const apiAllItmes = "/loadsavedtodo"
const apiActions = "/addtodo/" // /addtodo/<action(notCompleted, completed, deleted)><singleTodo>
const apiSave = "/save" 
class API {
    static async apiAllToDos() {
        // const response = await fetch(apiUrl+apiAllItmes);
        // const data = await response.json();
        // create file if AllToDos.json doesnt exist
         
        const fullURL = `${apiAllItmes}`;
        // //const response = await fetch(fullURL);
        // const response = await fetch(fullURL);
        // const data = await response;
         
        const data = await fetch(fullURL).then(function (response) { return response.json(); }).then(function(response) {return response});
        //cl(data);
        const fullData = data["Attempting"] + data["Result"];
        cl(fullData);
        


        data["notCompleted"].forEach((singleTodo) => {
            UI.addItemToUI(singleTodo, "complete", '');
            })
        data["completed"].forEach((singleTodo) => {
            UI.addItemToUI(singleTodo, "undo", 'checked');
            })
    }

    //API to add/complte or remove items. 
    static async apiActions(action, singleTodo) {
        const fullURL = `${apiUrl}${apiActions}${action}/${singleTodo}`;
        // //const response = await fetch(fullURL);
        // const response = await fetch(fullURL);
        // const data = await response;
         
        const data = await fetch(fullURL).then(function (response) { return response.json(); }).then(function(response) {return response});
        //cl(data);
        const fullData = data["Attempting"] + data["Result"];
        return fullData
        // cl("data var<>");
        // cl(data["Result"]);
        // console.log(data);
        //const data = await response.text();
        // const data = await response.text();
        
        // cl(data);
        // output.textContent = data
        // let status
        // if(localStorage.getItem('status') == null) {
        // status = [];
        // } else {
        //     status = localStorage.getItem('status');
        // }

        // status = status + data
        // localStorage.setItem('status', status);
 

    }
    //same as abouve but just for addding to completed 
    static async apiActionsJustAddToCompleted(action,singleTodo) { 
        const fullURL = `${apiUrl}${apiActions}${action}/${singleTodo}`;
        //const response = await fetch(fullURL);
        const response = await fetch(fullURL);
        const data = await response;
    }

    // api call to save to file
    static async apiSave() {
        const fullURL = apiSave;
        // //const response = await fetch(fullURL);
        // const response = await fetch(fullURL);
        // const data = await response;
        const data = await fetch(fullURL).then(function (response) { return response.json(); }).then(function(response) {return response});
        //sconsole.log(data);
        //output.innerText = data;
        const fullData = data["Attempting"] + data["Result"];
        cl("save then get TODO.")
        return data
        
    }
}

class UI {
    static getToDo() {
        // data["completed"].forEach((singleTodo) => {
        //     UI.addItemToUI(singleTodo, "undo", 'checked');
        //     });
        // var i = 0

        // for (i = 0; i < allItems.length; i++) {
        //         allItems[i].removeChild(singleTodo);
        //     };
        //console.log(allItems.length); 
        
        API.apiAllToDos();
        //const toDo = Storage.getToDo();
        // let b = apiAllToDos();
        // cl(b);
        // let p = new Promise((resolve, reject) => {
        //     let a = String(b).includes("notCompleted");

        //     cl(a);
        //     if (a=='true') {
        //         resolve('success');
        //     } else if (a=='false') {reject('Fial')}
        // })
        // //const toDo = async apiAllToDos();
        // p.then((msg) => {
        //     cl(msg);
        // }).catch((msg) => {
        //     cl(msg);
        // });
        // let toDo = apiAllToDos();
        // cl(toDo);
        // toDo.forEach((singleTodo) =>
        //     UI.addItemToUI(singleTodo, "complete", ''));
    }

    static addItemToUI(singleTodo, completedORundo, checkedOrNoCheck) {
            //creating new item with li
        var newLi = document.createElement('li');
            newLi.className = 'list-group-item';
            newLi.style = "color:rgb(3, 75,231); font-size:25px";
            
        var completedButton = document.createElement('input');
            completedButton.type = 'checkbox';
            //Adding del button element to new item.
            completedButton.className = `form-check-input ${completedORundo}`;
            completedButton.checked = checkedOrNoCheck;
            completedButton.title = "Mark Completed";

        var deleteButton = document.createElement('input');
            deleteButton.type = 'Submit';
            deleteButton.value = "X";
            deleteButton.className = 'btn btn-danger delete';
            deleteButton.title = "Delete ToDo"
        
        //newLi.appendChild(document.createTextNode(itemToAdd));
        //adding text node. 
        //newLi.innerText = singleTodo;
        newLi.appendChild(completedButton);
        newLi.appendChild(deleteButton);
        newLi.appendChild(document.createTextNode(singleTodo));
        //adding new Li to Ul TODO or Completed:
        if (completedORundo == "complete") {
            itemList.appendChild(newLi);
            
            // Storage.addItemToStorageDeleted(singleTodo);
            // Storage.removeToDo(singleTodo);

        } else if (completedORundo == "undo") {
            itemsCompleted.appendChild(newLi);
            // Storage.addItemToStorage(singleTodo);
            // Storage.removeToDoDeleted(singleTodo);
          

        }
        textBox.value = "";

    }

    // static getToDoDeleted() {
    //     const toDoDeleted = Storage.getToDoDeleted();
        

    //     toDoDeleted.forEach((singleTodo) =>
    //         UI.addItemToUI(singleTodo, 'undo', 'checked'));
    // }
    
    // static addItemToUIDeletedExisting(e) {
    //     var li = e.target.parentElement;
    //     console.log("LI" + e.target);
    
    //     // console.log('singleTodo:' + singleTodo+ " \n LI: " + li)

    //     itemList.removeChild(li);
        
    //     li.style.textDecoration = 'line-through';
    //     //console.log(e.target.className); 
    //     //changing to UNDO instead of delete and undo in button Text. 
    //     e.target.className = 'btn btn-danger btn-sm float-right undo';
    //     e.target.innerText = 'Undo';
        
    
    //     //ading to Delted Items on top of list. with Line Through. 
    //     itemsCompleted.insertBefore(li, itemsCompleted.firstChild);
    //     const singleTodo = e.target.parentElement.innerText.slice(0,-5)
    //     Storage.removeToDo(singleTodo);
    //     Storage.addItemToStorageDeleted(singleTodo);

    //     //UI.addItemToUIDeleted(singleTodo)
    // }
    // static addItemToUIDeleted(singleTodo) {
    //     //if(e.target.classList.contains('delete')){
    //     //if(confirm('Are you sure you want to delete')){
    //     var newLiForDeleted = document.createElement('li');
    //     newLiForDeleted.className = 'list-group-item';
    //     //adding text node. 
    //     newLiForDeleted.innerHTML = `${singleTodo} <button class= "btn btn-danger btn-sm float-right undo">Undo</button></li>`;
    //     newLiForDeleted.style.textDecoration = 'line-through';

    //     itemsCompleted.insertBefore(newLiForDeleted, itemsCompleted.firstChild);       

    // }

}


//storage

// class Storage {
//     static getToDo() {
//         let toDo;
//         if(localStorage.getItem('todo') === null) {
//             toDo = [];
//         } else {
//             toDo = JSON.parse(localStorage.getItem('todo'));
//         }
//         return toDo;
//     }

//     static addItemToStorage(todoItem) {
//         const toDo = Storage.getToDo();
//         toDo.push(todoItem);
//         localStorage.setItem('todo', JSON.stringify(toDo));

//     }

//     static removeToDo(todoItem) {
//         const toDo = Storage.getToDo();
//         console.log("Storage.removeToDo" + toDo + " - TodoItem Var -" + todoItem);
//         toDo.forEach((indivual, index) => {
//             console.log("Indivual: '" + indivual + "' - toDoItem: '" + todoItem + "'");
//             if (indivual == todoItem) {
//                 console.log("Indivual: " + indivual + " - toDoItem: " + todoItem);
//                 toDo.splice(index, 1);

//             }
//         });
//         localStorage.setItem('todo', JSON.stringify(toDo));
//     }

    //dellete storage
    // static getToDoDeleted() {
    //     let toDoDeleted;
    //     //console.log("Storage.getToDoDeleted" + localStorage.getItem('todo'));
    //     if(localStorage.getItem('todoDeleted') === null) {
    //         toDoDeleted = [];
    //     } else {
    //         toDoDeleted = JSON.parse(localStorage.getItem('todoDeleted'));
    //     }
    //     return toDoDeleted;
    // }

    // static addItemToStorageDeleted(todoItemDeleted) {
    //     const toDoDeleted = Storage.getToDoDeleted();
    //     toDoDeleted.push(todoItemDeleted);
    //     localStorage.setItem('todoDeleted', JSON.stringify(toDoDeleted));

    // }

    // static removeToDoDeleted(todoItemDeleted) {
    //     const toDoDeleted = Storage.getToDoDeleted();
    //     console.log("Storage.removeToDo" + toDoDeleted+ " - TodoItem Var -" + todoItemDeleted);
    //     toDoDeleted.forEach((indivual, index) => {
    //         console.log("Indivual: '" + indivual + "' - toDoItem: '" + todoItemDeleted + "'");
    //         if (indivual == todoItemDeleted) {
    //             console.log("Indivual: " + indivual + " - toDoItem: " + todoItemDeleted);
    //             toDoDeleted.splice(index, 1);

    //         }
    //     });
    //     localStorage.setItem('todoDeleted', JSON.stringify(toDoDeleted));
    // }

    
// }
function returnToDoFromDeleted(e) {
    if (e.target.classList.contains('undo')){
        const todoItem = e.target.parentElement.innerText.slice(0,-5);

        //console.log("todoItem: " + todoItem);
        API.apiActions("notCompleted",todoItem)
        cl("sent to API NotCompleted")
        //Storage.addItemToStorage(todoItem);
        API.apiActions("removeCompleted",todoItem)
        cl("sent to api removeCompleted")
        API.apiSave();
        cl("sent to api save")
        //Storage.removeToDoDeleted(todoItem);
        var li = e.target.parentElement;
        li.style.textDecoration = 'none';
        //console.log(e.target.className);
        // chanign back to delete class and X letter in button 
        e.target.className = 'btn btn-danger btn-sm float-right delete';
        e.target.innerText = 'X';

        itemsCompleted.removeChild(li);
        itemList.appendChild(li);
        
    }
}


// if completed button is clicked in Item List
itemList.addEventListener('click', (e) => {
    if(e.target.classList.contains('complete') && !e.target.classList.contains('undo')){
        //getting the parrent of the clicked element and the inner text of it.
        singleTodo = e.target.parentElement.innerText;

        itemList.removeChild(e.target.parentElement);
        

        UI.addItemToUI(singleTodo, "undo", "checked");
        
        // Storage.addItemToStorageDeleted(singleTodo);
        //API.apiActions("removeNotCompleted", singleTodo);
        
       //API.apiActions("completed", singleTodo);
        //API.apiActionsJustAddToCompleted("completed", singleTodo);
        //API.apiSave();
        console.log("Before API Activity")
        var apiActivity = function () {
            API.apiActions("removeNotCompleted", singleTodo)
                .then(function (response) {
                    console.log(response);
                    cl("341");
                    output.innerHTML = String(response) + "\n";

                    return API.apiActions("completed", singleTodo);
                })
                .then(function (response) {
                    console.log(response);
                    cl("346");
                    output.innerText = String(response) + output.innerText;

                    return API.apiSave();

                })
                .then(function (response) {
                    console.log(response);
                    output.innerText = String(response) + output.innerText;
                    
                    cl("353");
                    
                })
                .then(function (response) {
                    cl("Save checked");
                })
                .catch(function (error) {
                    console.log("notChecked Error: " + error);
                })
        }

        apiActivity()

        // let firstApiAction = function(){
        //     return new Promise( function(resolve, reject){
        //         resolve(API.apiActionsJustAddToCompleted("completed", singleTodo));
        //     });
        // }


       
        // Storage.removeToDo(singleTodo);
        
/*

let firstFunction = function(){
  return new Promise( function(resolve, reject){
           resolve('Your cat is ');
  });
}

let secondFunction = function(dataFromFirstFunction){
  return new Promise( function(resolve, reject){
    resolve(dataFromFirstFunction + 'crazy');
      
  });
}

firstFunction()
  .then(function(data){
  return secondFunction(data);
  })
  .then(function(data){
    console.log(data);
  });


fetch('')
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
     console.log(response);
  });

*/

    }

});

function deleteToDoFully(e) {
    if(e.target.classList.contains('delete')){
        const eParent  = String(e.target.previousElementSibling.classList);
        singleTodo = e.target.parentElement.innerText;

        cl(eParent)
        if (eParent.includes('complete')) {
            cl("complete");
            itemList.removeChild(e.target.parentElement);
            // Storage.removeToDo(singleTodo);
            API.apiActions("removeNotCompleted", singleTodo);
        } else if (eParent.includes('undo')) {
            itemsCompleted.removeChild(e.target.parentElement);
            //Storage.removeToDoDeleted(singleTodo);
            API.apiActions("removeCompleted", singleTodo)
        } else { cl("Nothing")};
        API.apiSave();

    }
}

document.querySelectorAll<"ul">addEventListener('click', (e) => {
    deleteToDoFully(e);
});
// // if delete button is clicked in BOTH? 
// itemList.addEventListener('click', (e) => {
//     deleteToDoFully(e, "itemList")}, false );


// if un-complete button is clicked  in completed list
itemsCompleted.addEventListener('click', (e) => {
    if(e.target.classList.contains('undo')){
        //getting the parrent of the clicked element and the inner text of it.
        singleTodo = e.target.parentElement.innerText;

        itemsCompleted.removeChild(e.target.parentElement);
        
        UI.addItemToUI(singleTodo, "complete", "");
        
        // Storage.addItemToStorage(singleTodo);
        API.apiActions("notCompleted", singleTodo);
        // Storage.removeToDoDeleted(singleTodo);
        API.apiActionsJustAddToCompleted("removeCompleted", singleTodo);
        API.apiSave();
        
        // Storage.addItemToStorageDeleted(singleTodo);
        // Storage.removeToDo(singleTodo);


    }

});





function filter() {
    userInput = searchBox.value;
    cl(userInput);
    //console.log(allItems.length); 
    for (x = 0; x < allItems.length; x++) {
        if (allItems[x].innerText.toLowerCase().indexOf(userInput.toLowerCase()) == '-1') {
            //allItems[x].style.display = 'block'
            allItems[x].style.display = 'none';
        } else { 
            allItems[x].style.display = 'block';
        }
        
    }
}






textBox.addEventListener('click', (e) => {
    if(textBox.value == 'Enter Here') {
        textBox.value = "";
    }
});
// click out event

textBox.addEventListener('focusout', () => { 
    if (textBox.value == "") {
        textBox.value = "Enter Here";
}
});

// filter key down event. 
searchBox.addEventListener('input', filter);

//item from the completed section 
//itemsCompleted.addEventListener('click', 23);

//load saved and unsaved items. 
//document.addEventListener('DOMContentLoaded', UI.getToDo);
//apiAllToDos
document.addEventListener('DOMContentLoaded', API.apiAllToDos);
//document.addEventListener('DOMContentLoaded', UI.getToDoDeleted);

// when submit is pressed
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const itemToAdd = textBox.value;
    //console.log(itemToAdd);
    var itemToAddFiltered = itemToAdd.replace(/\//g, "-");

    //sending it to UI to create the new item elemnet
    UI.addItemToUI(itemToAddFiltered, 'complete', '');
    //storing as a string just the text
    //Storage.addItemToStorage(itemToAdd);
    cl(itemToAddFiltered);
    API.apiActions("notCompleted", itemToAddFiltered);
    API.apiSave();

});
