TheMovieDBClient
=======
A simple node module to make calls to TheMovieDB API, based on [EtienneWan's tmdb-js](https://github.com/EtienneWan/tmdb-js), re-written with promises. 

[![NPM](https://nodei.co/npm/themoviedbclient.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/themoviedbclient/)

Usage
-----------

Get your api key by signing up at [www.themoviedb.org](https://www.themoviedb.org/documentation/api)

```javascript
var tmdbclient = require('themoviedbclient');
var tmdb = new tmdbclient(your_api_key);

tmdb.call("/movie/293660", {})
    .then(function (data) {
        console.log(data);
    });
    

tmdb.call("/find/tt1431045", {external_source:"imdb_id"})
    .then(function (data) {
        console.log(data);
    }); 

```

To get Image Urls of TMDb posters and backdrops, use the following method

```javascript
// poster_path: poster/backdrop filename returned by TMDb api,
// 'W500' : pre-defined size constant. See API documentation for details 
var url = tmdb.getImageUrl(poster_path, 'w500');
```


Various Urls defined inside the module are configurable

```javascript
tmdb.configure(
    {
        "host": "api.themoviedb.org",
        "path": "/3",
        "images_url": "http://image.tmdb.org/t/p",
        "timeout": 5000,
        "update_images_url": true
    }
);

```
The configuration values wil be stored within the module and will be used for making the API calls. There is no need to specify all the options in the object passed to this object as the module will fallback to the default/previously configured values if an option is not specified.

Confiuration Options


| Name              | Description                                                                                       | Default value                |
|-------------------|---------------------------------------------------------------------------------------------------|------------------------------|
| host              | Host of the TMDb API URL.                                                                         | "api.themoviedb.org"         |
| path              | host + path forms the Base URL of the API                                                         | "/3"                         |
| images_url        | HTTP API URL for downloading posters/images                                                       | "http://image.tmdb.org/t/p"  |
| secure_images_url | HTTPS API URL for downloading posters/images                                                      | "https://image.tmdb.org/t/p" |
| ssl               | If this is true, HTTPS version of API URLs will be used   (Thanks to @josephschmitt)              | false                        |
| timeout           | Timeout for the API call                                                                          | 5000                         |
| update_images_url | If this is true, the the latest URLs retrieved from TMDb API will be used for forming image URLS. | true                         |

Use the following methods to get current settings.

```Javascript
tmdb.getCurrentSettings();      // Get the current module settings.
```

LICENCE
-----------
The MIT License (MIT)

Copyright (c) 2014 EtienneWan

Copyright (c) 2016 Sarath KCM

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
