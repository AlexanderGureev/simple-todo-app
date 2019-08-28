FROM node:10.15
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
ARG PORT=8080
ENV PORT $PORT
RUN echo $PORT
RUN yarn
VOLUME ["/usr/src/app"]
EXPOSE $PORT
CMD ["yarn", "start"]