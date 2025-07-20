// Lưu vào localStorage
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Lấy từ localStorage
function loadTasks() {
  const data = localStorage.getItem("tasks");
  return data ? JSON.parse(data) : [];
}

// Thêm nhiệm vụ
function addTask() {
  const input = document.getElementById("taskInput");
  const title = input.value.trim();
  if (!title) return;

  const tasks = loadTasks();
  const newTask = {
    id: Date.now(),
    title: title,
    completed: false
  };

  tasks.push(newTask);
  saveTasks(tasks);
  input.value = "";
  renderTasks();
}

// Sửa nhiệm vụ
function editTask(id) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === id);
  if (task) {
    const newTitle = prompt("Sửa nhiệm vụ:", task.title);
    if (newTitle && newTitle.trim()) {
      task.title = newTitle.trim();
      saveTasks(tasks);
      renderTasks();
    }
  }
}


// Xoá nhiệm vụ
function deleteTask(id) {
  let tasks = loadTasks();
  tasks = tasks.filter(t => t.id !== id);
  saveTasks(tasks);
  renderTasks();
}

// Đánh dấu hoàn thành
function toggleComplete(id) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks(tasks);
    renderTasks();
  }
}

// Hiển thị danh sách nhiệm vụ
function renderTasks() {
  const tasks = loadTasks();
  const container = document.getElementById("container-tasks");
  container.innerHTML = `
      <div class='task-list-header'>Danh sách nhiệm vụ</div>
      <table>
        <thead>
          <tr>
            <th>Hoàn thành</th>
            <th>Nhiệm vụ</th>
            <th>Sửa</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody id="task-list">
        </tbody>
      </table>
  `;
  
  const taskList = document.getElementById("task-list");
  tasks.forEach(task => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleComplete(${task.id})">
      </td>
      <td>
        <span style="text-decoration: ${task.completed ? "line-through" : "none"}">${task.title}</span>
      </td>  
      <td>
        <button onclick="editTask(${task.id})">Sửa</button>
      </td>
      <td>
        <button onclick="deleteTask(${task.id})">Xoá</button>
      </td>
    `;
    taskList.appendChild(row);
  });
}


// Gọi khi load trang
window.onload = renderTasks;
