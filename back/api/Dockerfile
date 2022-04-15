FROM gradle:7.4.1-jdk11 AS builder
WORKDIR /tmp
COPY ./src ./src
COPY ./build.gradle .
RUN gradle build
FROM openjdk:11.0.14.1-oracle
COPY --from=builder /tmp/build/libs/app.jar /app/app.jar
EXPOSE 8080
