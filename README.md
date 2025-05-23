# ✅ todo-api

### ✅ Checklist from Project Instructions (5–6 Core Points)

1. **User Registration & Login Functionality**  
   → What I did: Implemented in `authController.js`.  
   Users can register with `POST /api/auth/register` and login with `POST /api/auth/login`.  
   Login sets a global user.

2. **API Key Authorization**  
   → What I did: Middleware `authorizeKey.js` checks for a valid key on every `/api/todos` route.  
   Key is verified from the `Keys` collection.

3. **User Authorization**  
   → What I did: Middleware `authorizeUser.js` ensures that only logged-in users can create, update, or delete their own todos.

4. **Todos CRUD with Ownership (Create, Read, Update, Delete)**
   → What I did: `todoController.js` has all main functions like `createTodo`, `toggleTodoDone`, `deleteTodo`, and `getTodosByUserId`.  
   Todos are tied to the `userId`.

5. **Proper Data Models**  
   → What I did: I created Mongoose models in the `models/` folder:  
   - `keyModel.js` → API keys  
   - `userModel.js` → username, password, userId  
   - `todoModel.js` → task, done, userId, timestamps

6. **Global Error Handling**  
   → What I did: `errorHandler.js` catches all thrown errors and sends them in a uniform JSON format.

________________________________________
**Why I Created Just These Folders and Files**  
**Folder** → Why It Exists  
**controllers** → Contains all business logic for users, todos, and authentication.  
**middleware** → For reusable middlewares like key/user checks and error handling.  
**models** → Holds all database schemas and Mongoose models.  
**routes** → Handles routing logic and applies middlewares to connect API paths to logic.  
**.env** → Keeps secrets like MongoDB URL hidden and separate.  
**.gitignore** → Makes sure sensitive and heavy files are not pushed to GitHub.  
**server.js** → Entry point – sets up Express, connects DB, uses routes and middlewares.  

No extra files or folders were needed — I followed the project instructions exactly and kept everything modular and clean.

