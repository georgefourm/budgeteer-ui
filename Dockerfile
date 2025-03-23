FROM node:18-alpine AS build

ARG BACKEND_URL

WORKDIR /tmp/budgeteer

COPY . /tmp/budgeteer/

RUN npm install

RUN REACT_APP_API_URL=${BACKEND_URL} npm run build

FROM httpd:2.4-alpine

COPY --from=build /tmp/budgeteer/build /usr/local/apache2/htdocs/
