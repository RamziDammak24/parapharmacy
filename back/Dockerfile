# Build stage
FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests -B

# Runtime stage
FROM amazoncorretto:17
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /build/target/*.jar /app/app.jar

# Expose the application port
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "app.jar"]