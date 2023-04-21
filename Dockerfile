FROM node:17.4.0-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

# 3000번 포트 노출
EXPOSE 3000

# npm start 스크립트 실행
CMD ["npm", "start"]
