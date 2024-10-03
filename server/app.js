const http = require('http');
const url = require('url');

const domains = '*';


class DictionaryAPI {
    constructor() {
        this.dictionary = {};
        this.requestsServed = 0;
    }

    incrementRequestCount() {
        this.requestsServed++;
    }

    getDefinition(res, word) {
        if (!word) {
            this.sendResponse(res, 400, { requestCount: this.requestCount, message: `ERROR: Word cannot be blank!` });
        } else if (this.dictionary[word]) {
            this.sendResponse(res, 200, { requestCount: this.requestCount, definition: this.dictionary[word] });
        } else {
            this.sendResponse(res, 400, { requestCount: this.requestCount, message: `ERROR: Word '${word}' not found!` });
        }
    }

    postDefenition(req, res) {

    }

    sendResponse(res, statusCode, data) {
        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    }

    handleRequest(req, res) {
        
    }
}