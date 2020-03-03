# SeatEat

<p>App: <a href='http://gilau.fr:5000/'>http://gilau.fr:5000/</a></p>
<p>Git Repository: <a href='https://gits-15.sys.kth.se/adajon/SeatEat/'>https://gits-15.sys.kth.se/adajon/SeatEat/</a></p>
##
SeatEat is an app that provides estimation of crowdedness at KTH’s different chapter halls. It fetches data about different programmes' schedules to estimate the number of people at a time. KTH students can view the current crowdedness of their respective chapter halls as well as daily and weekly. With SeatEat you'll never have to step unprepared into a crowded hall again.

## Current features

* Fetches schedules for respective chapter halls at KTH from the <a href='https://www.kth.se/en/api/anvand-data-fran-kth-1.57059'>KTH API</a>.
* Displays the crowdedness estimation in three different views; current, daily and weekly.

## Planned features

* Allow users to change the average student amount of each programme and class.
* Store average student amount in a firebase db.

## Structure
The app is built with react and redux. The store is provided with react-redux which is also used to map state and dispatch to components. The app also uses react-router-dom for routing. It is written using TypeScript.

The app files are split into six folders described below.

### assets

Assets contain images such as blueprints for the chapter halls and the logotype.

### components

Here we have functional components that can be used in different parts of the app. 
* **bar-graph**  
The bar graph that can be used for both the daily and weekly views by providing it with different props. 
* **center-content**  
Used to wrap content in a div that centers it.
* **chapter-map**  
Returns a chapter-map, indicating its crowdedness by its color. The crowdedness level and blueprint image is provided by props.
* **circular-progress-indicator**  
A circular "spinner", used to track loading progress.
* **crowd-data-slider**  
Slider to be used with the bar graph.
* **crowd-graph**  
Uses bar-graph to display a graph of the crowdedness.
* **date-slider**  
Slider to be used with the bar graph for dates.
* **hamburger-button**  
Returns a hamburger button used to show the navbar on mobile.
* **navbar**  
The navbar provides links to each chapter hall. Uses `NavLink` from `react-router-dom`.
* **view-navbar**  
A navbar to switch between different chapter hall views. The view cards (used to switch views) dispatch their respective view to the redux store.
* **content-padding**  
Used to wrap content in a div with padding.

### data

Contains a json with the chapter hall data. This is planned to be stored in the firebase db instead.

### model
* **redux**  
The redux store, reducers, actions and their related functions are located here.
* **crowd-estimation-model**  
The estimation model consists of different classes that fetches data from the KTH API to estimate the crowds of different chapter halls.
* **views**  
The different available views are located here and can be used by different parts of the app.

### pages
* **main-content**  
The main-content-connect uses react-redux's `connect` to connect the view state to the main content page which displays different content depending on the view.

### theme
Contains a css file with css variables for colors to be used in the app.

-----

# Start development
The current site is now using express as server backend. Do the following to begin development:

1. Go to the root folder and type `node server` This starts the express app on port 5000.
2. Go to the client folder and type `npm start`. This starts the the front-end server on port 3000. This is the one that should be open in the browser.

# Error
If you get an error running from a "clean" (You have not changed any code) master branch, it is often because you have not installed the latest packages. Go to the **client** folder and run `npm install`. Then restart the "Start development part again".
