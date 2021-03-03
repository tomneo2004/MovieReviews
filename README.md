###### tags: `Movie-Review`

Movie-Review
===

[TOC]

Online Document
===
[Document](https://hackmd.io/@svzAtIEhTNyi1iul4d1ZNA/ryNpiXv-u)

Description
===

This is a project that is about exploring movies. Explore movies that is popular or trending in cinema. Enter a keyword or specific movie name to search movies. Find a movie that is interesting to you and browsering it's details.

Platform
=== 

- [Website](https://digmovie.netlify.app/)

Stack
===

## Web Framework
- [Next.js](https://nextjs.org) build on top of [React](https://reactjs.org/) capable of SSG, SSR, ISG
  - Terms:
    - **SSG**: Static Site Generation
    - **SSR**: Server Side Rendering
    - **ISG**: Incremental Static Generation 
- [TypeScript](https://www.typescriptlang.org/) for type safe with **Next.js**
 
## Movie Data source
- [Themoviedb](https://developers.themoviedb.org/) 

## UI Framework
- [Material-UI](https://material-ui.com) with [Google Material Design Guidelines](https://material.io/design/guidelines-overview)
- [Framer Motion](https://www.framer.com/) for animation/motion
 
## Testing Framework
- [Cypress](https://www.cypress.io/) full test suit, unit, integration and end to end
 
## CI/CD (Continous Intergration/Deployment)
- [Circle.ci](https://circleci.com/) an automated pipeline. Testing -> building -> Releasing -> Delopyment
- [next-on-netlify](https://github.com/netlify/next-on-netlify) enable server side rendering for **Next.js** project when delopy to **Netlify**
 
## Automated Release
- [semantic-release](https://github.com/semantic-release/semantic-release) use for automated version management
- [Commitizen](https://github.com/commitizen/cz-cli) incorporate with **semantic-relase**. A tool that allow you to commit your code by following [ Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)
 
## Delopyment
- Web
  - [Netlify](https://www.netlify.com/)

Run application
===
- **Prerequisite**:
    - [node.js & NPM](https://www.npmjs.com/get-npm)
    - [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
    - [github account](https://github.com/)
    - API KEY
        1. Go to [themoviedb.org](https://www.themoviedb.org/)
        2. Create a new account if you havn't
        3. Login your account
        4. Go to settings under your account
        5. Select **API** section and generate new API key
        6. Copy **API Key**
        7. In project root create a file and name `.env.local`
        8. In side the file write `MOVIE_API_KEY = [Your API Key]` and save
        

## On local machine

1. Fork this project to your github

2. Use```git clone``` command to clone forked project to your folder on your machine

3. In your project folder run 
   ```
   npm install --legacy-peer-deps 
   ``` 
   to install all dependencies
   `--legacy-peer-deps` is because @cypress/react plugin not compatible with next.js version 10.x
   
4. In your project folder run 
   ```
   npm run dev
   ``` 
   to start local development server
   
5. Visit http://localhost:3000

## With Netlify on local machine
- **Prerequisite**:
    - [Netlify-CLI](https://docs.netlify.com/cli/get-started/)
        - **TL;TR** run 
          ```
          npm install -g netlify-cli
          ``` 
          this will install **netlify-cli** in **NPM** globally
        
1. run 
   ```
   npm run build
   ``` 
   for building production ready application
   
3. run
    ```
    npm run netlify-build
   ``` 
   this produce two folders at root project **out_functions** and **out_publish** which can be delopyed to **Netlify**
   
4. run 
   ```
   netlify dev
   ```
   
5. Visit http://localhost:8888/

Run test
===

## Cypress test on local machine
[Cypress](https://www.cypress.io/) is a fully integrated testing framework include all kind of testing, **Unit Test**, **Integreation Test**, **End to End/e2e Test**.

[Mocha](https://mochajs.org/) testing framework and [Chai](chaijs.com) assertion library are out of box and used in [Cypress](https://www.cypress.io/) here in this project.

In addition, [Cypress](https://www.cypress.io/) has serveral different plugins can be used. This project used [Cypress/react](https://github.com/cypress-io/cypress/tree/master/npm/react) for react component test.

Code coverage plugin [cypress/code-coverage](https://github.com/cypress-io/code-coverage) also used in this project. **Note** it does not instrument code, instead it generate report from [istanbul](https://istanbul.js.org/). But here project use [babel-plugin-istanbul](https://www.npmjs.com/package/babel-plugin-istanbul) for code instrument. Refer to **.babelrc** file in root folder for configuration. More detail on code instrument in Cypress [right here](https://docs.cypress.io/guides/tooling/code-coverage.html#Instrumenting-code)

### Interactive Testing
Running tests in an interactive window

1. run
   ```
   npm run e2e-test
   ```
2. wait for local server to boot up and then a window will popup
3. enjoy testing interactively

### None Interactive Testing
Run all tests without an interactive window, every tests will be record as .mp4 video clip stored under `cypress/videos`

1. run
   ```
   npm run ci-test
   ```
2. wait for testing done
3. see your results

CI/CD
===

## [Circle.ci](https://circleci.com/) & [Cypress](https://www.cypress.io/)
1. Setup your github with Circle.ci.
Connect Circle.ci to your github  Refer to [doc](https://circleci.com/docs/2.0/getting-started/#setting-up-circleci)
    - TL;TR
        1. Register Circle.ci account
        2. Login Circle.ci
        3. Go to [project page](https://app.circleci.com/projects/) and select which orgnization your forked porject is under. If you don't see your organization, follow [this](https://support.circleci.com/hc/en-us/articles/115014599088-My-GitHub-organization-is-not-listed) to grant Circle.ci to have permission to access your organiztion
        4. Find your forked project in dashboard and click it
        5. In dropdwon menu select `Node` and click button `Commit and Run` this will create a new branch in github and run Circle.ci pipeline

2. Enable github checks for Circle.ci(optional)
This allow your github reflecting Circle.ci runing status. Refer to [doc](https://circleci.com/docs/2.0/enable-checks/)
    - TL;TR
        1. In your Circle.ci dashboard and under organization, which have your forked project click `Projects` on left panel to make sure you are in Projects view **not in specific project**.
        2. Click `Organization Setting` on left side of panel
        3. Select `VCS` on left side of panel
        4. Click `Manage Github Checks`
        5. Follow rest of instruction presented

3. Setup Netlify live site
This is where live website will be deployed=
    1. Register an account on [Netlify](https://www.netlify.com/)
    2. Login your account
    3. Click `New site from Git` at dashboard under `Team overview` section
    4. Select github
    5. Select Organiztion and then select forked project. If you don't see it click `Configure the Netlify app on GitHub.` at bottom to setup permission on github
    6. Click name of forked project
    7. Click `Show Advance` to expand advance setting
    8. Click `New variable` to add new environement variable
    9. Remeber `.env.local` file we downloaded, it is key/value pair and one of them is API key to [themoviedb](https://developers.themoviedb.org/)'s API service. You need to add key and value here in Netlify. Or you can add it later at site setting
    10. Click `Deploy Site` at bottom
    11. Go to `Site setting`
    12. Select `Site detail` under `General` tab on left
    13. Write down or remember `API ID`
    14. Go to User setting 
    15. Select `OAuth` under `Applications` on left
    16. Click `New access token` under `Personal access tokens`
    17. Write description any you like but meaningful and click `Generate`
    18. Write down or remember token given by Netlify

4. Setup Cypress test results service
This is a service that is provided by Cypress. You can upload testing results to Cypress to see it in dashboard.
    1. Register an Cypress account [here](https://dashboard.cypress.io/login)
    2. Login account
    3. Click`Create New Project`
    4. Enter Project name and then click `Next Step`
    5. In project root folder locate `cypress.json` file
    6. Replace `projectId` value with the one given by cypress or add key/value pair if not exists
    7. Write down or remember `record key` given by cypress, you are going to use it in Circle.ci

5. Github Token
    1. Go to github
    2. Go to `settings` under your account
    3. Go to `Developer settings`
    4. Select `Personal access tokens`
    5. Generate a new token
    6. Write down or remember the token

6. Setup Circle.ci
    1. Go to dashboard in Circle.ci
    2. Go to forked project 
    3. Click `Project Settings`
    4. Select `Environment Variables` on left panel
    5. Add following key and value
        - CYPRESS_RECORD_KEY: remember `record key` given by cypress
        - GH_TOKEN: Github token at step 5
        - GIT_AUTHOR_EMAIL: whatever you like
        - GIT_AUTHOR_NAME: whatever you like
        - GIT_COMMITTER_EMAIL: whatever you like
        - GIT_COMMITTER_NAME: whatever you like
        - MOVIE_API_KEY: Remeber `.env.local` file we downloaded
        - NETLIFY_AUTH_TOKEN: Remember we genreate token from Netlify at step 3
        - NETLIFY_SITE_ID: Remeber `API ID` from Netlify at step 3

7. Push branch to github
    1. Install commitizen if you haven't
        ```
        npm install commitizen -g
        ```
    1. Make new branch at local machine name alpha
    4. Commit code with Commitizen.
        First add files that changed
        ```
        git add .
        ```
        then run
        ```
        git cz
        ```
        or
        ```
        npm run commit
        ```
    5. push to github
        ```
        git push origin alpha
        ```
    6. Observing Circle.ci building status in dashboard or in github under alpha branch
    7. Go to Cypress dashboard and checkout testing results of project
    8. If CI/CD success, go to live site see results
    