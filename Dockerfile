FROM node:latest

RUN apt-get update

RUN apt-get -y install default-jre

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

#RUN java -Djava.library.path=./database/DynamoDBLocal_lib -jar ./database/DynamoDBLocal.jar -sharedDb

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]