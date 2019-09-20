const inputElement = document.getElementById('input');
const ulElement = document.getElementById('list');
const actionPanel1 = document.getElementById('actionPanel1');
const actionPanel2 = document.getElementById('actionPanel2');

let todoList = [];

inputElement.addEventListener('keydown', event => {
    if (event.keyCode === 13 && inputElement.value){
        todoList.unshift({
           content: inputElement.value,
           done: false,
           selected: false
        });
        inputElement.value = '';

        upgradeView();
        
    }
})

function upgradeView () {
    ulElement.innerHTML = '';
    // for (const todoItem of todoList) {
    for (let index = 0; index < todoList.length; index++){

        const todoItem = todoList[index];

        const liElement = document.createElement('li');
        liElement.className = 'list-group-item';
        ulElement.append(liElement);
        
        const divElement = document.createElement('div');
        divElement.className = 'form-group form-check';
        liElement.append(divElement);
        
        const checkboxElement = document.createElement('input');
        divElement.append(checkboxElement);
        checkboxElement.type = 'checkbox';
        checkboxElement.className = 'form-check-input';
        checkboxElement.id = `todoItem${index}`;
        checkboxElement.checked = todoItem.selected;
        
        
        const labelElement = document.createElement('label');
        divElement.append(labelElement);
        labelElement.className = 'form-check-label';

        if (todoItem.done) {
            labelElement.className += ' todoDone';
        }

        labelElement.setAttribute = ('for', `todoItem${index}`);
        labelElement.innerHTML = todoItem.content;
        
        if (!todoItem.done){
            const buttonElement = document.createElement('button');
            divElement.append(buttonElement);
            buttonElement.type = 'button';
            buttonElement.className = 'btn btn-outline-success';
            buttonElement.innerHTML = 'Done';
            buttonElement.style = 'float: right'

            buttonElement.addEventListener('click', () => {
            todoItem.done = !todoItem.done;
            upgradeView();
            })
        }
        else {
            const buttonRemElement = document.createElement('buttonRem');
            divElement.append(buttonRemElement);
            buttonRemElement.type = 'button';
            buttonRemElement.className = 'btn btn-outline-danger';
            buttonRemElement.innerHTML = 'Remove';
            buttonRemElement.style = 'float: right'

            buttonRemElement.addEventListener('click', () =>{

            todoList = todoList.filter(currenttodoItem => currenttodoItem !== todoItem );
            upgradeView();
            
            })
        }

        checkboxElement.addEventListener('change', () => {
            todoItem.selected = checkboxElement.checked;
            upgradeView();

        })
    }

    const someSelected = todoList.some(todoItem => todoItem.selected)
    if (someSelected){
        actionPanel1.style.display = 'none';
        actionPanel2.style.display = 'block';
    } else {
        actionPanel1.style.display = 'flex';
        actionPanel2.style.display = 'none';
    }
}

document.getElementById('doneAction').addEventListener('click',() =>{
    for (const todoItem of todoList){
        if (todoItem.selected){
            todoItem.done  = true;
            todoItem.selected = false;

        }
    }
    upgradeView();
});

document.getElementById('restoreAction').addEventListener('click',() =>{
    for (const todoItem of todoList){
        if (todoItem.selected){
            todoItem.done  = false;
            todoItem.selected = false;

        }
    }
    upgradeView();
});
    
document.getElementById('removeAction').addEventListener('click',() =>{
    todoList = todoList.filter(todoItem => !todoItem.selected);

    upgradeView();
});

document.getElementById('test').addEventListener('click',() => {
    for (const todoItem of todoList){
        todoItem.selected = true;
    }

    upgradeView();
    
})
