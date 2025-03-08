const toDoBoard = document.getElementById('todo-board')
const addBtn = document.getElementById('add-btn')
const boards = document.querySelectorAll('.board')
const countToDo = document.getElementById('count-toDo')
let taskArr = []

// maintaining  task on page reload
window.addEventListener('load',()=>{
    let allBoards = document.querySelectorAll('.board');
    allBoards.forEach((board)=>{
        let taskArr = JSON.parse(localStorage.getItem(board.id)) || [];
        taskArr.forEach((i)=>{
            let taskItem = document.createElement('p');
            taskItem.innerText = i;
            taskItem.classList.add('tasks');
            taskItem.setAttribute('draggable',true);
            addDelBtn(taskItem);
            addEditBtn(taskItem);
            attachDragEvent(taskItem);
            board.appendChild(taskItem);
        })
        let countEle = board.getElementsByTagName('span')[0]
        countEle.innerText = board.children.length-1;
    })

})


boards.forEach((board)=>{
    board.addEventListener('dragover',(e)=>{
        e.preventDefault()
        
    })
    board.addEventListener('drop',(e)=>{
        e.preventDefault()
        const task = document.querySelector('.flying')
        const sourceBoardId = task.parentElement.id;
        const targetBoardId = board.id;
        board.appendChild(task)
        //updating source board local storage
        if(sourceBoardId){
            let sourceTaskArr = JSON.parse(localStorage.getItem(sourceBoardId));
            sourceTaskArr.splice(sourceTaskArr.findIndex((x)=>(x == task.firstChild.nodeValue)),1)
            localStorage.setItem(sourceBoardId,JSON.stringify(sourceTaskArr))
        }
 
        const countTask = board.getElementsByTagName('span')[0];
        countTask.innerText = board.children.length-1;
        //updating target board local storage 
        let targetBoardArr = JSON.parse(localStorage.getItem(targetBoardId)) || [];
        targetBoardArr.push(task.firstChild.nodeValue);
       localStorage.setItem(targetBoardId,JSON.stringify(targetBoardArr));

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
    taskArr.push(taskData)
    localStorage.setItem(taskItem.parentElement.id,JSON.stringify(taskArr))
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
        let taskArr = JSON.parse(localStorage.getItem(task.parentElement.id)) || []
        taskArr.splice(taskArr.findIndex((x)=>(x == task.firstChild.nodeValue)),1)
        localStorage.setItem(`${task.parentElement.id}`,JSON.stringify(taskArr))
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
        let taskArr = JSON.parse(localStorage.getItem(task.parentElement.id)) || []
        const index = taskArr.findIndex((x)=>(x == task.firstChild.nodeValue))
        const taskData = prompt('enter new task');
        if(taskData){
            task.firstChild.nodeValue = taskData;
            taskArr[index] = taskData;
        }
        localStorage.setItem(`${task.parentElement.id}`,JSON.stringify(taskArr))

    })
}

addBtn.addEventListener('click', ()=>{
    addTask()

})


