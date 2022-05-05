import express from 'express';
import fetch from 'node-fetch';

var app = express();

var PORT = process.env.PORT || 3000;

app.post('/oauth/token', function(req, res) {
    const response = {
        access_token: "no-auth"
    }

    res.send(response);
});

app.get('/content/:domain/download-url', function(req, res) {
    const url = { downloadUrl: `https://logo.clearbit.com/${req.params.domain}?size=800` };
    res.send(url);
});

app.get('/content/', async function(req, res) {
    const response = {
        contentCount: 0,
        offset: 0,
        content: []
    }

    if (req.query.pageNumber > 1) {
        res.send(response)
    }

    const domain = req.query.search.indexOf(".com") > 0 ? req.query.search : `${req.query.search}.com`

    try {
        const request = await fetch(`https://logo.clearbit.com/${domain}`);
        if (request.status === 200) {
            response.content.push({
                id: domain,
                mimeType: "image/png",
                previewUrl: `https://logo.clearbit.com/${domain}`,
                name: `${domain} - from clearbit`,
                tags: domain
            })
            response.contentCount = 1;
        }

    } catch (error) {
        console.log(error);
    }

    res.send(response);
});

app.get('/', function(req, res) {
    res.sendStatus(200);
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:', PORT);
});