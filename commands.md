npx @nestjs/cli new nestjs-starter
cd nestjs-starter


npm install @nestjs/config @nestjs/passport passport passport-jwt bcrypt
npm install @nestjs/swagger swagger-ui-express class-validator class-transformer
npm install prisma @prisma/client --save-dev
npm install @nestjs/stripe stripe // This didnt work
npm install @nestjs/platform-express multer aws-sdk
npm i stripe
npm install @nestjs/jwt

npm install --save-dev @types/nestjs__jwt


npx prisma init

DATABASE_URL="file:./dev.db"
npx prisma migrate dev --name init



npx nest generate module prisma
npx nest generate service prisma

npx nest generate module auth
npx nest generate service auth
npx nest generate controller auth



npx nest generate module payment
npx nest generate service payment



npx nest generate module file
npx nest generate service file
npx nest generate controller file


npx nest generate controller admin


# Project structure

nestjs-starter/
├── src/
│   ├── auth/
│   │   ├── dto/
│   │   │   └── login.dto.ts
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts
│   │   ├── guards/
│   │   │   └── roles.guard.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   └── auth.service.ts
│   ├── file/
│   │   ├── file.controller.ts
│   │   ├── file.module.ts
│   │   └── file.service.ts
│   ├── payment/
│   │   ├── payment.module.ts
│   │   └── payment.service.ts
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   └── main.ts
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
├── .env
├── package.json
└── tsconfig.json
