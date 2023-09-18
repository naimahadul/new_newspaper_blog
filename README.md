# Newspaper-blog

Welcome to my newspaper-blog project!
This website allows authors to create, edit, and delete their blog posts while enabling everyone to read the published content. 

## Features

- Authors can log in to the website using their credentials.
- Authenticated authors can create new blog posts.
- Authenticated authors can edit and delete their own blog posts.
- Visitors can view all published blog posts.
- visitors can subscribe to the website.

## Technologies Used

- Node.js
- Express.js
- Sequelize orm
- bcrypt (password hashing)
- JWT token (authentication)

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-folder>`
3. Install dependencies: `npm install`

## Usage

1. Start the server: `npm start`
2. Access the API at `http://localhost:3000/api`

## API Endpoints

### Authors

- `POST /api/authors/register`: Create a new author.
- `POST /api/authors/login`: Author login.

### Blog Posts

- `POST /api/blog/posts`: Create a new blog post.
- `GET /api/blog/posts`: View all blog posts.
- `GET /api/blog/posts/:postId`: View a single blog post.
- `PUT /api/blog/posts/:postId`: Update a blog post (Author only).
- `DELETE /api/blog/posts/:postId`: Delete a blog post (Author only).

## Authentication

Protected routes require a JWT token obtained from the login API. Authors must be authenticated to edit or delete their own blog posts.

## API Specifications

### Authors

#### Create Author

- **URL**: `/api/authors/register`
- **Method**: `POST`
- **Request Body**:
  - `name` (string): Author's name.
  - `email` (string): Author's email.
  - `password` (string): Author's password.
- **Response**:
  - `author` (object): Created author's information.

#### Author Login

- **URL**: `/api/authors/login`
- **Method**: `POST`
- **Request Body**:
  - `email` (string): Author's email.
  - `password` (string): Author's password.
- **Response**:
  - `token` (string): JWT token for authentication.

### Blog Posts

#### Create Blog Post

- **URL**: `/api/blog/posts`
- **Method**: `POST`
- **Request Body**:
  - `title` (string): Blog post title.
  - `content` (string): Blog post content.
- **Authorization**: Bearer Token (JWT)
- **Response**:
  - `post` (object): Created blog post's information.

#### View All Blog Posts

- **URL**: `/api/blog/posts`
- **Method**: `GET`
- **Response**:
  - `posts` : List of blog posts.

#### View Single Blog Post

- **URL**: `/api/blog/posts/:postId`
- **Method**: `GET`
- **Response**:
  - `post` (object): Blog post's information.

#### Update Blog Post

- **URL**: `/api/blog/posts/:postId`
- **Method**: `PUT`
- **Authorization**: Bearer Token (JWT)
- **Request Body**:
  - `title` (string): Updated blog post title.
  - `content` (string): Updated blog post content.
- **Response**:
  - `post` (object): Updated blog post's information.

#### Delete Blog Post

- **URL**: `/api/blog/posts/:postId`
- **Method**: `DELETE`
- **Authorization**: Bearer Token (JWT)
- **Response**:
  - `message` (string): Message indicating successful deletion.


  
