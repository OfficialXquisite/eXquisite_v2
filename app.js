// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4DVbIQUzhNSczujsP27MwTE6NfifB8ew",
  authDomain: "promote-pro-8f9aa.firebaseapp.com",
  databaseURL: "https://promote-pro-8f9aa-default-rtdb.firebaseio.com",
  projectId: "promote-pro-8f9aa",
  storageBucket: "promote-pro-8f9aa.firebasestorage.app",
  messagingSenderId: "553030063178",
  appId: "1:553030063178:web:13e2b89fd5c6c628ccc2b3",
  measurementId: "G-KZ89FN869W"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Initialize Telegram Web App
Telegram.WebApp.ready();

// Get Telegram user information
const telegramUser = Telegram.WebApp.initDataUnsafe.user;

if (telegramUser) {
    const userId = telegramUser.id;
    const username = telegramUser.username;

    // Display welcome message
    document.getElementById("welcomeMessage").innerText = `Welcome, ${username}!`;

    // Retrieve or create user profile in Firebase Firestore
    const userRef = db.collection("users").doc(userId.toString());

    userRef.get().then((doc) => {
        if (doc.exists) {
            const userData = doc.data();
            document.getElementById("userPoints").innerText = userData.points || 0;
        } else {
            // Create a new user profile if it doesn't exist
            userRef.set({
                username: username,
                points: 0,
                tasks: {
                    "task-1": { status: "Pending", link: "" }
                }
            });
        }
    }).catch((error) => {
        console.error("Error getting user data:", error);
    });
}

// Function to handle task submission
function submitTask(taskId, inputId) {
    const taskLink = document.getElementById(inputId).value;
    const userRef = db.collection("users").doc(telegramUser.id.toString());

    if (taskLink) {
        userRef.update({
            [`tasks.${taskId}.link`]: taskLink,
            [`tasks.${taskId}.status`]: "On review"
        }).then(() => {
            document.getElementById(inputId).disabled = true;
            document.querySelector(`#${taskId} button`).innerText = "On review";
        }).catch((error) => {
            console.error("Error updating task:", error);
        });
    }
}
