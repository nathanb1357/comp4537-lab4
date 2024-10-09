document.getElementById('button').innerHTML = MESSAGES.submit;
document.getElementById('title').innerHTML = MESSAGES.store;



class Store {
    constructor() {
        document.getElementById('button').onclick = function () {
            let word = document.getElementById('word').value;
            let definition = document.getElementById('definition').value;

            let XMLHttpRequestObject = new XMLHttpRequest();
            XMLHttpRequestObject.onreadystatechange = function () {
                if (XMLHttpRequestObject.status == 404 || XMLHttpRequestObject.status == 400) {
                    data = JSON.parse(XMLHttpRequestObject.responseText);
                    document.getElementById('content').innerHTML = data["message"];
                }
                if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 201) {
                    data = JSON.parse(XMLHttpRequestObject.responseText);
                    document.getElementById('content').innerHTML = data["message"];
                }
            }

            let data = { word: word, definition: definition };

            XMLHttpRequestObject.open('POST', "https://nbartyuk.site", true);
            XMLHttpRequestObject.send(JSON.stringify(data));
        }
    }
}

new Store();