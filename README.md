# Colourly

Colourly is a full-stack application inspired by the amazing tool created by [Coolers](https://coolors.co/palettes/trending "Coolers page"). It allows users to create their own colour palettes, see what others have created, save their favourites, delete pelettes, etc. Everyone can see all available palettes, however, to create, save or delete your own pelettes you must sign in or create an account. For the purpose of testing the application, I have offered two test accounts to log in. 

NextJS & MongoDB has been used to create the front end, back end & database. You can view thre live deployed version of Colourly [here](https://colourly.vercel.app/ "Deployed version"). 

However, if you are interested in setting this up on your own machine, I have described the process to do this below.

## What can it do?

Colourly was inspired by the amazing tool created by Coolers and only includes a very small subset of the tools Coolers offers. This project was a way for me to practice working with NextJS & MongoDB. This is in no way meant to be a commercially viable product. 

1. You can see all the existing palettes on the home page.
2. For each palette, clicking on the 3 dots will show a menu for that palette that will allow users to see the palette on the full screen, save it or delete it.  
3. Permissions: 
    - Everyone can see all palettes.
    - Signed in users may save or create new palettes.
    - Only users that have created a particular palette, may delete it. 
4. Users may create a new palette via the "Create" page and see their creations on the "Palettes You Created" page. Instructions to create are on the page. Saved palettes can be seen on the "Saved Palettes" page.
5. An FAQ page is added to answer some of the common questions and my learning experiences. 


## Final Product

1. Home Page
!["Home page"](./docs/images/homepage.png)

2. Palette - hover on a colour

    <img src="./docs/images/palette-view.png" alt="Hover on colour" width="40%">
3. Palette - click on a colour
    
    <img src="./docs/images/palette-colour-copied.png" alt="Click on colour" width="40%">
    
4. Palette - menu 
    
    <img src="./docs/images/palette-menu.png" alt="Palette menu" width="40%">

<!-- 5. Test users
!["Test Users"](./docs/images/test-users.png) -->

5. Sign In
!["Sign In"](./docs/images/login.png)

<!-- 7. Menu options when signed in
!["Menu options - signed in"](./docs/images/Menu%20-%201.png) -->

6. Create new palette
!["Create"](./docs/images/new-palette-empty.png)

    !["Created"](./docs/images/new-palette-selected.png)


## Dependencies
- emotion/react
- emotion/styled
- mui/icons-material
- mui/material
- axios
- bootstrap
- eslint
- eslint-config-next
- mongodb
- next
- react
- react-bootstrap
- react-color
- react-dom
- sass



## Live deployed version
You can view a live deployed version of Colourly [here](https://colourly.vercel.app/ "Deployed version").


## Getting Started
Fork and clone this repo to your local machine to begin. Before starting the process, `cd colourly` and install dependencies using the `npm install` command. Since this is a full-stack application I've broken down the setup process in two parts, database and application.

### **Database setup**
First a test database (db) must be created with seed data in it. 

1. Create a .env file in the root of the directory like the .env.example file and add your own connection string where it says `<YOUR_URI>`
2. Next, you will need to create the database itself. I will not be including full instructions to do this step. You can follow MongoDB's instructions to do this [here](https://learn.mongodb.com/courses/getting-started-with-mongodb-atlas).
3. Add a database named `colourly-db` to your M0 cluster. Add two collections, users and palettes.


### **Application setup**

1. Start the web server using the `npm run dev` command. The app will be typically served at <http://localhost:3000/>
2. Go to <http://localhost:3000/> in Google Chrome.
3. If the database connection is setup properly, you should be able to save new palettes.

## Known issues

These are some of the known issues that exist in this application and I plan on resolving them.

1. Colourly has only been tested in Google Chrome so far therefore behavior could be unexpected in other browsers.
2. No error messages are shown to the user if login fails or if a user tries to delete a palette they did not create. The page simply refreshes. I plan to add more helpful errors for such scenarios. 
3. Currently, any number of palettes may be created with the same colours. A better approach would be to check in the database for a similar combination prior to adding a redundant palette. 
4. The palette menu is not bound to the three dots icon for each palette. It's position does not change with the palette as the window is re-sized. 
5. Only a dummy login user is being used for the purposes of testing this project. 


