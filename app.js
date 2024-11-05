window.onload = function() {
    // Ensure Telegram WebApp is available and initialized
    if (window.Telegram && window.Telegram.WebApp) {
        const webApp = window.Telegram.WebApp;
        const user = webApp.initDataUnsafe?.user;

        // Check if we have user data
        if (user && user.username) {
            // Extract user details
            const userId = user.id;
            const username = user.username;
            const firstName = user.first_name || "User";
            const profilePicUrl = user.photo_url;

            // Display the username and profile photo if available
            document.getElementById('userName').textContent = `Welcome, ${username || firstName}!`;
            if (profilePicUrl) {
                document.getElementById('profilePic').src = profilePicUrl;
            }

            // Fetch user-specific data from Firebase or your server
            fetchUserData(userId);
        } else {
            console.error('User data is not available or incomplete.');
            document.getElementById('userName').textContent = "Welcome, User!";
        }
    } else {
        console.error('Telegram WebApp SDK is not available.');
    }
};

// Function to fetch user-specific data from your server or Firebase
function fetchUserData(userId) {
    fetch(`https://exquisitev2.urbanson.tech/data/${userId}`)
        .then(response => response.json())
        .then(data => {
            const points = data.points || 0;
            document.getElementById('points').textContent = points;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

// Optional: Function to send data updates back to your server or Firebase
function sendDataToServer(userId, points) {
    fetch('https://exquisitev2.urbanson.tech/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, points })
    })
    .then(response => response.json())
    .then(data => console.log('Data successfully sent:', data))
    .catch(error => console.error('Error sending data:', error));
}
