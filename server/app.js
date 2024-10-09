const http = require('http');
const url = require('url');

const DOMAINS = 'https://comp4537lab4.vercel.app/'; // domains with CORS access
const REGEX = /^[a-zA-Z\s-]+$/;                     // Regex for words and definitions
const PORT = 3000;                                  // Port of communication
const HOST = 'localhost';                           // IP of host


class DictionaryAPI {
    constructor() {
        this.dictionary = {
            'book': 'A literary composition that is published or intended for publication.',
            'banana': 'A long curved fruit which grows in clusters and has soft pulpy flesh and yellow skin when ripe.',
            'sport': 'An activity involving physical exertion and skill in which an individual or team competes against another.'
        }
        this.requestCount = 0;
    }

    incrementRequestCount() {
        this.requestCount++;
    }

    getDefinition(res, word) {
        if (!word || !REGEX.test(word)) {
            this.sendResponse(res, 400, { requestCount: this.requestCount, message: `ERROR: Word must be alphabetic!` });
        } else if (this.dictionary[word]) {
            this.sendResponse(res, 200, { requestCount: this.requestCount, definition: this.dictionary[word], message: `Definition retrieved succesfully!` });
        } else {
            this.sendResponse(res, 404, { requestCount: this.requestCount, message: `ERROR: Word '${word}' not found!` });
        }
    }

    postDefenition(req, res) {
        let query = '';
        req.on('data', (chunk) => {
            query += chunk.toString();
        });
        req.on('end', () => {
            const data = JSON.parse(query);
            const word = data.word;
            const definition = data.definition;

            if (!word || !definition || !REGEX.test(word) || !REGEX.test(definition)) {
                this.sendResponse(res, 400, { requestCount: this.requestCount, message: `ERROR: Word and definition must be alphabetic!` });
            } else if (this.dictionary[word]) {
                this.sendResponse(res, 404, { requestCount: this.requestCount, message: `ERROR: Word '${word}' already exists!` });
            } else {
                this.dictionary[word] = definition;
                let totalEntries = Object.keys(this.dictionary).length;
                this.sendResponse(res, 201, { requestCount: this.requestCount, dictionarySize: totalEntries, message: `New entry recorded: '${word}: ${definition}'` });
            }
        });
    }

    sendResponse(res, statusCode, data) {
        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    }

    handleRequest(req, res) {
        this.incrementRequestCount();
        res.setHeader('Access-Control-Allow-Origin', DOMAINS);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

        const parsedUrl = url.parse(req.url, true);
        const method = req.method;
        
        console.log(method);
        if (method === "GET") {
            const word = parsedUrl.query.word;
            this.getDefinition(res, word);
        } else if (method === "POST") {
            this.postDefenition(req, res);
        } else {
            this.sendResponse(res, 405, { requestCount: this.requestCount, message: 'Method not allowed!'});
        }
    }
}


const dictionaryApi = new DictionaryAPI();
http.createServer((req, res) => {
    dictionaryApi.handleRequest(req, res);
}).listen(PORT, HOST, () => {
    console.log(`Server running on https://${HOST}:${PORT}`);
});