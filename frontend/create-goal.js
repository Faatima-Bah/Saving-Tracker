const API_URL = "http://localhost:3000";

const createGoalForm =
    document.getElementById("create-goal-form");

const formMessage =
    document.getElementById("form-message");

// Run when the form is submitted
createGoalForm.addEventListener("submit", async function (event) {
    // Stop the page from refreshing
    event.preventDefault();

    // Get the information entered in the form
    const goalName = document.getElementById("goal-name").value;

    const targetAmount = document.getElementById("target-amount").value;

    const deadline = document.getElementById("deadline").value;

    // Information to send to the backend
    const newGoal = {
        user_id: 1,
        goal_name: goalName,
        target_amount: targetAmount,
        deadline: deadline
    };

    try {
        const response = await fetch(`${API_URL}/goals`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newGoal)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        // Return to the dashboard after creating the goal
        window.location.href = "index.html";

    } catch (error) {
        formMessage.textContent = error.message;
    }
});