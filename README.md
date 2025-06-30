Survey API
A RESTful public API for managing survey questions with multi-language support, built with Node.js, Express, and MongoDB.
Setup

Clone the repository: git clone https://github.com/Shashank-Mor/survey_node_project
Install dependencies: npm install
Create a .env file with:CONNECTION_STRING=mongodb://localhost:27017/survey_db
PORT=3000


Run the server: npm start
Test with Postman: [Insert Postman collection link]

Endpoints

POST /api/questions: Create a question
Body: { text: { en: "Question", fr: "Texte" }, options: [{ id: 1, text: { en: "Option", fr: "Option" }, isCorrect: true }, ...] }


GET /api/questions?lang=en&page=1&limit=10: Fetch all questions
GET /api/questions/:id?lang=en: Fetch a question by ID
PUT /api/questions/:id: Update a question (full or partial)
DELETE /api/questions/:id: Delete a question

Notes

The API is public and does not require authentication.
Optional: Use a static token for basic protection (see routes.js for implementation).
Validation ensures questions have 4 options, one correct answer, and English translations.

Testing
Run npm test to execute Jest tests (add test files to tests/ directory).
Dependencies

express, mongoose, dotenv, express-async-handler, express-rate-limit
Dev: nodemon, jest, supertest
