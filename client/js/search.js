document.getElementById('button').onclick = function() {
    XMLHttpRequestObject = new XMLHttpRequest();
    XMLHttpRequestObject.onreadystatechange = function() {
        if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 200) {
            data = JSON.parse(XMLHttpRequestObject.responseText);
            document.getElementById('content').innerHTML = "Word: " + document.getElementById('search').value + "<br>Definition: " + data.definition;
        }

        if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 404) {
            data = JSON.parse(XMLHttpRequestObject.responseText);
            document.getElementById('content').innerHTML = data["message"];
        }
    }

    //if word isn't string without numbers give error

    if (document.getElementById('search').value.match(/[^a-zA-Z]/)) {
        document.getElementById('content').innerHTML = "Error: Word must be alphabetic!";
        return;
    } else {
        let word = document.getElementById('search').value;
        XMLHttpRequestObject.open('GET', "http://localhost:3000/?word=" + word, true);
        XMLHttpRequestObject.send();
    }
}