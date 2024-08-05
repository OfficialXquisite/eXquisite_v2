// Initialize Telegram Web App
window.Telegram.WebApp.onEvent('mainButtonClicked', function() {
    // Handle main button click if needed
});

window.onload = function() {
    // Get user data from Telegram
    const user = window.Telegram.WebApp.initDataUnsafe;
    document.getElementById('username').textContent = user.username || "Username";
    
    // Example of setting initial points and tasks done
    let points = 0;
    let tasksDone = 0;

    // Update points and tasks done
    document.getElementById('points').textContent = points;
    document.getElementById('tasksDone').textContent = tasksDone;

    // Handle task completion
    document.querySelectorAll('.complete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const taskId = this.getAttribute('data-task');
            // Update task status and points
            if (!document.getElementById(taskId).classList.contains('completed')) {
                points += 10;
                tasksDone += 1;
                document.getElementById(taskId).classList.add('completed');
                this.textContent = 'Completed';
                document.getElementById('points').textContent = points;
                document.getElementById('tasksDone').textContent = tasksDone;
            }
        });
    });
};
