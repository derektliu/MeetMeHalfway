# MeetMeHalfway

## Project Overview

MeetMeHalfway is a web application designed to help users find a convenient meeting point between two locations. It leverages the Yelp API to provide suggestions for places to meet.

### Project Structure

- **Server-side**: Located in the `server` directory.

  - **Entry Point**: `server.js` starts the server on port 1337.
  - **Configuration**: `server/config/server-config.js` sets up the Express server, middleware, and routes.
  - **Routes**:
    - `POST /api/halfway`: Calls `handler.findHalfway`.
    - `GET /api/results`: Calls `handler.getResults`.
  - **Dependencies**: Uses Express, Body-Parser, Mongoose, and Yelp API.

- **Client-side**: Located in the `client` directory.

  - **Frameworks**: Uses AngularJS, Bootstrap, and jQuery.
  - **Entry Point**: `index.html` in the `client` directory.

- **Testing**: Uses Mocha for testing, as specified in the `package.json`.

## Getting Started

1. **Install Dependencies**:

   - Run `npm install` to install Node.js dependencies.
   - Run `yarn install` to install front-end dependencies specified in `package.json`.

2. **Run the Server**:

   - Execute `node server/server.js` to start the server on port 1337.

3. **Access the Application**:
   - Open a browser and navigate to `http://localhost:1337` to access the client-side application.

## Suggested Improvements

1. **Documentation**: The `README.md` is currently empty. Adding setup instructions, usage, and contribution guidelines would be beneficial.
2. **Error Handling**: Ensure robust error handling in server routes and client-side code.
3. **Testing**: Expand test coverage to include more scenarios and edge cases.
4. **Security**: Review and implement security best practices, especially if handling sensitive data.
5. **Code Quality**: Consider using a linter for consistent code style and quality.
