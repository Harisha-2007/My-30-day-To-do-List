let selectedDay = null;

const calendar = document.getElementById("calendar");

// Create 30 days
for (let i = 1; i <= 30; i++) {
    let div = document.createElement("div");
    div.className = "day";
    div.innerText = "Day " + i;

    div.onclick = () => {
        selectedDay = i;
        document.getElementById("selectedDate").innerText = "Day " + i;
        loadTasks();
    };

    calendar.appendChild(div);
}

// Add Task
function addTask() {
    let input = document.getElementById("taskInput");

    if (!selectedDay) {
        alert("Please select a day first!");
        return;
    }

    let taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let key = "day" + selectedDay;
    let tasks = JSON.parse(localStorage.getItem(key)) || [];

    tasks.push({
        text: taskText,
        status: 0 // 0 = Incomplete
    });

    localStorage.setItem(key, JSON.stringify(tasks));

    input.value = "";
    loadTasks();
}

// Load Tasks
function loadTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    if (!selectedDay) return;

    let key = "day" + selectedDay;
    let tasks = JSON.parse(localStorage.getItem(key)) || [];

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        let statusText = "";

        if (task.status === 0) {
            statusText = "Incomplete";
        } else if (task.status === 1) {
            statusText = "Partially Completed";
        } else {
            statusText = "Completed";
        }

        li.innerHTML = `
            <div>
                <span style="text-decoration:${task.status === 2 ? 'line-through' : 'none'}">
                    ${task.text}
                </span>
                <br>
                <small>${statusText}</small>
            </div>

            <div>
                <button onclick="changeStatus(${index})">
                    Change Status
                </button>

                <button onclick="deleteTask(${index})">
                    Delete
                </button>
            </div>
        `;

        list.appendChild(li);
    });
}

// Change Status
function changeStatus(index) {
    let key = "day" + selectedDay;
    let tasks = JSON.parse(localStorage.getItem(key)) || [];

    tasks[index].status = (tasks[index].status + 1) % 3;

    localStorage.setItem(key, JSON.stringify(tasks));

    loadTasks();
}

// Delete Task
function deleteTask(index) {
    let key = "day" + selectedDay;
    let tasks = JSON.parse(localStorage.getItem(key)) || [];

    tasks.splice(index, 1);

    localStorage.setItem(key, JSON.stringify(tasks));

    loadTasks();
}