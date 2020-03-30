# SeatEat

<h4>App: <a href='http://gilau.fr:5000/'>http://gilau.fr:5000/</a></h4>
<h4>Git Repository: <a href='https://gits-15.sys.kth.se/adajon/SeatEat/'>https://gits-15.sys.kth.se/adajon/SeatEat/</a></h4>

SeatEat is an app that provides estimation of crowdedness at KTH’s different chapter halls. It fetches data about different programmes' schedules to estimate the number of people at a time. KTH students can view the current crowdedness of their respective chapter halls as well as daily and weekly. It is also possible to check in to a chapter hall. Other students can see where and when you checked in as well as what you are doing. 

With SeatEat you'll never have to step unprepared into a crowded hall again.

## Current features

* Fetches schedules for respective chapter halls at KTH from the <a href='https://www.kth.se/en/api/anvand-data-fran-kth-1.57059'>KTH API</a>.
* Displays the crowdedness estimation in three different views; current, daily and weekly.
* Allows for check in at a chapter hall. Checkout data is stored in a firebase db. User information is saved in local storage to allow the user to check out when returning to the website.

## Planned features

* Allow users to change the average student amount of each programme and class.

## Structure
The app is built with react and redux. The store is provided with react-redux which is also used to map state and dispatch to components. The app also uses react-router-dom for routing. It is written using TypeScript. Check in data is stored using firebase's firestore.

The app files are split into six folders described below.

### assets

Assets contain images such as the logotype.

### components

Here we have functional components that can be used in different parts of the app. 
* **bar-graph**  
The bar graph that can be used for both the daily and weekly views by providing it with different props. 
* **button**
A stylized button used for check in, cookie accept message etc.
* **center-content**  
Used to wrap content in a div that centers it.
* **chapter-hall-card**
A card with a link to a chapter hall view
* **check-in-card**
A card that shows info about a checked in person.
* **check-in-form**
A form that allows the active user to check in to a the active chapter hall.
* **check-in-status**
A page that show what people is checked in in the current state as well as the check in status of the active user.
* **circular-progress-indicator**  
A circular "spinner", used to track loading progress.
* **clickable**
Used to surround clickable buttons.
* **cookie-message**  
A bar that informs the user that SeatEat is using cookies.
* **crowd-current**
Used to show information about the current estimated crowd.
* **crowd-data-slider**  
Slider to be used with the bar graph.
* **crowd-graph**  
Uses bar-graph to display a graph of the crowdedness.
* **date-slider**  
Slider to be used with the bar graph for dates.
* **dialog**
Used to open a dialog (modal) window.
* **form**
Contains FC:s for form elements such as input and select.
* **hamburger-button**  
Returns a hamburger button used to show the navbar on mobile.
* **navbar**  
The navbar provides links to each chapter hall. Uses `NavLink` from `react-router-dom`.
* **view-card-description**
Used to explain the different views on the homepage.
* **view-navbar**  
A navbar to switch between different chapter hall views. The view cards (used to switch views) dispatch their respective view to the redux store.
* **content-padding**  
Used to wrap content in a div with padding.
* **page-container**
Used to wrap content on a page.

### credentials

Stores firebase credentials. Ignored by git.

### data

* ** chapter-hall-data
Contains a json with the chapter hall data.

* ** check-in-activities
Contains check in activity data and types.

* ** month-names
Contains an array with month names

### model
* **redux**  
The redux store, reducers, actions and their related functions are located here.
* **chapter-hall-model**
Contains types and functions related to the chapter halls
* **crowd-estimation-model**  
The estimation model consists of different classes that fetches data from the KTH API to estimate the crowds of different chapter halls.
* **firebase-model**
Creates an Firestore instance from the Firebase API.
* **views-model**  
The different available views are located here and can be used by different parts of the app. Their icons are stored as svg paths.

### pages
* **homepage**
A homepage which is used as an introduction to the webapp and contains information about usage.
* **main-content**  
The main-content-connect uses react-redux's `connect` to connect the view state to the main content page which displays different content depending on the view.

### theme
Contains a css files with css variables for colors etc to be used within the app.

-----

# Start development
The current site is now using express as server backend. Do the following to begin development:

1. Go to the root folder and type `node server` This starts the express app on port 5000.
2. Go to the client folder and type `npm start`. This starts the the front-end server on port 3000. This is the one that should be open in the browser.
3. Follow the instruction from the following [repository](https://gits-15.sys.kth.se/SeatEat/SeatEat-Credentials).

# Error
If you get an error running from a "clean" (You have not changed any code) master branch, it is often because you have not installed the latest packages. Go to the **client** folder and run `npm install`. Then restart the "Start development part again".
