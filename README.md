## Pegasus Job Tracker

Pegasus is designed to streamline the job search process. It provides a centralized platform where users can manage job
entries, keeping track of important details such as the role, company, location, status, and more.

The application aims to help users navigate their job search by providing an organized and efficient way to manage job
applications. With features such as adding, deleting, and updating job entries, users can maintain an up-to-date
overview of their job search progress.

Whether you're actively applying for jobs or passively keeping an eye on the market, Pegasus Job Tracker can help you
stay organized and on top of your job search.

## Contributing

Contributions are welcome. Please fork the repository and create a pull request with your changes.

To keep the service free, please consider [contributing to the costs](https://buy.stripe.com/bIYaEP9kL5Oq6Ry4gh).

## Description

This project is a full-stack application developed using TypeScript, Next.js, MongoDB, Zustand, shadcn-ui,
and Tailwind. It is designed to easily manage an overview over applications, contacts and other job search-related
notes.

## Technologies Used

- **TypeScript**: The main programming language used in this project. It enhances productivity and reduces run-time bugs
  by providing type safety.
- **Next.js**: A full-stack framework used for its architectural simplicity.
- **Zustand**: The main client-side state management library used for its simplicity.
- **React**: The main library used for building the user interface.
- **React Query**: Used for fetching data from the server and caching it.
- **React Hook Form**: Used for form validation.
- **shadcn-ui**: A component library used for its full-fledged accessibility and great design.
- **Tailwind**: Used for styling as it reduces the need to write native CSS.
- **Vercel**: The platform used for hosting the application because of its free tier. The API is built using serverless
  functions.
- **Google OAuth**: Used for authentication because of its simplicity and security.
- **node crypto**: Used for encryption and decryption of user data.
- **MongoDB Atlas**: The database used for storing job entries. Used due to its generous free tier. In an earlier
  iteration, Vercel's PostgreSQL was used; since ACID compliance of a relational database is not necessary for the use
  case, the document model speeds up development, and the free tier of MongoDB is more generous, it was migrated over to
  MongoDB Atlas.
- **Mongoose**: Used as the abstraction library for MongoDB iteraction for end-to-end type safety and simplicity.

## Encryption

Privacy is an important aspect of the application. Because of this, all text fields are encrypted using the following
approach:

- On user registration
  1. Generate a Key #1 based on the user's email address.
  2. Since the Google Account ID is unique and generally not known to anyone, it is used to generate a second key
     using PBKDF2 (Password-Based Key Derivation Function 2), Key #2.
  3. Key #2 is used to encrypt Key #1.
  4. The encrypted Key #1 is stored in the database as *user.encryptedKey*.
- On user data usage
  1. The encrypted Key #1 is decrypted using Key #2.
  2. The decrypted Key #1 is used to encrypt and decrypt the user's data in the API routes.

Please note that the encryption is not end-to-end, as the server has access to the decrypted data. This is a trade-off
between privacy and usability, as end-to-end encryption would require client-side encryption and decryption, which would
make the application more complex and less performant.

Another note is that only text fields are encrypted, other fields such as dates, booleans and numbers are stored in
plain text as they are deemed not sensitive.

## Installation

To install the project, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-directory>`
3. Install the dependencies: `npm install`

## Usage

To run the project, use the command: `npm run build`
