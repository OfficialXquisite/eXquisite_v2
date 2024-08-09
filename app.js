window.Telegram.WebApp.ready();

window.onload = function() {
    // Access user data from Telegram WebApp
    const user = window.Telegram.WebApp.initDataUnsafe;
    const userId = user?.user?.id;
    const username = user?.user?.username || "Username";

    // Set username
    document.getElementById('username').textContent = username;

    // Fetch user-specific data from the backend
    fetch(`https://534f-102-90-58-194.ngrok-free.app/api/user_data/${userId}`)
        .then(response => response.json())
        .then(data => {
            const points = data.points || 0;
            const tasksDone = data.tasks_done || 0; // Adjusted to match the data key

            document.getElementById('points').textContent = points;
            document.getElementById('tasksDone').textContent = tasksDone;
        });

    // Handle task completion
    document.querySelectorAll('.complete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const taskId = this.getAttribute('data-task');
            const taskElement = document.getElementById(taskId);

            if (!taskElement.classList.contains('completed')) {
                // Update task status
                let points = parseInt(document.getElementById('points').textContent);
                let tasksDone = parseInt(document.getElementById('tasksDone').textContent);

                points += 10;
                tasksDone += 1;
                taskElement.classList.add('completed');
                this.textContent = 'Completed';
                document.getElementById('points').textContent = points;
                document.getElementById('tasksDone').textContent = tasksDone;

                // Send updated data to server
                sendDataToServer(userId, points, tasksDone);
            }
        });
    });
};

function sendDataToServer(userId, points, tasksDone) {
    fetch('https://534f-102-90-58-194.ngrok-free.app/api/update_user_data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, points, tasksDone })
    }).then(response => {
        if (!response.ok) {
            console.error('Failed to update data:', response.statusText);
        }
    }).catch(error => {
        console.error('Error:', error);
    });
}
