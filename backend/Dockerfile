
FROM openjdk:11-jdk

WORKDIR /app

ADD build/libs/backend-0.0.1-SNAPSHOT.jar /app/app.jar

ENTRYPOINT ["java","-jar","/app/app.jar"]
