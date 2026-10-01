const API_URL = "http:///localhost:3000";
// Get the goal count element from the HTML
const goalCount = document.getElementById("goal-count")

//Get all savings goals
async function loadGoals() {
    try {
        const response = await fetch(`${API_URL}/goals`);

        if (!response.ok) {
            throw new Error("Unable to load goals");
        }

        const goals = await response.json();
        goalCount.textContent = `${goals.length} Goals`;


        console.log(goals);
    } catch (error) {
        console.error("Error loading goals:", error);
    }

}

//Run the function when the page loads
loadGoals();
