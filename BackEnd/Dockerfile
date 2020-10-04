# FROM maven:3.5.2-jdk-8-alpine AS MAVEN_BUILD
# COPY pom.xml /build/
# COPY src /build/src/
# WORKDIR /build/
# RUN mvn package
# FROM openjdk:8-jre-alpine
# WORKDIR /app
# COPY --from=MAVEN_BUILD /build/target/spring-boot-demo-0.0.1.jar /app/
# ENTRYPOINT ["java", "-jar", "spring-boot-demo-0.0.1.jar"]

FROM openjdk:8-jre-alpine
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]