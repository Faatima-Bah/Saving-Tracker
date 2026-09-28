# Saving Tracker
A full-stack application for creating savings goals and tracking progress.


## Backend API

A backend REST API that allows users to create savings goals, record contributions, monitor their progress and update or delete goals.

### Technologies Used

- Node.js
- Express.js
- MySQL
- mysql2
- dotenv
- CORS
- Nodemon
- Postman

### Features

- Create a user
- Prevent duplicate email addresses
- Create a savings goal
- View all savings goals
- View one savings goal
- Update a savings goal
- Delete a savings goal
- Add contributions to a goal
- View all contributions for a goal
- Calculate the total amount saved
- Input validation and error handling

### Project Structure

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
├── img/
│   └── project_structure.png
├── .gitignore
└── README.md
```
### Installation

1. Clone the repository:

```bash
git clone https://github.com/Faatima-Bah/Saving-Tracker.git
```

2. Open the project:

```bash
cd Saving-Tracker
```

3. Install the backend dependencies:

```bash
cd backend
npm install
```

4. Create a `.env` file inside the `backend` folder:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=saving_tracker_app
DB_PORT=3306
```

Do not upload the `.env` file to GitHub.

5. Run the SQL inside `database/schema.sql` to create the database and tables.

6. Start the server:

```bash
npm run dev
```

The API will run at:

```text
http://localhost:3000
```

### API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Check that the API is running |
| GET | `/db-test` | Test the database connection |
| POST | `/users` | Create a user |
| GET | `/goals` | Get all savings goals |
| GET | `/goals/:id` | Get one savings goal |
| POST | `/goals` | Create a savings goal |
| PATCH | `/goals/:id` | Update a savings goal |
| DELETE | `/goals/:id` | Delete a savings goal |
| POST | `/contributions` | Add a contribution |
| GET | `/goals/:id/contributions` | Get contributions for one goal |

### Example: Create a User

```json
{
  "name": "Fatima",
  "email": "fatima@example.com"
}
```

### Example: Create a Savings Goal

```json
{
  "user_id": 1,
  "goal_name": "Emergency Fund",
  "target_amount": 12000,
  "deadline": "2028-01-01"
}
```

New goals have a default status of `In Progress`.

### Example: Add a Contribution

```json
{
  "goal_id": 1,
  "amount": 500,
  "note": "First contribution"
}
```

### Example: Update a Goal

```json
{
  "target_amount": 15000,
  "status": "Paused"
}
```

The accepted status values are:

- `In Progress`
- `Paused`
- `Completed`

### Error Handling

The API returns suitable HTTP status codes:

| Status | Meaning |
|---|---|
| 200 | Request completed successfully |
| 201 | Record created successfully |
| 400 | Invalid or missing information |
| 404 | User or savings goal not found |
| 409 | Email address already exists |
| 500 | Internal server error |

### Testing

The API endpoints were manually tested using Postman, including successful requests and error cases.