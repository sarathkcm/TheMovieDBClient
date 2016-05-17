(function () {
    var tmdb = function (key) {
        if (!key)
            throw "Invalid API Key";
        var http = require('http');
        var api_key = key;
        var settings = {
            "host": "api.themoviedb.org",
            "path": "/3",
            "images_url": "http://image.tmdb.org/t/p",
            "timeout": 5000,
            "update_images_url": true
        };

        var tmdbConfig = null;

        tmdb.prototype.updateApiConfiguration = function () {
            if (!tmdbConfig && settings.update_images_url) {
                tmdbConfig = {};
                this.call("/configuration", {}).then(function (response) {
                    settings.images_uri = response.images.base_url;
                    tmdbConfig = response;
                }, function (e) {
                    tmdbConfig = null;
                });
            }
        };

        tmdb.prototype.configure = function (options) {
            settings.host = options.host || settings.host;
            settings.path = options.path || settings.path;
            settings.images_url = options.host || settings.images_url;
            settings.timeout = options.timeout || settings.timeout;
            settings.update_images_url = options.update_images_url || settings.update_images_url;
        };

        tmdb.prototype.call = function (url, params) {
            this.updateApiConfiguration();
            var params_str = "api_key=" + api_key;
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    params_str += "&" + key + "=" + encodeURIComponent(params[key]);
                }
            }
            return new Promise(function (resolve, reject) {
                try {
                    var httpOptions = {
                        host: settings.host,
                        path: settings.path + url + "?" + params_str,
                        headers: {
                            'Accept': 'application/json'
                        },
                        method: 'GET'
                    };

                    var request = http.request(httpOptions, function (response) {

                        var res = '';

                        response.on('data', function (chunk) {
                            res += chunk;
                        });

                        response.on('end', function () {
                            resolve(JSON.parse(res));
                        });

                    });

                    request.setTimeout(settings.timeout, function () {
                        reject("Request timed out: " + settings.path + url + "?" + params_str);
                    });

                    request.on('error', function (err) {
                        reject(err);
                    });

                    request.end();
                }
                catch (err) {
                    reject(err);
                }
            });
        };
        tmdb.prototype.getImageUrl = function (filename, size) {
            this.updateApiConfiguration();
            return settings.images_url + size + filename;
        };

    };

    module.exports = tmdb;
})();
