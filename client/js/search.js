document.getElementById('button').innerHTML = MESSAGES.search;
document.getElementById('title').innerHTML = MESSAGES.search;


class Search {
    constructor() {
        document.getElementById('button').onclick = function () {
            XMLHttpRequestObject = new XMLHttpRequest();
            XMLHttpRequestObject.onreadystatechange = function () {
                if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 200) {
                    let data = JSON.parse(XMLHttpRequestObject.responseText);

                    // format search result into text
                    let searchResult = MESSAGES.searchResultSuccess.replace('{count}', data.requestCount);
                    searchResult = searchResult.replace('{word}', document.getElementById('search').value);
                    searchResult = searchResult.replace('{definition}', data.definition);

                    document.getElementById('content').innerHTML = searchResult;
                }

                if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 404) {
                    let data = JSON.parse(XMLHttpRequestObject.responseText);

                    document.getElementById('content').innerHTML = data["message"];
                }
            }

            //if word isn't string without numbers give error
            if (document.getElementById('search').value.match(/[^a-zA-Z]/)) {
                document.getElementById('content').innerHTML = MESSAGES.regexError;
            } else {
                let word = document.getElementById('search').value;
                XMLHttpRequestObject.open('GET', "https://nbartyuk.site/?word=" + word, true);
                XMLHttpRequestObject.send();
            }
        }
    }
}