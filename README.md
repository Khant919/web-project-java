# webproject-java
Spring Boot (Java 21) REST API + JPA persistence for the Mosséa journal app (MySQL)." Vite + React (TypeScript) frontend for an online journal/reading platform with a built-in chatbot (Tailwind, Radix UI).

Install deps:

    npm ci

Start dev server:

    npm run dev

Build for production:

    npm run build Notes:

Build & run with Maven:

    cd project
    mvn clean package
    mvn spring-boot:run Or run the produced jar:
    java -jar target/*.jar Notes:

Ensure a MySQL instance is available and application.properties (or environment variables) has DB URL, username, password.
Java 21 is specified; use a JDK 21 runtime.
