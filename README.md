# SWEConnect

SWEConnect looks to provide JHU startup projects and SWEC with a means to find people who are looking to get involved by providing an application management system. Users can create projects, and then create applications that people can apply for. Any user looking to get involved can search for roles through various methods and apply!

## Installing / Getting started

> A quick introduction of the minimal setup you need to get the app up & running on a local computer

1. Make sure you have these prerequisites installed: [yarn](https://classic.yarnpkg.com/en/docs/getting-started), [Docker](https://docs.docker.com/engine/install/), [ngrok](https://ngrok.com/download).  

2. Clone the repository and navigate to the root folder in the terminal.

3. Add a `.env` file in the root folder of this repository containing the fields in the`.env.example` file, and fill in the required environment variables.

4. Run `yarn` to install dependencies.

5. To run locally: 

    a. Run `yarn dev` in one terminal

    b. Run `yarn ngrok` in another terminal
    
    c. Go to (http://localhost:3000/) in your browser.

### Code style and formatting

To run prettier: `yarn format`.

### Deployment

As of now, SWEConnect uses Next.js and Vercel for deployment. For a guide on deployment, check out (https://vercel.com/docs/deployments/overview)