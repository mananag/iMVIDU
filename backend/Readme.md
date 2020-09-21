# Backend Task

To start run the api follow the following steps


- Clone the repository
- Install all the required dependency by running 
```sh
npm install
```
- Change the password of the my sql server in the `config.json` 
- Then run the the program using
```sh
npm start
```

## Site Navigations in Postman

- For creating a new user use `post` method and url `localhost:3000/users/`
- For login use `post` method and url `localhost:3000/users/login`
- For getting the list of users use `get` method and url `localhost:3000/users/` and copy the tokem generated while login in the bearer token to do this and all the other tasks which need authentication
- For adding a new course for logged in user use `post` method and url `localhost:3000/course/`
- For getting all the course for s logged in user use `get` method and url `localhost:3000/course/`
- For updating a course with id no. x use `patch` method and url `localhost:3000/course/x`
- For deleting a course with id no. x use `delete` method and url `localhost:3000/course/x`
