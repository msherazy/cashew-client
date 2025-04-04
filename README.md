# Cashew Client
Cashew Client is a web application built with React and TypeScript, designed to provide a seamless user experience for managing personal information and documents. The application is hosted on DigitalOcean and the source code is available on GitHub.

## Live Demo

You can access the live demo of the application [here](https://cashew-client-bpugd.ondigitalocean.app/).

## Repository

The source code for this project is available on GitHub. You can find it [here](https://github.com/msherazy/cashew-client.git).

## Features

- User authentication and profile management
- Upload and display of Emirates ID front and back images
- Review and edit personal information
- Responsive design for various screen sizes

## Technologies Used

- **React**: A JavaScript library for building user interfaces
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript
- **Vite**: A build tool that provides a faster and leaner development experience for modern web projects
- **Mantine**: A React component library with a focus on usability and accessibility
- **Yarn**: A package manager that doubles down as a project manager
- **DigitalOcean**: Cloud infrastructure provider for hosting the application

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/msherazy/cashew-client.git
    cd cashew-client
    ```

2. Install dependencies:
    ```sh
    yarn install
    ```

3. Start the development server:
    ```sh
    yarn dev
    ```

4. Open your browser and navigate to `http://localhost:5173`.

## Scripts

- `yarn dev`: Starts the development server
- `yarn build`: Builds the application for production
- `yarn lint`: Runs ESLint to check for linting errors
- `yarn format`: Formats the code using Prettier

## Project Structure

```sh
.
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── public
│   └── vite.svg
├── src
│   ├── assets
│   │   ├── react.svg
│   │   └── success.svg
│   ├── components
│   │   ├── auth-steps
│   │   │   ├── index.tsx
│   │   │   ├── step1.tsx
│   │   │   ├── step2.tsx
│   │   │   └── step3.tsx
│   │   ├── dropzone.tsx
│   │   ├── index.ts
│   │   └── input.tsx
│   ├── config
│   │   ├── env.ts
│   │   └── index.ts
│   ├── constants
│   │   ├── endpoints.ts
│   │   ├── geo.ts
│   │   ├── index.ts
│   │   ├── locales.ts
│   │   └── mantine.ts
│   ├── hooks
│   │   ├── index.ts
│   │   ├── useIdBack.ts
│   │   ├── useIdFront.ts
│   │   └── useOCR.ts
│   ├── main.tsx
│   ├── pages
│   │   ├── __root.tsx
│   │   ├── auth
│   │   │   └── index.tsx
│   │   ├── index.tsx
│   │   └── success
│   │       └── index.tsx
│   ├── providers
│   │   ├── index.tsx
│   │   ├── mantine.tsx
│   │   └── router.tsx
│   ├── routeTree.gen.ts
│   ├── schema
│   │   ├── auth.ts
│   │   └── index.ts
│   ├── services
│   │   ├── auth.ts
│   │   └── index.ts
│   ├── styles
│   │   ├── global.css
│   │   └── mantine.css
│   ├── types
│   │   ├── global.d.ts
│   │   ├── index.ts
│   │   ├── router.ts
│   │   ├── step.ts
│   │   └── user.ts
│   └── utils
│       ├── axios.ts
│       ├── date.ts
│       ├── emirates-id.ts
│       ├── index.ts
│       ├── noop.ts
│       └── notifications.ts
├── static.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── yarn.lock
