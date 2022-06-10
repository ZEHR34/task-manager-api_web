function sendRequest(method, url, user = null, password = null, body = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);

        xhr.responseType = 'json';
        if (user && password) {
            const authorizationBasic = window.btoa(`${user}:${password}`);
            xhr.setRequestHeader('Authorization', `Basic ${authorizationBasic}`);
        }
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };

        xhr.onerror = () => {
            reject(xhr.response);
        };

        xhr.send(JSON.stringify(body));
    });
}
const requestURL = 'http://localhost/user';

let body = {
    name: 'Muhammad',
    email: 'mohsaad@example.com',
    password: 'mosaad2020',
};

const bodyChanged = {
    name: '1234324d',
    email: 'mohsaad@example.com',
    password: 'mosaad2020',
};

sendRequest('POST', requestURL, null, null, body)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
//
// sendRequest('GET', `${requestURL}/user1`)
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
//
// sendRequest('PUT', `${requestURL}/user1`, 'user3', '3', bodyChanged)
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
//
// sendRequest('DELETE', `${requestURL}/user111`, 'user3', '3')
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
