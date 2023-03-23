FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY yarn* ./
# Bundle app source
COPY . .
#RUN npm i yarn
RUN yarn install
RUN yarn run build
# If you are building your code for production
# RUN npm ci --only=production

RUN apt-get update && apt-get install -y python locales python3-pip
RUN pip3 install pymongo snscrape pandas

EXPOSE 3000
#CMD [ "npm", "run","start:dev" ]
CMD [ "yarn", "start:dev" ]
#CMD [ "node", "dist/main.js" ]
