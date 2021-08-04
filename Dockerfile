FROM node:latest as build
WORKDIR /app
COPY ./package*.json .
RUN npm install
COPY . .
CMD npm run build

FROM node:latest as serve
WORKDIR /app
COPY --from=build ./app/build .
RUN yarn global add serve
CMD serve -s .