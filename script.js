document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-button');
    const taskList = document.getElementById('task-list');
    const taskCount = document.querySelector('.task-count');
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const clearCompletedBtn = document.getElementById('clear-completed');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateTaskCount() {
        const remainingTasks = tasks.filter(task => !task.completed).length;
        taskCount.textContent = `${remainingTasks} مهام متبقية`;
    }

    function createTaskElement(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <div class="task-actions">
                <i class="fas fa-trash delete-btn"></i>
            </div>
        `;
        
        if (task.completed) {
            li.classList.add('completed');
        }

        // Toggle completion
        li.addEventListener('click', (e) => {
            if (!e.target.classList.contains('delete-btn')) {
                task.completed = !task.completed;
                li.classList.toggle('completed');
                saveTasks();
                updateTaskCount();
            }
        });

        // Delete task
        li.querySelector('.delete-btn').addEventListener('click', () => {
            tasks = tasks.filter(t => t !== task);
            li.remove();
            saveTasks();
            updateTaskCount();
        });

        return li;
    }

    function addTask(text) {
        if (text.trim()) {
            const task = {
                id: Date.now(),
                text: text,
                completed: false
            };
            tasks.push(task);
            taskList.appendChild(createTaskElement(task));
            saveTasks();
            updateTaskCount();
        }
    }

    function filterTasks(filterType) {
        const taskItems = taskList.getElementsByTagName('li');
        Array.from(taskItems).forEach(item => {
            switch(filterType) {
                case 'all':
                    item.style.display = '';
                    break;
                case 'active':
                    item.style.display = item.classList.contains('completed') ? 'none' : '';
                    break;
                case 'completed':
                    item.style.display = item.classList.contains('completed') ? '' : 'none';
                    break;
            }
        });
    }

    // Add task event listeners
    addButton.addEventListener('click', () => {
        addTask(taskInput.value);
        taskInput.value = '';
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask(taskInput.value);
            taskInput.value = '';
        }
    });

    // Filter buttons event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterTasks(button.getAttribute('data-filter'));
        });
    });

    // Clear completed tasks
    clearCompletedBtn.addEventListener('click', () => {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
        updateTaskCount();
    });

    // Initial render
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            taskList.appendChild(createTaskElement(task));
        });
        updateTaskCount();
    }

    renderTasks();
});
