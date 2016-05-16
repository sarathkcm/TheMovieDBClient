TheMovieDB-Client
=======

A simple node module to make calls to TheMovieDB API, based on EtienneWan's tmdb-js project, re-written with promises. 

Usage
-----------

Get your api key by signing up at [www.themoviedb.org](https://www.themoviedb.org/documentation/api)

```
var tmdb-client = require('themoviedb-client');
var tmdb = new tmdb-client(your_api_key);

tmdb.call("/movie/293660", {})
    .then(function (data) {
        console.log(data);
    });

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
