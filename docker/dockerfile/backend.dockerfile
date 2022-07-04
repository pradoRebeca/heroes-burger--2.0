FROM node:latest
WORKDIR /backend
COPY . .
ARG PORT_BUILD=5006
ENV PORT=$PORT_BUILD
EXPOSE $PORT_BUILD
RUN npm install 
ENTRYPOINT npm start