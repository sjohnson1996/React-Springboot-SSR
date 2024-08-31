#FROM openjdk:11-jre-slim
#
#COPY ./build/libs/app.jar /app/dist/app.jar
#WORKDIR /app/dist
#
#EXPOSE 8080
#
#ENTRYPOINT exec java \
#    -Xms150m \
#    -Xmx150m \
#    -XX:MetaspaceSize=200m \
#    -XX:MaxMetaspaceSize=200m \
#    -Xss512k \
#    -jar app.jar



## Use a GraalVM base image instead of OpenJDK
#FROM ghcr.io/graalvm/graalvm-ce:22.3.0 as builder
#
## Set the necessary environment variables for GraalVM
#ENV GRAALVM_HOME=/opt/graalvm-ce-java11-22.3.0
#ENV PATH="$GRAALVM_HOME/bin:$PATH"
#
## Copy your application JAR file to the GraalVM environment
#COPY ./build/libs/app.jar /app/dist/app.jar
#WORKDIR /app/dist
#
#EXPOSE 8080
#
#ENTRYPOINT ["java", "-Xms150m", "-Xmx150m", "-XX:MetaspaceSize=200m", "-XX:MaxMetaspaceSize=200m", "-Xss512k", "-jar", "app.jar"]



## Use a base image with GraalVM or JRE
#FROM openjdk:11-jre-slim
#
## Copy the built JAR file to the Docker image
#COPY ./build/libs/app.jar /app/dist/app.jar
#
## Set the working directory
#WORKDIR /app/dist
#
## Expose the port the app runs on
#EXPOSE 8080
#
## Run the JAR file
#ENTRYPOINT ["java", "-Xms150m", "-Xmx150m", "-XX:MetaspaceSize=200m", "-XX:MaxMetaspaceSize=200m", "-Xss512k", "-jar", "app.jar"]



# Use a GraalVM base image with Java 11 and Node.js support
FROM ghcr.io/graalvm/graalvm-ce:22.3.0

# Install Node.js using GraalVM updater
RUN gu install nodejs

# Set the working directory
WORKDIR /app

# Copy your server-side files to the Docker image
COPY ./build/libs/app.jar /app/dist/app.jar
COPY ./src/main/resources/server.bundle.js /app/server.bundle.js
# Copy the resources including foo.js
COPY ./src/main/resources /app/resources

# Set NODE_PATH to let GraalVM know where to find the modules
ENV NODE_PATH=/app/node_modules

# Expose the port the app runs on
EXPOSE 8080

# Use GraalVM Node.js runtime to execute the server-side rendering
ENTRYPOINT ["java", "-Xms150m", "-Xmx150m", "-XX:MetaspaceSize=200m", "-XX:MaxMetaspaceSize=200m", "-Xss512k", "-jar", "dist/app.jar"]

