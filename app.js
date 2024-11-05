window.onload = function() {
    // Check if Telegram WebApp is available
    if (window.Telegram && window.Telegram.WebApp) {
        // Initialize the Telegram WebApp and retrieve user data
        const webApp = window.Telegram.WebApp;
        const user = webApp.initDataUnsafe.user;

        // Check if we have user data
        if (user) {
            const userId = user.id;
            const username = user.username || user.first_name || "User";

            // Display the username and profile photo if available
            document.getElementById('userName').textContent = `Welcome, ${username}!`;
            if (user.photo_url) {
                document.getElementById('profilePic').src = user.photo_url;
            }

            // Fetch user-specific data from Firebase or your server
            if (userId) {
                fetchUserData(userId);
            }

        } else {
            console.error('User data is not available.');
        }
    } else {
        console.error('Telegram WebApp is not available.');
    }
};

// Function to fetch user-specific data from your server or Firebase
function fetchUserData(userId) {
    fetch(`https://exquisitev2.urbanson.tech/data/${userId}`)
        .then(response => response.json())
        .then(data => {
            const points = data.points || 0;
            const tasksDone = data.tasksDone || 0;

            document.getElementById('points').textContent = points;
            document.getElementById('tasksDone').textContent = tasksDone;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

// Optional: Function to send data updates back to your server or Firebase
function sendDataToServer(userId, points, tasksDone) {
    fetch('https://exquisitev2.urbanson.tech/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, points, tasksDone })
    })
    .then(response => response.json())
    .then(data => console.log('Data successfully sent:', data))
    .catch(error => console.error('Error sending data:', error));
}
