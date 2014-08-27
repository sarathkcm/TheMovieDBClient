tmdb-js
=======

A simple JS object to call the API of TheMovieDB.  

Get Started
-----------

First, insert the script into your HTML file :
```html
<script type="text/javascript" src="/path/to/tmdb.js"></script>
```
Set your api_key on line 4.  
(You can make calls to the API with SSL/TLS by modifying the uri to begin with https:// instead of http://)  

Test the script by making a simple call with the console :
```js
tmdb.call("/configuration", {},
  function(e){
    console.log("Success: "+e)
  }, 
  function(e){
    console.log("Error: "+e)
  }
)
```
It should always return a JSON object. If you get the error callback, then it's probably that you made a mistake in your api_key or in the url (first argument of tmdb.call).

Usage
-----
```js
tmdb.call(url, params, success, error)
```
url (String) : The method you want to call, beginning with "/". [See all methods here](http://docs.themoviedb.apiary.io/ "Going to APIary.io")  
params (Object) : Set your parameters here. Api_key is already included, no need to add it again ;) For example calling method /search/movie) :
```json
{
  "query": "The Hitchhiker's Guide to the Galaxy",
  "year": 2005,
  include_adult: false
  
}
```
success & error (Functions) : Callbacks with one argument to get the data, already parsed as JSON.

