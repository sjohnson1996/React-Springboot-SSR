## React SSR with Spring Boot & GraalVM

This repository serves as an example of how to server side render React in Spring Boot with client side hydration using GraalVM.

### Steps to get running

1.) Make sure the Docker daemon is running on your machine. (Rancher or Docker Desktop)

2.) Create a run configuration in Intellij for the main class that uses Docker for the `Run on` option. Select the Dockerfile in the root of the project.

3.) Install node modules with `npm install` in the root of project.

4.) Run build command `npm run build:fullstack` in the root of the project.

5.) Run the Spring Boot application in Intellij via run configuration.

6.) Navigate to `http://localhost:8080/test` in your browser.

### Disclaimer

- This is a proof of concept and as such is not production ready.
- This is a work in progress and does have an ideal workflow.
- This goal of this project is to create an example template that can be applied to a React Spring Boot BFF application.
