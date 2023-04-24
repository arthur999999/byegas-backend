FROM node


WORKDIR /usr/src

COPY . .

EXPOSE 5000

RUN npm i
RUN npm run build


CMD ls -ltr && npm run migration:run && npm run migration:generate  && npm start