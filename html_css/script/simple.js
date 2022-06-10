async function userAction(url, met, Body=null, token= null) {

    const response = await fetch(url, {
        method: met,
        body: JSON.stringify(Body), // string or object
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    const myJson = await response.json(); //extract JSON from the http response
    // document.getElementById("show_text").textContent += myJson
    console.log(myJson);
    return myJson;
};


body={
    name: "Muhammad Saad",
    email: "mohsaad@example.com",
    password:"mosaad2020"
};

userAction("users",'POST', body).then(
    (data) => userAction("users/login","POST",body)).then(
    (data) => userAction("users/me","DELETE",body, data.token)
);
// userAction("users/login","POST",{email: body.email, password: body.password}).then(
//     (data) => userAction("users/me","DELETE",null,data.token));