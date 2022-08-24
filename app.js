// Define UI Vars
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks)
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task events
    taskList.addEventListener('click', removeTask)
    // Clear all tasks elements
    clearBtn.addEventListener('click', clearTasks)
    // Filter tasks
    filter.addEventListener('keyup', filterTasks)
}

// Add task
function addTask(e) {
    e.preventDefault();
    if (taskInput.value === ""){
        alert('Add a task')
    } else if (taskInput.value !== "") {
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item'
        // Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content'
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>'
        // Append the link to li
        li.appendChild(link)

        // Append li to ul
        taskList.appendChild(li)
        console.log('heheh')
        // Store in local storage
        storeTaskInLocalStorage(taskInput.value);
        //Clear the input
        taskInput.value = ''
    }
}

// Store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Get tasks from local storage
function getTasks() {
    let tasks; 
    if (localStorage.getItem('tasks')) {
        if (localStorage.getItem('tasks') === null) {
            tasks=[]
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'))
        }

        tasks.forEach((task) => {
            // Create li element
            const li = document.createElement('li');
            // Add class
            li.className = 'collection-item'
            // Create text node and append to li
            li.appendChild(document.createTextNode(task));
            // Create new link element
            const link = document.createElement('a');
            // Add class
            link.className = 'delete-item secondary-content'
            // Add icon html
            link.innerHTML = '<i class="fa fa-remove"></i>'
            // Append the link to li
            li.appendChild(link)
    
            // Append li to ul
            taskList.appendChild(li)
        })
    }
    
    
}


// Delete task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if(confirm("Are you sure?")) {
            const task = e.target.parentElement.parentElement
            console.log(task)
            task.remove()
            // Remove from local storage
            removeTasksFromLocalStorage(task)
            
        }
    }
}

// Clear all tasks
function clearTasks (e) {
    taskList.innerHTML = null
    
    // Faster
    while(taskList.firstChild) {
        taskList.remove(taskList.firstChild)
    }
    // Clear local storage
    localStorage.clear()

}

// Filter tasks
function filterTasks(e) {
    const filterText = this.value.toLowerCase()
    
    document.querySelectorAll('.collection-item').forEach((task) => {
        const item = task.textContent;
        if (item.toLowerCase().indexOf(filterText) != -1) {
            task.style.display = 'block'
        } else {
            task.style.display = 'none'
        
            
        }
    });
}

//Remove from local storage 
function removeTasksFromLocalStorage(taskItem) {
    let tasks; 
    if (localStorage.getItem('tasks') === null) {
        tasks=[]
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach((task, index) => {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}