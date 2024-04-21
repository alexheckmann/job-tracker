## Pegasus Job Tracker

Pegasus is designed to streamline the job search process. It provides a centralized platform where users can manage job entries, keeping track of important details such as the role, company, location, status, and more. 

The application aims to help users navigate their job search by providing an organized and efficient way to manage job applications. With features such as adding, deleting, and updating job entries, users can maintain an up-to-date overview of their job search progress. 

Whether you're actively applying for jobs or passively keeping an eye on the market, Pegasus Job Tracker can help you stay organized and on top of your job search.

## Description

This project is a full-stack application developed using TypeScript, Next.js, MongoDB, Zustand, shadcn-ui,
and Tailwind. It is designed to easily manage an overview over applications, contacts and other job search-related notes.

## Technologies Used

- **TypeScript**: The main programming language used in this project. It enhances productivity and reduces run-time bugs
  by providing type safety.
- **Next.js**: A full-stack framework used for its architectural simplicity.
- **Zustand**: The main client-side state management library used for its simplicity.
- **Drizzle and drizzle-zod**: Used as the ORM for their end-to-end type safety and simplicity.
- **React**: The main library used for building the user interface.
- **React Query**: Used for fetching data from the server and caching it.
- **React Hook Form**: Used for form validation.
- **shadcn-ui**: A component library used for its full-fledged accessibility and great design.
- **Tailwind**: Used for styling as it reduces the need to write native CSS.
- **Vercel**: The platform used for hosting the application because of its free tier. The API is built using serverless functions.
- **MongoDB Atlas**: The database used for storing job entries. Used due to its generous free tier. In an earlier iteration, Vercel's PostgreSQL was used; since ACID compliance of a relational database is not necessary for the use case, the document model speeds up development, and the free tier of MongoDB is more generous, it was migrated over to MongoDB Atlas.

## Installation

To install the project, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-directory>`
3. Install the dependencies: `npm install`

## Usage

To run the project, use the command: `npm run build`

## Contributing

Contributions are welcome. Please fork the repository and create a pull request with your changes.
