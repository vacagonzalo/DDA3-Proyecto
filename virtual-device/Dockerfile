FROM node
WORKDIR /
COPY ./ ./
RUN npm run build
COPY . .
EXPOSE 1883 9001
CMD ["node", "index.js"]