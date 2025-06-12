FROM node:24-alpine3.21

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001

RUN npx prisma generate

CMD ["sh", "-c", "npx prisma migrate deploy", "npm", "start"]