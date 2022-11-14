#build the app
FROM node:19 as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . ./

RUN npm run build

#serve the build
FROM nginx:stable

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]