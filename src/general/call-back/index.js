"use strict";
const app = require('express')();
module.exports = function makeExpressCallback(controller, camelcaseKeys) {
    return (req, res) => {
        const httpRequest = {
            body: camelcaseKeys(req.body, { deep: true }),
            query: camelcaseKeys(req.query, { deep: true }),
            params: camelcaseKeys(req.params, { deep: true }),
            ip: req.ip,
            method: req.method,
            path: req.path,
            file: req.file,
            token: req.headers.authorization,
            hostname: req.headers.host,
            headers: {
                'Content-Type': req.get('Content-Type'),
                Referer: req.get('referer'),
                'User-Agent': req.get('User-Agent')
            }
        };
        controller(httpRequest)
            .then(httpResponse => {
            if (httpResponse.image) {
                const filename = httpResponse.image;
                const basedir = __dirname;
                const dirname = basedir.toString().replace(/call-back/g, "use-case/user/image/");
                res.sendFile(dirname + filename);
            }
            else {
                httpResponse.headers.VersionApp = '1.0.13';
                res.set(httpResponse.headers);
                res.type('json');
                res.status(httpResponse.statusCode).send(httpResponse.body);
            }
        })
            .catch(e => {
            res.status(500).send({ error: 'An unkown error occurred.' });
        });
    };
};
