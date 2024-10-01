# Book_review_Assignment

> clone a Project

1.  npm install
2.  setup your .env file according to the file .env.example file available
3.  npm run dev (to start a project locally)

## Details About all the API

1. **http://localhost:3000/api/v1/books/** use **GET** method--- This API helps to fetch all the books available in DataBase. used pagination here it will 10 book only in one page.

2. **http://localhost:3000/api/v1/books** use **POST** method--- This API will use to add new books to database and use admin and authentication middleware.

3. **http://localhost:3000/api/v1/books/:id** use **GET** method--- This API will help to fetch a particular book.

4. **http://localhost:3000/api/v1/user/register** use **POST** method--- This API will create a user to the database

5. **http://localhost:3000/api/v1/user/login** use **POST** method--- This API will login a user to website and create a token to easily access the website feature.

6. **http://localhost:3000/api/v1/user/:id** use **POST** method--- This API will use to update user details and use authetication middleware.

7. **http://localhost:3000/api/v1/user/:id** use **GET** method--- This API will help to get a particular user details using admin and authetication middleware.

8. **http://localhost:3000/api/v1/review** use **POST** method--- This API will help to get a add a review to a book use authentication middleware.

9. **http://localhost:3000/api/v1/review?bookId=** use **GET** method--- This API will help to get all the reviews listed on a particular book by giving book id as query parameter.
