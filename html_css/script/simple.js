async function userAction(url, met, Body) {
    const response = await fetch(`http://localhost:8000/users`, {
        method: 'POST',
        body: Body, // string or object
        headers: {
            'Content-Type': 'application/json'
        },
        port:8000
    });
    const myJson = await response.json(); //extract JSON from the http response
    // console.log(myJson)
    document.getElementById("show_text").textContent += myJson
};


body={
    "name": "Muhammad Saad",
    "email": "mohsaad@example.com",
    "password":"mosaad2020"
};
userAction("users",'POST', body);

// document.getElementById("show_text").textContent += " this has just been added";