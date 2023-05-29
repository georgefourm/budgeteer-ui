FROM node:18-alpine AS build

WORKDIR /tmp/budgeteer

COPY . /tmp/budgeteer/

RUN npm install

RUN npm run build

FROM httpd:2.4-alpine

COPY --from=build /tmp/budgeteer/build /usr/local/apache2/htdocs/
