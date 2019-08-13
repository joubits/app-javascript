//Abstract functionality

// Task Class: Represent a Task
class Task {
    constructor(title, user, description) {
        this.title = title;
        this.user = user;
        this.description = description;
    }
}

// UI Class: Handle UI components
class UI {
    static displayTasks() {
        // const storeTasks = [
        //     {
        //         title: 'Learn Javascript',
        //         user: 'Jou Downs',
        //         description: 'A lot of description here...' 
        //     },
        //     {
        //         title: 'Learn Angular',
        //         user: 'Jou Downs',
        //         description: 'A lot of description here 2..' 
        //     }
        // ];
        const taskList = Store.getTasks();
        taskList.forEach( (task) => { UI.addTaskList(task) });
    }
    // Add new row in listTask
    static addTaskList(task) {
        const tbody = document.querySelector('#task-list');
        const row = document.createElement('tr');
        row.innerHTML = `
                <td>${ task.title }</td>
                <td>${ task.user }</td>
                <td>${ task.description }</td>
                <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        tbody.appendChild(row);
    }

    //get form data and add new task
    static newTask(e) {
        //prevent default
        e.preventDefault();
        let title = document.querySelector("#title").value;
        let user = document.querySelector("#user").value;
        let description = document.querySelector("#description").value;

        if( title === ''|| user === ''|| description === '') {
            alert('Please fill required fields...');
        } else {
            const task = new Task(title, user, description);
            UI.addTaskList(task);
            Store.addTask(task);
        }
    }

    // Remove a task from Table
    static deleteTask(el) {
        //console.log('Delete task in function');
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
}


// Storage Functionality
class Store {
    static getTasks() {
        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }

    static addTask(task){
        const tasks = Store.getTasks();
        tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static removeTask(title) {
        const tasks = Store.getTasks();

        tasks.forEach((task, index) => {
            if(task.title == title) {
                tasks.splice(index, 1);
            }
        });

         localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// EventHandler to Display a task
document.addEventListener('DOMContentLoaded', UI.displayTasks);

// EventHandler to Add a task
document.querySelector('#task-form').addEventListener('submit', (e) => { UI.newTask(e) });

// EventHandler to Remove a task
document.querySelector('#task-list').addEventListener('click', (e) => {
    //to send the reference of delete button send e.target
    // Remove Task in UI
    UI.deleteTask(e.target);
    
    //get content of task
    //e.target.parentElement.previousElementSibling.textContent
    title = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent

    // Remove Task in Store
    Store.removeTask(title)
});

