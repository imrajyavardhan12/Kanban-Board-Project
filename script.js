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


addBtn.addEventListener('click', ()=>{
    const taskData = prompt('Enter task');
    let taskItem = document.createElement('p')
    taskItem.innerText = taskData;
    taskItem.classList.add('tasks')
    taskItem.setAttribute('draggable',true);
    toDoBoard.appendChild(taskItem);
    attachDragEvent(taskItem);
    countToDo.innerText = toDoBoard.children.length-1

})


