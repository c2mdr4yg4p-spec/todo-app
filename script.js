// To-Do List Application with Local Storage

class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.storageKey = 'todoList';
        this.init();
    }

    init() {
        this.loadTodos();
        this.attachEventListeners();
        this.render();
    }

    attachEventListeners() {
        // Add task
        document.getElementById('addBtn').addEventListener('click', () => this.addTodo());
        document.getElementById('todoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });

        // Action buttons
        document.getElementById('clearCompleted').addEventListener('click', () => this.clearCompleted());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportTasks());
        document.getElementById('importBtn').addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });
        document.getElementById('fileInput').addEventListener('change', (e) => this.importTasks(e));
    }

    addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();

        if (!text) {
            alert('Please enter a task!');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            priority: 'medium',
            createdAt: new Date().toLocaleDateString()
        };

        this.todos.push(todo);
        this.saveTodos();
        input.value = '';
        input.focus();
        this.render();
    }

    deleteTodo(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.todos = this.todos.filter(todo => todo.id !== id);
            this.saveTodos();
            this.render();
        }
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        this.render();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    clearCompleted() {
        if (this.todos.some(t => t.completed)) {
            if (confirm('Clear all completed tasks?')) {
                this.todos = this.todos.filter(t => !t.completed);
                this.saveTodos();
                this.render();
            }
        } else {
            alert('No completed tasks to clear!');
        }
    }

    exportTasks() {
        if (this.todos.length === 0) {
            alert('No tasks to export!');
            return;
        }

        const dataStr = JSON.stringify(this.todos, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `todo-list-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    importTasks(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedTodos = JSON.parse(e.target.result);
                if (!Array.isArray(importedTodos)) {
                    throw new Error('Invalid file format');
                }

                // Merge with existing todos
                const merge = confirm('Merge with existing tasks? (Cancel to replace)');
                if (merge) {
                    this.todos = [...this.todos, ...importedTodos];
                } else {
                    this.todos = importedTodos;
                }

                this.saveTodos();
                this.render();
                alert(`Successfully imported ${importedTodos.length} task(s)!`);
            } catch (error) {
                alert('Error importing file: ' + error.message);
            }
        };
        reader.readAsText(file);
        event.target.value = ''; // Reset file input
    }

    saveTodos() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
    }

    loadTodos() {
        const saved = localStorage.getItem(this.storageKey);
        this.todos = saved ? JSON.parse(saved) : [];
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const active = total - completed;

        document.getElementById('totalCount').textContent = total;
        document.getElementById('activeCount').textContent = active;
        document.getElementById('completedCount').textContent = completed;
    }

    render() {
        const todoList = document.getElementById('todoList');
        const emptyState = document.getElementById('emptyState');
        const filteredTodos = this.getFilteredTodos();

        todoList.innerHTML = '';

        if (filteredTodos.length === 0 && this.todos.length === 0) {
            emptyState.classList.add('show');
        } else {
            emptyState.classList.remove('show');
        }

        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

            li.innerHTML = `
                <input 
                    type="checkbox" 
                    class="todo-checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    onchange="app.toggleTodo(${todo.id})"
                >
                <span class="todo-priority priority-${todo.priority}">${todo.priority}</span>
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <span class="todo-date">${todo.createdAt}</span>
                <button class="delete-btn" onclick="app.deleteTodo(${todo.id})">Delete</button>
            `;

            todoList.appendChild(li);
        });

        this.updateStats();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app
const app = new TodoApp();

// Log welcome message
console.log('%c📝 To-Do List App Ready!', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('Type app.todos to view all tasks or use the UI!');