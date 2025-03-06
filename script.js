const toDoBoard = document.getElementById('todo-board')
const addBtn = document.getElementById('add-btn')
const boards = document.querySelectorAll('.board')



boards.forEach((board)=>{
    board.addEventListener('dragover',(e)=>{
        e.preventDefault()

    })
    board.addEventListener('drop',(e)=>{
        e.preventDefault()
        const flyingElement = document.querySelector('.flying')
        board.appendChild(flyingElement)
    })

})

function attachDragEvent(item){
    item.addEventListener('dragstart',()=>{
        item.classList.add('flying')
    })
    item.addEventListener('dragend',()=>{
        item.classList.remove('flying')
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
    
})


