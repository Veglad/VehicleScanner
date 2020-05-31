FROM node:13    
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
# COPY yarn.lock /usr/src/app/package.json

RUN yarn

COPY . .

CMD ["npm", "start"]
