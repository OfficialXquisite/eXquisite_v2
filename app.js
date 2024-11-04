window.onload = function () {
    if (window.Telegram && window.Telegram.WebApp) {
        const user = window.Telegram.WebApp.initDataUnsafe.user;
        // const userId = user?.id;
        // const username = user?.username || "Username";
      
        const userId = user?.user?.id;
        const username = user?.user?.username || "Username";

        document.getElementById("userName").textContent = `${username}`;

        if (userId) {
            const userRef = doc(db, "users", userId);

            // Fetch user data
            getDoc(userRef).then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById("points").textContent = userData.points || 0;
                } else {
                    // If no user data, initialize with zero points
                    setDoc(userRef, { points: 0 });
                }
            });

            // Handle task submission
            document.querySelectorAll(".submit-btn").forEach((button) => {
                button.addEventListener("click", async function () {
                    const taskId = this.getAttribute("data-task");
                    const taskLinkInput = document.getElementById(`taskLink${taskId.slice(-1)}`);
                    const taskStatus = document.getElementById(`status${taskId.slice(-1)}`);

                    const link = taskLinkInput.value;
                    if (link) {
                        const taskData = { link, status: "On review" };
                        await setDoc(doc(userRef, "tasks", taskId), taskData);

                        // Update UI
                        taskStatus.textContent = "On review";
                        button.disabled = true;

                        taskLinkInput.value = ""; // Clear input
                    }
                });
            });
        }
    } else {
        console.error("Telegram WebApp is not available");
    }
};
// Import Firebase libraries if needed (e.g., Firebase app, Firestore)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, doc, setDoc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to update points from Firebase (e.g., when status changes to "Done")
async function updatePoints(userId, additionalPoints) {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const currentPoints = userSnap.data().points || 0;
        await updateDoc(userRef, { points: currentPoints + additionalPoints });
        document.getElementById("points").textContent = currentPoints + additionalPoints;
    }
}
