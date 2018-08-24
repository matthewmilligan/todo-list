
//create data variable with empty todo and completed arrays
//check for localStorage data then get Items to display in arrays, else return empty arrays
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
  todo: [],
  completed: []
};

// Remove and complete icons in SVG format
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

renderTodoList ();

//click action of button with ID='add'
//delcare the variable value
//if value exists, run addItemTodo function (see addItemTodo function)
document.getElementById('add').addEventListener('click', function() {
  var value = document.getElementById('item').value;

      if (!value) {
        validation();
      }

    if (value) {
      addItem(value);
    }

});

document.getElementById('item').addEventListener('keydown', function (e) {
  var value = this.value;

  if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) {
    addItem(value);
    document.getElementById('item').value = '';
  }

  if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value == '') {
    validation();
  }
});

document.getElementById('sort').addEventListener('click', function() {
  //TODO call Sort function
  sortList();
});

//Add items to the TODO list. Write this function out FIRST
function addItemTodo(text, completed) {
  var list = (completed) ? document.getElementById('completed'):document.getElementById('todo');

  var item = document.createElement('li');
  item.innerText = text;

  //Create the DIV where the Remove and Completed Buttons live
  var buttons = document.createElement('div');
  buttons.classList.add('buttons');

  //Create the Remove button element
  var remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = removeSVG;

  // Add click event for removing item
  remove.addEventListener('click', removeItem);

  // Create the Complete button element
  var complete = document.createElement('button');
  complete.classList.add('complete');
  complete.innerHTML = completeSVG;

  // Add click event for completing item
  complete.addEventListener('click', completeItem);


  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons);

  list.insertBefore(item, list.childNodes[0]);
}

function addItem(value) {
  addItemTodo(value);
  document.getElementById('item').value = '';

  $('#sort').prop('disabled', false);

  data.todo.push(value);
  dataObjectUpdated();
}

function validation(validated) {
  var list = (validated) ? document.getElementById('validate'):document.getElementById('validate');

  var validatedMessage = document.createElement('li');

  var validate = document.createElement('div');
  validate.classList.add('validateBar');

  var message = document.createElement('div');
  message.classList.add('message');
  message.innerText = 'Error: Please enter a task.';

  validatedMessage.appendChild(validate);
  validate.appendChild(message);

  list.insertBefore(validate, list.childNodes[0]);

  setTimeout(function(){
    $('div.validateBar').fadeOut("normal", function(){
      this.remove();
    });
  },3000);
}

function renderTodoList() {
  if (!data.todo.length && !data.completed.length) return;

  for (var i = 0; i < data.todo.length; i++) {
    var value = data.todo[i];
    addItemTodo(value);
  }

  for (var j = 0; j < data.completed.length; j++) {
    var value = data.completed[j];
    addItemTodo(value, true);
  }

}

function dataObjectUpdated() {
  localStorage.setItem('todoList', JSON.stringify(data));
}

//remove TODO item from TODO or Completed list function, IF statement inside function checks if item is in either TODO or Completed
//delcare variables item, parent, id, and value
function removeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
  }

  /*while (data.todo.indexOf(value) < 1) {
    $('#sort').prop('disabled', true);
  }*/

  //update data in localStorage
  dataObjectUpdated();

  parent.removeChild(item);

}

//move TODO item from TODO list to Completed list
function completeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
  }

  dataObjectUpdated();

  var target;

  if (id === 'todo') {
    target = document.getElementById('completed');
  }else {
    target = document.getElementById('todo');
  }

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);

}

function sortList() {
  var list, i, switching, b, shouldSwitch;
  list = document.getElementById("todo");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    b = list.getElementsByTagName("li");
    //Loop through all list-items:
    for (i = 0; i < (b.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*check if the next item should
      switch place with the current item:*/
      if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
        /*if next item is alphabetically
        lower than current item, mark as a switch
        and break the loop:*/
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark the switch as done:*/
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}
