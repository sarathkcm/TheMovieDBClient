(function () {
    var tmdb = function (key) {
        if (!key)
            throw "Invalid API Key";
        var http = require('http');
        var https = require('https');
        var api_key = key;
        var settings = {
            "host": "api.themoviedb.org",
            "path": "/3",
            "images_url": "http://image.tmdb.org/t/p",
            "secure_images_url": "https://image.tmdb.org/t/p",
            "ssl": false,
            "timeout": 5000,
            "update_images_url": true
        };

        var tmdbConfig = null;

        tmdb.prototype.updateApiConfiguration = function () {
            if (!tmdbConfig && settings.update_images_url) {
                tmdbConfig = {};
                return this.call("/configuration", {}).then(function (response) {
                    settings.images_url = response.images.base_url;
                    settings.secure_images_url = response.images.secure_base_url;
                    tmdbConfig = response;
                }, function (e) {
                    tmdbConfig = null;
                });
            }
            return new Promise(function (resolve, reject) {
                resolve();
            });
        };

        tmdb.prototype.getCurrentSettings = function (options) {
            return settings;
        };

        tmdb.prototype.configure = function (options) {
            settings.host = options.host || settings.host;
            settings.path = options.path || settings.path;
            settings.images_url = options.images_url || settings.images_url;
            settings.ssl = options.ssl || settings.ssl;
            settings.timeout = options.timeout || settings.timeout;
            settings.update_images_url = options.update_images_url || settings.update_images_url;
        };

        tmdb.prototype.call = function (url, params) {
            return this.updateApiConfiguration().then(function () {
                return new Promise(function (resolve, reject) {
                    var params_str = "api_key=" + api_key;
                    for (var key in params) {
                        if (params.hasOwnProperty(key)) {
                            params_str += "&" + key + "=" + encodeURIComponent(params[key]);
                        }
                    }
                    try {
                        var httpOptions = {
                            host: settings.host,
                            path: settings.path + url + "?" + params_str,
                            headers: {
                                'Accept': 'application/json'
                            },
                            method: 'GET'
                        };

                        var request = (settings.ssl ? https : http).request(httpOptions, function (response) {

                            var res = '';

                            response.on('data', function (chunk) {
                                res += chunk;
                            });

                            response.on('end', function () {
                                try {
                                    resolve(JSON.parse(res));
                                }
                                catch (err) {
                                    reject(err);
                                }
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
            });
        };
        tmdb.prototype.getImageUrl = function (filename, size) {
            this.updateApiConfiguration();
            return (settings.ssl ? settings.secure_images_url : settings.images_url) + "/" + size + filename;
        };

    };

    module.exports = tmdb;
})();
