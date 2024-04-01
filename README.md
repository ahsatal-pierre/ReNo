# ReNo
React - Node (Nest) template

# start frontend: 
- npm install
- npm run start

# start backend: 
- in .env file: 
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:PORT/DATABASE_NAME?schema=public"
JWT_SECRET="YOUR_JWT_SECRET_KEY"
- npm install
- run DB migration and set up database schema: 
npm run db:dev:restart
- npm run start:dev

# start prisma studio: 
- npx prisma studio
