### Repo Built by:

|  [Jeremy J McWilliams](https://jeremyjmcwilliams.com)|
| :---------------------------------------------------: |
| [<img src="./profile/jeremy-mcwilliams.jpg" width = "200" />](https://github.com/J2Macwilliams)   |
|Full Stack Developer |
| [<img src="https://github.com/favicon.ico" width="30"> ](https://github.com/J2Macwilliams)   [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="30"> ](https://www.linkedin.com/in/jeremyjmcwilliams/) | 

---
> # Journey Co$t FrontEnd

`Status:`
*deployed & further development*

---

## `Pitch:` 
As a Traveler, I find that travel decisions are based upon finances.<br />
I need an application to plan, organize, budget, and guide me on my trips. <br />


### `Goal:` 

| Goal   |   Description|
|--------|------------|
|Responsiveness| Embedded Material-UI breakpoints utilizing Grid and Typography responsive styles
|Functionality| Vacation Creation, Month Calendar Display, Single-Day View, intuitive UI
|Performance | Apollo (hooks, cache) for handling GraphQL logic
| Auth | Auth0 Integration for Authentication, Authorization, and User Creation with GraphQL Upsert
|UI/UX| Material-UI components for sleek design

<br/>


### `Tech Stack`
- React
- Typescript
- Apollo(client , cache, hooks)
- GraphQL
- React-Router
- Dayjs
- React-hook-form
- Auth0
- Material-UI

<br/>

___
> ## Necessary ENV vars
### [Auth0](https://auth0.com/)
- REACT_APP_AUTH0_DOMAIN
- REACT_APP_AUTH0_CLIENT_ID
- REACT_APP_AUTH0_AUDIENCE

*Auth0 connections and config for utilizing Auth service and making secure calls to the BackEnd Server*

[React Auth0 Guide](https://auth0.com/blog/complete-guide-to-react-user-authentication/)

### `other`
- REACT_APP_ENDPOINT

*connection string to BackEnd Server*

<br/>

---

> ## `SPA`

<br/>

### `Splash:` Marketing Landing Page 
| Feature | Description |
| --------|-------------|
|CTA Buttons | Auth0 Login/Register  links |

<br/>
<br/>

### `NavBar:` brand, secure profile, and app navigation
| Feature | Description |
| --------|-------------|
| <img src='./src/assets/J.png' width='40'/> |  brand / homepage link |
| Avatar|Auth0 image displaying security|
|Navigation | responsive(hamburger or buttons) homepage link & logout|

<br/>
<br/>


### `Vacations:` Home Page for creation and collection of Vacations
| Feature | Description |
| --------|-------------|
| Vacation Creation | Form with calendar drop-down for date range selection, title, and budget |
| Vacations Collection |Vacation Buttons are links to specific trips with error handling delete functionality |


<br/>
<br/>

### `One Vacation:` Dashboard for all Vacation Logic 
| Feature | Description |
| --------|-------------|
| Calendar Month View |  onClick vacation dates navigation, intuitive additional date creation |
| Single Day View | day cost, date deletion, event creation(*modal popup*), event view(*list or time*), time manipulation(12/24hr), event details drawer( edit & error handling delete)|
| Notes View | (tablet & up) intuitive note creation, responsive note grid display, note details( edit & error handling delete)|


<br/>
<br/>

### `Update Vacation:`
| Feature | Description |
| --------|-------------|
|Update Form | inherits vacation title & budget with editable functionality |

<br/>

___



> ## [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

