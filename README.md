# Inventory Management by Eithan Hollander (Tenable Exercise)
Welcome to my Inventory Management!

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher, I used v22)
- [MongoDB](https://www.mongodb.com/try/download/community) (locally or via Docker)
- [npm](https://www.npmjs.com/get-npm)
- [brew](https://brew.sh/)
- [git](https://git-scm.com/downloads/mac)

## Step 1: Set Up MongoDB

### Option 1: Running MongoDB Locally

Download and install [MongoDB](https://www.mongodb.com/try/download/community) on your machine, you can do it using **brew**
```bash
brew tap mongodb/brew
brew install mongodb-community@8.0
brew services start mongodb-community@8.0
```
MongoDB should now be running locally at mongodb://localhost:27017.

### Option 2: Running MongoDB via Docker
Alternatively, you can run MongoDB using Docker. If you don't have Docker installed, follow the installation instructions here.

To start MongoDB with Docker, run the following command:

```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

This will run MongoDB on localhost:27017.

## Step 2: Clone This Repository

Open a new termial and clone this repository to your local machine:

```bash
git clone git@github.com:EithanHollander/TenableInventoryExercise.git
cd tenable-exercise
```

## Step 3: Set Up Backend Service

Open a new terminal for the backend service and navigate to the `tenable-exercise` folder.
Then,

```bash
cd inventory-service
```

Install the dependencies:

```bash
npm install
```

Populate the Mongo DB with some Mock data, using the script:

```bash
npm run seed
```

And eventually, run the service:

```bash
npm run dev
```

## Step 3: Set Up Frontend App

Open a new terminal for the frontend app and navigate to the `tenable-exercise` folder.
Then,

```bash
cd inventory-mgmt
```

Install the dependencies:

```bash
npm install
```

And eventually, run the app:

```bash
npm run dev
```

you can now open your browser at `localhost:3000` and see the magic happen!
**NOTE:** The website should immediately redirect you to `localhost:3000/inventory`.


Have Fun!
