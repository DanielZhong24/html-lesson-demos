const tasks = document.querySelectorAll(".task");
const columns = document.querySelectorAll(".column");

let draggedTask = null;


function addDragEvents(task){
    task.addEventListener("dragstart", ()=>{
        draggedTask = task;
        task.classList.add('dragging');
    });

    task.addEventListener("dragend", ()=>{

        draggedTask = null;
        task.classList.remove('dragging');

    });
}

function createTaskElement(taskText,duedate){
    const task  = document.createElement("div");
    task.className = 'task';
    task.setAttribute("draggable",'true');

    const textSpan = document.createElement("span");
    textSpan.textContent = taskText;
    const date = document.createElement("span");
    date.textContent = `${duedate}`;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = '❌';
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click",()=>{
        task.remove();
        saveTasks();
    });

    task.appendChild(textSpan);
    task.appendChild(date);
    task.appendChild(deleteBtn);
    addDragEvents(task);

    return task;
}

columns.forEach(column =>{
    column.addEventListener("dragover", e=>{
        e.preventDefault();
        column.classList.add("drag-over");
    });
    column.addEventListener("dragleave", e=>{
        column.classList.remove("drag-over");
    });
    column.addEventListener("drop",()=>{
        if(draggedTask){
            column.appendChild(draggedTask);
            saveTasks();
        }

        column.classList.remove('drag-over');
    });
});

function addTask(){
    const input = document.getElementById("task-input");
    const taskText = input.value.trim();
    const date = document.getElementById("due-date");
    const dateStamp = date.value;
    console.log(dateStamp);
    if(taskText === "" || dateStamp===""){
        alert("Please make sure that nothing is empty");
        return;
    }


    //write a code that create a div, with inner text "Task 10"
    const task = createTaskElement(taskText,dateStamp);
    document.querySelector('[data-column="todo"]').appendChild(task);

    input.value = "";

    saveTasks();
    loadTasks();
}


function saveTasks(){
    const allTasks = [];
    columns.forEach(column=>{
        const columnName = column.getAttribute('data-column');
        const taskInColumn = column.querySelectorAll('.task');
        taskInColumn.forEach(task=>{
            const text = task.querySelectorAll("span")[0].textContent;
            const date = task.querySelectorAll("span")[1].textContent;

            allTasks.push({
                text:text,
                date:date,
                column:columnName
            });
        });
    });

    localStorage.setItem('tasks',JSON.stringify(allTasks));

}

function loadTasks(){
    columns.forEach(column=>{
        column.querySelectorAll('.task').forEach(task=>task.remove());
    });
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const today = new Date();

    savedTasks.forEach(taskData=>{
        const task  = createTaskElement(taskData.text,taskData.date);   
        const dueDate = new Date(taskData.date);
        const daysLeft = Math.round((dueDate-today)/(3600000*24));
        // const daysLeft = 1.5;
        console.log(daysLeft);
        if(daysLeft < 0){
            task.classList.add('already-passed');
        }
        //close to the due date - 2-1 days
        else if(daysLeft>=0 && daysLeft<=5){
            task.classList.add('close-to-duedate');
        }
        else if(daysLeft > 5 && daysLeft<=10){
            task.classList.add('neutral');

        }        
        else if(daysLeft > 10 && daysLeft<=14){
            task.classList.add('not-so-close-to-duedate');

        }else{
            task.classList.add('just-started');

        }

        document.querySelector(`[data-column="${taskData.column}"]`).appendChild(task);

    });
}
const btn = document.getElementById("btn");
btn.addEventListener("click",addTask);
loadTasks();

