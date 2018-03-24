FROM node:alpine

ADD . .

RUN yarn install

EXPOSE 3000

CMD ["yarn","start"]

# docker run -it -p 3000:3000 linebot
