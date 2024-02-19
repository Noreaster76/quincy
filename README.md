# Quincy

This Node.js service is designed to scrape RSS feeds and store episode data in a SQLite database, leveraging Prisma as an ORM. It automatically processes episodes from a predefined list of RSS feed URLs, capturing essential information such as title, description, publication date, and duration.

## Setup Instructions

### Prerequisites

- Node.js (v14 or newer recommended)
- npm (v6 or newer)

### Installation

1. **Clone the Repository**

   ```bash
   git clone git@github.com:Noreaster76/quincy.git
   cd quincy
   ```

2. **Install Dependencies**

   Navigate to the project directory and run:

   ```bash
   npm install
   ```

### Setting Up the Database

This project uses SQLite, managed through Prisma. To set up and migrate the database:

1. **Generate Prisma Client**

   ```bash
   npx prisma generate
   ```

2. **Create a local `.env` file**

   ```bash
   echo 'DATABASE_URL="file:./dev.db"' > .env
   ```

3. **Run Migrations**

   Ensure the SQLite database is set up with the correct schema:

   ```bash
   npx prisma migrate dev
   ```

   This command creates a SQLite database file according to the schema defined in `prisma/schema.prisma`.

### Running the Application

To start the service and begin processing RSS feeds:

```bash
npm run build
npm run start
```

This compiles the TypeScript code and runs the compiled JavaScript from the `dist` directory.

### Exploring the Downloaded Episodes

Since the episodes are downloaded and persisted to a local SQLite database, you can explore it from your terminal as follows:

```bash
➜  quincy git:(main) ✗ sqlite3 prisma/dev.db
SQLite version 3.43.2 2023-10-10 13:08:14
Enter ".help" for usage hints.
sqlite> select count(id) from Episode;
2060
sqlite> .exit
➜  quincy git:(main) ✗
```

## Note

There was a requirement that sort of sounded like this service should be invoked from a network call. If that is the case, I respectfully push back on that requirement, and instead argue that `npm run build` could simply be invoked from a `cron` job running locally. There's no real reason why this service should have to be invoked over a network; it makes more sense for it to simply be kicked off on a regular schedule.

## Known Issues

- **Duration Parsing in `hh:mm:ss` Format:** Currently, parsing episode durations provided in `hh:mm:ss` format from RSS feeds does not work as expected. Fixing this is probably pretty straightforward, but I have to submit what I have so far and consider it done.

## License

Please create an issue if you want me to add a license.
