FROM node
WORKDIR /
COPY ./ ./
RUN npm run build
COPY . .
EXPOSE 5432 9999
CMD ["node", "index.js"]