FROM node:24-alpine3.21
WORKDIR /app

COPY . /app/

RUN npm install

EXPOSE 5173

ENTRYPOINT [ "npm", "run" ]
CMD [ "dev" ]