# 📝 To-Do List Application

A modern, feature-rich to-do list app with local storage functionality. Stay organized and productive with an intuitive interface and powerful task management features.

## ✨ Features

### Task Management
- ✅ **Add Tasks** - Quick task creation with Enter key support
- 🗑️ **Delete Tasks** - Remove tasks with confirmation
- ☑️ **Mark Complete** - Toggle task completion status
- 🏷️ **Priority Levels** - Set tasks as High, Medium, or Low priority
- 📅 **Auto Timestamps** - Tasks automatically record creation date

### Filtering & Organization
- 🔍 **Filter Views** - View All, Active, or Completed tasks
- 📊 **Statistics** - Real-time counts of total, active, and completed stats
- 🧹 **Clear Completed** - Batch delete all finished tasks

### Data Management
- 💾 **Local Storage** - Tasks persist across browser sessions
- 📤 **Export Tasks** - Download tasks as JSON file
- 📥 **Import Tasks** - Upload previously exported tasks
- 🔄 **Merge or Replace** - Choose to merge imported tasks or replace existing ones

### User Experience
- 🎨 **Modern Design** - Beautiful gradient UI with smooth animations
- 📱 **Responsive Layout** - Works perfectly on mobile, tablet, and desktop
- ⌨️ **Keyboard Shortcuts** - Press Enter to add tasks
- 🎯 **Smooth Animations** - Fade-in effects and hover interactions

## 🚀 Getting Started

### Option 1: Open Directly
Simply open `index.html` in your web browser.

### Option 2: Use a Local Server
For better performance and to test import/export features:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 📖 How to Use

### Adding a Task
1. Type your task in the input field
2. Click "Add Task" or press **Enter**
3. Your task will appear in the list

### Completing a Task
- Click the checkbox next to a task to mark it as complete
- The task text will be crossed out
- It will still count in statistics

### Deleting a Task
1. Click the "Delete" button on any task
2. Confirm when prompted
3. The task will be permanently removed

### Filtering Tasks
- **All** - View all tasks
- **Active** - Show only incomplete tasks
- **Completed** - Show only finished tasks

### Managing Tasks

**Clear Completed**
- Removes all completed tasks at once
- Requires confirmation to prevent accidents

**Export Tasks**
- Downloads your tasks as a `.json` file
- Filename includes the current date
- Great for backups

**Import Tasks**
- Upload a previously exported `.json` file
- Choose to merge with existing tasks or replace them
- Supports any number of tasks

## 🎨 Design Features

### Color Scheme
- **Primary**: Purple gradient (#667eea to #764ba2)
- **Priority High**: Red (#c62828)
- **Priority Medium**: Orange (#e65100)
- **Priority Low**: Green (#2e7d32)

### Responsive Breakpoints
- Desktop: Full layout with all features
- Tablet: Optimized spacing (600px max-width)
- Mobile: Stacked buttons, wrapped text, optimized touch targets

## 💾 Local Storage

Your tasks are automatically saved to browser local storage. This means:
- ✅ Tasks persist when you close the browser
- ✅ Works offline
- ⚠️ Clearing browser data will delete tasks (export first!)
- ⚠️ Storage is per-browser (not synced across devices)

### Storage Key
Tasks are stored under the key: `todoList`

To view tasks in the browser console:
```javascript
JSON.parse(localStorage.getItem('todoList'))
```

## 🔧 Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Flexbox layout, gradients, animations
- **Vanilla JavaScript** - ES6+ class-based architecture
- **Local Storage API** - Persistent data storage

## 📁 File Structure

```
todo-app/
├── index.html      # HTML structure
├── style.css       # Styling and responsive design
├── script.js       # Application logic
└── README.md       # Documentation
```

## 🎓 Code Examples

### Access Tasks Programmatically
```javascript
// View all tasks
console.log(app.todos);

// Get active tasks
console.log(app.getFilteredTodos());

// Manually add a task
app.todos.push({
    id: Date.now(),
    text: 'My task',
    completed: false,
    priority: 'high',
    createdAt: new Date().toLocaleDateString()
});
app.saveTodos();
app.render();
```

### Export Tasks Manually
```javascript
// In browser console:
JSON.stringify(app.todos, null, 2)
```

## 🐛 Troubleshooting

### Tasks disappeared
- **Cause**: Browser data was cleared
- **Solution**: Check if you have a backup `.json` file to import
- **Prevention**: Regularly export tasks

### Import not working
- **Cause**: File format is incorrect
- **Solution**: Only import `.json` files exported from this app
- **Check**: File should contain a JSON array of task objects

### App looks broken on mobile
- **Cause**: Viewport meta tag not set
- **Solution**: Make sure you're using the latest version of `index.html`
- **Try**: Hard refresh (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac)

### Keyboard shortcuts not working
- **Cause**: Focus not on input field
- **Solution**: Click in the input field first
- **Note**: Only Enter key works (for adding tasks)

## 🎯 Future Enhancements

Potential features for future versions:
- 🔄 Drag-and-drop to reorder tasks
- 🏆 Categories/Tags for organizing tasks
- ⏰ Due dates and reminders
- 🔔 Browser notifications
- 🌙 Dark mode
- ☁️ Cloud sync across devices
- 🔐 Password protection
- 📊 Progress charts

## 📝 License

Public domain. Use, modify, and distribute freely.

## 💡 Tips

1. **Backup regularly** - Export your tasks weekly
2. **Use priorities** - Help focus on what matters most
3. **Clear completed** - Keep your list organized
4. **Mobile-friendly** - Works great on phones for on-the-go task management
5. **No accounts needed** - Complete privacy with local storage

---

**Enjoy organizing your tasks!** 📋✨
