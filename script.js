const toDoBoard = document.getElementById('todo-board')
const addBtn = document.getElementById('add-btn')
const boards = document.querySelectorAll('.board')
const countToDo = document.getElementById('count-toDo')


boards.forEach((board)=>{
    board.addEventListener('dragover',(e)=>{
        e.preventDefault()
        
    })
    board.addEventListener('drop',(e)=>{
        e.preventDefault()
        const flyingElement = document.querySelector('.flying')
        board.appendChild(flyingElement)
        const countTask = board.getElementsByTagName('span')[0];
        countTask.innerText = board.children.length-1;
    })

})

function attachDragEvent(item){
    item.addEventListener('dragstart',()=>{
        item.classList.add('flying')
        const sourceParent = item.parentElement;
        item.setAttribute('source-parent',sourceParent.id);
  
    })
    item.addEventListener('dragend',()=>{
        item.classList.remove('flying');
        const sourceParent = document.getElementById(item.getAttribute('source-parent'))
        const countTask = sourceParent.getElementsByTagName('span')[0]
        countTask.innerText = sourceParent.children.length-1
    })
}

function addTask(){
    const taskData = prompt(`Enter task`);
    if(!taskData){
        return
    }
    let taskItem = document.createElement('p');
    taskItem.textContent = taskData;
    addDelBtn(taskItem);
    addEditBtn(taskItem);
    taskItem.classList.add('tasks');
    taskItem.setAttribute('draggable',true);
    toDoBoard.appendChild(taskItem);
    attachDragEvent(taskItem);
    countToDo.innerText = toDoBoard.children.length-1;

}

function addDelBtn(task){
    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.classList.add('delBtn');
    task.appendChild(delBtn);
    delBtn.addEventListener('click',()=>{
        const parentBoard = task.parentElement;
        task.remove();
        const countEle = parentBoard.getElementsByTagName('span')[0];
        countEle.innerText = parentBoard.children.length-1;
    })
}

function addEditBtn(task){
    let editBtn = document.createElement('button');
    editBtn.textContent = '✍️';
    editBtn.classList.add('editBtn');
    task.appendChild(editBtn);
    editBtn.addEventListener('click',()=>{
        const taskData = prompt('enter new task');
        if(taskData){
            task.firstChild.nodeValue = taskData;

        }
    })
}

addBtn.addEventListener('click', ()=>{
    addTask()

})


