# Starting with Center management application backend

### Role based Feature of Center management application

#### Student:

- Students can login and logout (account will be provide by admin)
- Students can make a request to the admin to update their profile.
- Students can see their transaction (payment) histories.
- Students can see their exam results.
- Students can see guardian Account active status.
- Students can see their monthly attendance.

#### Teacher:

- Teachers can login and logout (account will be provide by admin)
- Teachers can see their transaction (payment) histories.
- Teachers can see their attendance histories.

#### Guardian:

- Guardian can request the admin to create an account if the admin approved then the account will be active. (guardian must have valid or admitted student Id)
- Guardian can see the transaction history of their childrens.
- Guardian can see the exam result report of their childrens.
- The Guardian can see their student Information.
- The Guardian can see their children's attendance.

#### Admin:

- Admin can login and logout.
- Admin can manage and update their profile.
- Admin will provide user (student, teacher, guardian) accounts.
- Admin can approve or reject Guardian requested accounts.
- Admin can manage (CRUD) user (student, teacher, guardian) accounts.
- Admin can manage (CRUD) classes.
- Admin can manage (CRUD) exams.
- Admin can collect fees.
- Admin can add expense.
- Manage students' attendance.

### Explanation of the using technologies.

- I am using express to making REST API.
- Mongoose for declare schema and mongodb as a database with typescript for type safety.
- Zod validation for proper data validation.
- JWT token for user authentication validation.

### API documentation

#### Auth / User api

- /api/v1/auth/login (POST) ====> user (student, teacher, guardian, admin) login api endpoint.
- /api/v1/auth/change-password (POST) ====> user change-password api endpoint.
- /api/v1/auth/refresh-token (POST) ====> user refresh-token api endpoint.

#### Attendance Api

- /api/v1/attendance (POST) ====> create attendance api endpoint.
- /api/v1/attendance (GET) ====> get all attendance api endpoint by search, filter and pagination.
- /api/v1/attendance/:id (GET) ====> get single attendance api endpoint.
- /api/v1/attendance/student/:id?month=july&year=2022 (GET) ====> get specific month attendance api endpoint for a student. (id should be student id)
- /api/v1/attendance/:id (patch) ====> update specific attendance api endpoint.
- /api/v1/attendance/:id (delete) ====> delete attendance api endpoint.

#### class Api

- /api/v1/class (POST) ====> create class api endpoint.
- /api/v1/class (GET) ====> get all class api endpoint by search, filter and pagination.
- /api/v1/class/:className (GET) ====> get single class api endpoint.
- /api/v1/class/:className (patch) ====> update specific class api endpoint.
- /api/v1/class/:id (delete) ====> delete class api endpoint.

#### exam Api

- /api/v1/exam (POST) ====> create exam api endpoint.
- /api/v1/exam (get) ====> get all exam api endpoint by search, filter and pagination.
- /api/v1/exam/:id (GET) ====> get single exam api endpoint.
- /api/v1/exam/:id (patch) ====> update specific exam api endpoint.
- /api/v1/exam/:id (delete) ====> delete exam api endpoint.
- /api/v1/exam/result/:id (delete) ====> delete exam with exam result api endpoint.

#### expense Api

- /api/v1/expense (POST) ====> create expense api endpoint.
- /api/v1/expense (GET) ====> get all expense api endpoint by search, filter and pagination.
- /api/v1/expense/:id (GET) ====> get single expense api endpoint.
- /api/v1/expense/:id (patch) ====> update specific expense api endpoint.
- /api/v1/expense/:id (delete) ====> delete expense api endpoint.

#### guardian Api

- /api/v1/guardian (GET) ====> get all guardian api endpoint by search, filter and pagination.
- /api/v1/guardian/:id (GET) ====> get single guardian api endpoint.
- /api/v1/guardian/:id (patch) ====> update specific guardian api endpoint.
- /api/v1/guardian/status/:id (patch) ====> update guardian account status (pending, active, reject) api endpoint.
- /api/v1/guardian/:id (delete) ====> delete guardian api endpoint.

#### student Api

- /api/v1/student (GET) ====> get all student api endpoint by search, filter and pagination.
- /api/v1/student/:id (GET) ====> get single student api endpoint.
- /api/v1/student/:id (patch) ====> update specific student api endpoint.
- /api/v1/student/:id (delete) ====> delete student api endpoint.

##### student result Api

- /api/v1/student/result/:id (patch) ====> add exam result api endpoint.
- /api/v1/student/delete-result/:id (patch) ====> delete exam result api endpoint.
- /api/v1/student/update-result/:id (patch) ====> delete exam result api endpoint.

##### student transaction Api

- /api/v1/student/transaction/:id (patch) ====> add transaction api endpoint.
- /api/v1/student/update-transaction/:id (patch) ====> add transaction api endpoint.
- /api/v1/student/delete-transaction/:id (patch) ====> add transaction api endpoint.

#### teacher Api

- /api/v1/teacher (GET) ====> get all teacher api endpoint by search, filter and pagination.
- /api/v1/teacher/:id (GET) ====> get single teacher api endpoint.
- /api/v1/teacher/:id (patch) ====> update specific teacher api endpoint.
- /api/v1/teacher/:id (delete) ====> delete teacher api endpoint.

#### user Api

- /api/v1/user/create-student (POST) ====> create student user api endpoint.
- /api/v1/user/create-teacher (GET) ====> create teacher user api endpoint.
- /api/v1/user/create-guardian (GET) ====> create teacher user api endpoint.

### Technology

- TypeScript
- Express JS
- Jsonwebtoken
- Mongodb
- Mongoose
- Zod
