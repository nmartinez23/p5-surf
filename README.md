# Udacity Project Neighborhood Map

## Bay Area Surf Spots

http://surfspot.getforge.io

You can clone, fork or download the Zip file and then open the index.html file in your browser. Users can click on one of the beach names on the list or click on one of the map markers to see more information about the surf spot. You can also use the search box which will quickly help to filter for the beach you are searching for. 

![screen shot 2016-08-09 at 7 27 41 pm](https://cloud.githubusercontent.com/assets/14083180/21907873/475252dc-d8c6-11e6-8f3d-06cb04ce8adc.png)


I used the Google Maps API to display a map of the San Francisco Bay Area. The Wikipedia API was also implemented to display beach information in the Map infowindows when clicked.

Defer async tags were used on the Google Maps script to allow for fast, consistent rendering. Knockout.js was also implemented to bind the data in the ViewModel to the index.html file. JSON and Ajax requests were also used as part of the ViewModel in the app.js file. 

