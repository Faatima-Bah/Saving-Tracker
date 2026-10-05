const API_URL = "http://localhost:3000";
// Get the goal count element from the HTML
const goalCount = document.getElementById("goal-count");
const goalsList = document.getElementById("goals-list");
const totalSavedElement = document.getElementById("total-saved");
const totalTargetElement = document.getElementById("total-target");
const progressAmountElement = document.getElementById("progress-amount");
const progressPercentageElement = document.getElementById("progress-percentage");
const overallProgressBar = document.getElementById("overall-progress-bar");


//Get all savings goals
async function loadGoals() {
    try {
        const response = await fetch(`${API_URL}/goals`);

        if (!response.ok) {
            throw new Error("Unable to load goals");
        }

        const goals = await response.json();
        goalCount.textContent = `${goals.length} Goals`;

        displayGoals(goals);
        updateTotals(goals);

        console.log(goals);

    } catch (error) {
        console.error("Error loading goals:", error);
    }

}

//Run the function when the page loads
loadGoals();

// Display the savings goals
function displayGoals(goals) {
    goalsList.innerHTML = "";

    // Show a message when there are no goals
    if (goals.length === 0) {
        goalsList.innerHTML =
            '<p class="empty-message">No savings goals yet.</p>';

        return;
    }

    // Go through the goals one at a time
    for (const goal of goals) {
        // Create the goal card
        const goalCard = document.createElement("article");
        goalCard.classList.add("goal-card");

        // Create the goal name
        const goalName = document.createElement("h3");
        goalName.textContent = goal.goal_name;

        // Create the target amount
        const targetAmount = document.createElement("p");
        targetAmount.textContent = "Target: £" + goal.target_amount;

        // Create the saved amount
        const savedAmount = document.createElement("p");
        savedAmount.textContent = "Saved: £" + goal.saved_amount;

        // Create the goal status
        const goalStatus = document.createElement("p");
        goalStatus.textContent = "Status: " + goal.status;

        // Create the deadline
        const deadline = document.createElement("p");
        const deadlineDate = goal.deadline.split("T")[0];

        deadline.textContent = "Deadline: " + deadlineDate;

        // Change the amounts into numbers
        const savedNumber = Number(goal.saved_amount);
        const targetNumber = Number(goal.target_amount);

        // Start the progress at zero
        let progress = 0;

        // Calculate the progress when the target is greater than zero
        if (targetNumber > 0) {
            progress = (savedNumber / targetNumber) * 100;
        }

        // Create the progress text
        const progressText = document.createElement("p");
        progressText.textContent = "Progress: " + progress.toFixed(0) + "%";

        // Create a link to view this goal
        const viewGoalLink = document.createElement("a");

        viewGoalLink.textContent = "View Goal";

        viewGoalLink.href = "goal-details.html?id=" + goal.goal_id;

        // Add the information to the card
        goalCard.appendChild(goalName);
        goalCard.appendChild(targetAmount);
        goalCard.appendChild(savedAmount);
        goalCard.appendChild(goalStatus);
        goalCard.appendChild(deadline);
        goalCard.appendChild(progressText);
        goalCard.appendChild(viewGoalLink);
        
        // Add the card to the page
        goalsList.appendChild(goalCard);
    }
}

// Update the dashboard totals
function updateTotals(goals) {
    let totalSaved = 0;
    let totalTarget = 0;

    // Add the amounts from every goal
    for (const goal of goals) {
        totalSaved = totalSaved + Number(goal.saved_amount);
        totalTarget = totalTarget + Number(goal.target_amount);
    }

    // Display the totals on the page
    totalSavedElement.textContent = "£" + totalSaved.toFixed(2);
    totalTargetElement.textContent = "£" + totalTarget.toFixed(2);

    // Start the overall progress at zero
    let overallProgress = 0;

    // Calculate the progress when the total target is above zero
    if (totalTarget > 0) {
        overallProgress = (totalSaved / totalTarget) * 100;
    }

    // Display the saved and target amounts
    progressAmountElement.textContent =
        "£" + totalSaved.toFixed(2) +
        " of £" + totalTarget.toFixed(2);

    // Display the percentage
    progressPercentageElement.textContent =
        overallProgress.toFixed(0) + "%";

    // Change the width of the progress bar
    overallProgressBar.style.width = overallProgress + "%";
}