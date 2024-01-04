FROM node:latest
WORKDIR /app
COPY package.* ./
RUN npm i
COPY --chown=app:app . .

EXPOSE 4003

CMD ["npm", "run", "start"]