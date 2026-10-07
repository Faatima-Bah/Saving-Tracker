# Saving Tracker

A full-stack web application for creating savings goals, recording contributions and tracking savings progress.

The application includes a responsive frontend dashboard, a REST API built with Node.js and Express, and a MySQL database.

## Features

- Create a user
- Prevent duplicate email addresses
- Create savings goals
- View all savings goals on the dashboard
- View the details of one savings goal
- Edit a goal’s name, target, deadline and status
- Delete a savings goal
- Add contributions to a goal
- View the contribution history for a goal
- Calculate the saved amount for each goal
- Calculate total savings and overall progress
- Display progress percentages and a progress bar
- Validate input and display useful error messages
- Responsive layout for desktop and smaller screens

## Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- DOM manipulation
- Fetch API
- Live Server

### Backend

- Node.js
- Express.js
- MySQL
- mysql2
- dotenv
- CORS
- Morgan
- Nodemon

### Development and Testing

- Git and GitHub
- Postman
- Visual Studio Code

## How the Application Works

1. The user interacts with a form, button or goal card in the browser.
2. JavaScript collects the required information.
3. `fetch()` sends an HTTP request to the Express API.
4. The Express route validates the request.
5. The backend runs a parameterised MySQL query.
6. MySQL returns the result to the backend.
7. The backend sends a JSON response to the browser.
8. JavaScript updates the page with the latest information.

Example:

```text
Add Contribution form
        ↓
POST /contributions
        ↓
INSERT INTO contributions
        ↓
JSON response
        ↓
Updated saved amount and contribution list
```

## Project Structure

```text
Saving-Tracker/
├── backend/
│   ├── app.js
│   ├── db.js
│   ├── package.json
│   └── package-lock.json
├── database/
│   └── schema.sql
├── frontend/
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   ├── create-goal.html
│   ├── create-goal.js
│   ├── goal-details.html
│   └── goal-details.js
├── img/
│   └── project_structure.png
├── .gitignore
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Faatima-Bah/Saving-Tracker.git
```

### 2. Open the project

```bash
cd Saving-Tracker
```

### 3. Install the backend dependencies

```bash
cd backend
npm install
```

### 4. Create the environment file

Create a `.env` file inside the `backend` folder:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=saving_tracker_app
DB_PORT=3306
```

Do not upload the `.env` file to GitHub. Confirm that `.env` is included in `.gitignore`.

### 5. Create the database

Run the SQL inside `database/schema.sql` in MySQL Workbench or another MySQL client. This creates the database and its tables.

### 6. Start the backend server

From the `backend` folder, run:

```bash
npm run dev
```

The API runs at:

```text
http://localhost:3000
```

### 7. Start the frontend

Open the `frontend` folder with Live Server.

The frontend address will normally look like:

```text
http://127.0.0.1:5500/frontend/index.html
```

Keep both the backend server and Live Server running while using the application.

## Frontend Pages

| Page | Purpose |
|---|---|
| `index.html` | Displays totals, overall progress and all savings goals |
| `create-goal.html` | Contains the form used to create a new goal |
| `goal-details.html` | Displays one goal and allows contributions, editing and deletion |

## Frontend and Backend Connections

| Frontend feature | HTTP request | Backend route |
|---|---|---|
| Load the dashboard | `GET` | `/goals` |
| Open one goal | `GET` | `/goals/:id` |
| Create a goal | `POST` | `/goals` |
| Edit a goal | `PATCH` | `/goals/:id` |
| Delete a goal | `DELETE` | `/goals/:id` |
| Add a contribution | `POST` | `/contributions` |
| Load contribution history | `GET` | `/goals/:id/contributions` |

The frontend uses this API address:

```javascript
const API_URL = "http://localhost:3000";
```

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/` | Check that the API is running |
| `GET` | `/db-test` | Test the database connection |
| `POST` | `/users` | Create a user |
| `GET` | `/goals` | Get all savings goals and their saved totals |
| `GET` | `/goals/:id` | Get one savings goal |
| `POST` | `/goals` | Create a savings goal |
| `PATCH` | `/goals/:id` | Update a savings goal |
| `DELETE` | `/goals/:id` | Delete a savings goal |
| `POST` | `/contributions` | Add a contribution |
| `GET` | `/goals/:id/contributions` | Get all contributions for one goal |

## Example Requests

### Create a User

```json
{
  "name": "Fatima",
  "email": "fatima@example.com"
}
```

### Create a Savings Goal

```json
{
  "user_id": 1,
  "goal_name": "Emergency Fund",
  "target_amount": 12000,
  "deadline": "2028-01-01"
}
```

New goals have a default status of `In Progress`.

### Add a Contribution

```json
{
  "goal_id": 1,
  "amount": 500,
  "note": "First contribution"
}
```

### Update a Goal

```json
{
  "target_amount": 15000,
  "status": "Paused"
}
```

Accepted status values:

- `In Progress`
- `Paused`
- `Completed`

## Error Handling

The API returns suitable HTTP status codes:

| Status | Meaning |
|---|---|
| `200` | Request completed successfully |
| `201` | Record created successfully |
| `400` | Invalid or missing information |
| `404` | User or savings goal not found |
| `409` | Email address already exists |
| `500` | Internal server error |

The frontend reads error messages from the JSON response and displays them to the user.

## Testing

The backend API was manually tested with Postman. Testing included:

- Successful create, read, update and delete requests
- Required-field validation
- Invalid contribution amounts
- Duplicate email addresses
- Missing users and savings goals
- Goals with and without contributions

The frontend was manually tested in the browser to confirm that:

- Goals load on the dashboard
- Totals and percentages are calculated correctly
- Goal links open the correct details page
- Forms send data to the API
- Contributions refresh the saved amount and history
- Edited details appear after saving
- Deleted goals are removed and the user returns to the dashboard
- The layout adapts to smaller screens

## Future Improvements

- Add user registration and login
- Ensure each user can access only their own goals
- Add automated backend and frontend tests
- Add contribution editing and deletion
- Add filters and sorting
- Add savings categories
- Improve accessibility
- Deploy the frontend, backend and database

## Author

Created by **Fatimatou Bah** as a full-stack development learning project.