 function addTask() {
      const input = document.getElementById("taskInput");
      const task = input.value.trim();

      if (task === "") return; // ignore empty tasks

      // Create new list item
      const li = document.createElement("li");

      // Create span for task text
      const span = document.createElement("span");
      span.textContent = task;
      span.onclick = function() {
        span.classList.toggle("done"); // toggle completed
      };

      // Create delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = function() {
        li.remove(); // remove task
      };

      // Append everything
      li.appendChild(span);
      li.appendChild(deleteBtn);
      document.getElementById("taskList").appendChild(li);

      // Clear input
      input.value = "";
    }