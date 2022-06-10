# PROJECT SHYDAN

Shydan Inventory and Ordering System

**NOTE: (Backend documentation & how to contribute --- under construction... )**

## Structure

| Codebase                                                                                                    |                  Description                  |
| :---------------------------------------------------------------------------------------------------------- | :--------------------------------------------: |
| [frontend](frontend)                                                                                           |                Next.js frontend                |
| [backend](backend)                                                                                             |                  Express API                  |
| [backend docs](backend/README.md)                                                                              |        how to contribute (backend only)        |
| [frontend docs](frontend/README.md)                                                                            |       how to contribute (frontend only)       |
| [er diagram](#er-diagram)                                                                                      | Yung database tables & relationships ng shydan |
| [how to contribute](#how-to-contribute)                                                                        |          pano magcontribute sa github          |
| [previous documentation](https://docs.google.com/document/d/1C6bi5rE7tCeru514T7Db6wJZ9gSL3EtSmsWQHZsFIAw/edit) | shydan desktop app documentation (deprecated) |

## ER Diagram

![Project Shydan ERD](https://user-images.githubusercontent.com/37836505/166173049-6fbdb28b-a905-4113-8ab8-0772169eb403.png)

Reference: https://lucid.app/lucidchart/186a6efc-9f64-4cdc-a6a8-5401df53e10b/edit?page=0_0&invitationId=inv_9e9a0663-14f8-45af-8132-ba51392c0526#

## Getting Started

### 1. Clone this repo:

```
git clone
```

Navigate to the project:

```
cd project-shydan
```

#### Install npm dependencies:

Install dependencies for your [`backend`](./backend). Open a terminal window and install the `backend`'s dependencies

```bash
cd backend
npm install
```

Open a separate terminal window and navigate to your [`frontend`](./frontend) directory and install its dependencies

```bash
cd frontend
npm install
```

### Database Configuration:

Create a .env file for your backend. Copy the contents of .env.sample to your .env file.

```bash
cd backend
touch .env
```

Create a MySQL database and name it shydan.

NOTE: Change the DATABASE_URL according to your database configuration

```bash
DATABASE_URL="mysql://username:password@localhost:3306/shydan"
```

### 2. Create and seed the database (backend)

On the terminal window used to install the backend npm dependencies, run the following command. This also creates the tables that are defined in [`prisma/schema.prisma`](./backend/prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

Now, seed the database with the sample data in [`prisma/seed.ts`](./backend/prisma/seed.ts) by running the following command:

```
npx prisma db seed
```

### 3. Start the server (backend)

On the same terminal used in step 2, run the following command to start the server:

```bash
npm run dev
```

The server is now running at [`http://localhost:3001/`](http://localhost:3001/).

### Frontend env:

Create a .env file for your frotnend. Copy the contents of .env.sample to your .env.local file.

```bash
cd backend
touch .env.local
```

### 4. Start the app (frontend)

On the terminal window used to install frontend npm dependencies, run the following command to start the app:

```bash
npm run dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.

## Using the REST API

You can also access the REST API of the API server directly. It is running [`localhost:3001`](http://localhost:3001)

## Evolving the app

Evolving the application typically requires three steps:

1. Migrate your database using Prisma Migrate
2. Update your server-side application code
3. Build new UI features in React

For the following example scenario, assume you want to add a "profile" feature to the app where users can create a profile and write a short bio about themselves.

### 1. Migrate your database using Prisma Migrate

The first step is to add a new table, e.g. called `Profile`, to the database. You can do this by adding a new model to your [Prisma schema file](./prisma/schema.prisma) file and then running a migration afterwards:

```diff
// schema.prisma

model Post {
  id        Int     @default(autoincrement()) @id
  title     String
  content   String?
  published Boolean @default(false)
  author    User?   @relation(fields: [authorId], references: [id])
  authorId  Int
}

model User {
  id      Int      @default(autoincrement()) @id
  name    String?
  email   String   @unique
  posts   Post[]
+ profile Profile?
}

+model Profile {
+  id     Int     @default(autoincrement()) @id
+  bio    String?
+  userId Int     @unique
+  user   User    @relation(fields: [userId], references: [id])
+}
```

Once you've updated your data model, you can execute the changes against your database with the following command:

```
npx prisma migrate dev
```

### 2. Update your application code

You can now use your `PrismaClient` instance to perform operations against the new `Profile` table. Here are some examples:

#### Create a new profile for an existing user

```ts
const profile = await prisma.profile.create({
  data: {
    bio: "Hello World",
    user: {
      connect: { email: "alice@prisma.io" },
    },
  },
});
```

#### Create a new user with a new profile

```ts
const user = await prisma.user.create({
  data: {
    email: "john@prisma.io",
    name: "John",
    profile: {
      create: {
        bio: "Hello World",
      },
    },
  },
});
```

#### Update the profile of an existing user

```ts
const userWithUpdatedProfile = await prisma.user.update({
  where: { email: "alice@prisma.io" },
  data: {
    profile: {
      update: {
        bio: "Hello Friends",
      },
    },
  },
});
```

### 3. Build new UI features in React

Once you have added a new endpoint to the API (e.g. `/api/profile` with `/POST`, `/PUT` and `GET` operations), you can start building a new UI component in React. It could e.g. be called `profile.tsx` and would be located in the `pages` directory.

In the application code, you can access the new endpoint via `fetch` operations and populate the UI with the data you receive from the API calls.

## How to contribute

Clone muna natin yung repo

1. git clone https://github.com/WarayTek-PH/project-shydan.git
2. cd project-shydan
3. git checkout staging
4. git pull origin staging

After maupdate yung staging branch natin, create tayo bagong branch kung may naka-assign na bagong task satin

Check mo yung issues sa github [Issues · WarayTek-PH/project-shydan (github.com)
](https://github.com/WarayTek-PH/project-shydan/issues)

Check mo sa issues kung may naka-assign na task sayo

Example naka-assign sayo is "Create a button feature"

1. git checkout -b feat/button
2. After mo magcreate ng button component, ipush mo na
3. git push origin feat/button
4. punta ka sa github -> pull request
5. Mag pull request ka
6. Ilagay mo sa title yung title nung feature mo, tas description ng Pull Request mo "Fixes #number-ng-issue" e.g. "Fixes #12" tapos yung message mo kun anong ginawa mo diyan sa branch basta make sure na may Fixes #issue-number para ma automate yung PR at issue mo.
7. Submit PR
8. Notify mo yung reviewers tas antayin mo nalang maapprove then merge
9. After ma merge nung PR mo, balik ka sa staging branch
   ```
    git checkout staging
   ```
10. ```
    git pull origin staging
    ```

## Resource

- [Prisma docs](https://www.prisma.io/docs)
