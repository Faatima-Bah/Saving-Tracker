const API_URL = "http://localhost:3000";

// Get the goal ID from the page address
const pageAddress = new URLSearchParams(window.location.search);
const goalId = pageAddress.get("id");

// Load the selected goal
async function loadGoal() {
    try {
        const response =
            await fetch(`${API_URL}/goals/${goalId}`);

        const goal = await response.json();

        if (!response.ok) {
            throw new Error(goal.message);
        }

        // Prepare the deadline
        let deadline = "No deadline";

        if (goal.deadline) {
            deadline = goal.deadline.split("T")[0];
        }

        // Display the goal information
        document.getElementById("goal-name").textContent =
            goal.goal_name;

        document.getElementById("target-amount").textContent =
            "Target: £" + goal.target_amount;

        document.getElementById("saved-amount").textContent =
            "Saved: £" + goal.saved_amount;

        document.getElementById("goal-status").textContent =
            "Status: " + goal.status;

        document.getElementById("goal-deadline").textContent =
            "Deadline: " + deadline;

    } catch (error) {
        document.getElementById("error-message").textContent =
            error.message;
    }
}

// Load the contributions for this goal
async function loadContributions() {
    try {
        const response = await fetch(
            `${API_URL}/goals/${goalId}/contributions`
        );

        const contributions = await response.json();

        if (!response.ok) {
            throw new Error(contributions.message);
        }

        const contributionsList =
            document.getElementById("contributions-list");

        // Remove the original message
        contributionsList.innerHTML = "";

        // Show a message when there are no contributions
        if (contributions.length === 0) {
            contributionsList.textContent =
                "No contributions yet.";

            return;
        }

        // Display each contribution
        for (const contribution of contributions) {
            const contributionItem =
                document.createElement("p");

            const contributionDate =
                contribution.contributed_at.split("T")[0];

            contributionItem.textContent =
                "£" + contribution.amount +
                " - " + (contribution.note || "No note") +
                " - " + contributionDate;

            contributionsList.appendChild(contributionItem);
        }

    } catch (error) {
        document.getElementById("error-message").textContent =
            error.message;
    }
}

// Find the contribution form
const contributionForm =
    document.getElementById("contribution-form");

// Run when the form is submitted
contributionForm.addEventListener(
    "submit",
    async function (event) {
        event.preventDefault();

        // Get the information from the form
        const amount =
            document.getElementById("contribution-amount").value;

        const note =
            document.getElementById("contribution-note").value;

        // Prepare the information for the backend
        const newContribution = {
            goal_id: goalId,
            amount: amount,
            note: note
        };

        try {
            const response = await fetch(
                `${API_URL}/contributions`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newContribution)
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message);
            }

            // Show the success message
            document.getElementById(
                "contribution-message"
            ).textContent = result.message;

            // Empty the form
            contributionForm.reset();

            // Refresh the goal information and contributions
            loadGoal();
            loadContributions();

        } catch (error) {
            document.getElementById(
                "contribution-message"
            ).textContent = error.message;
        }
    }
);

// Only load the goal when an ID is available
if (goalId) {
    loadGoal();
    loadContributions();
} else {
    document.getElementById("error-message").textContent =
        "No goal was selected";
}