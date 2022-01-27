import http from 'http'
import fs from 'fs'
import  { parse } from 'querystring';



http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'Text/html' })
        fs.readFile('formTask.html', "UTF-8", (err, data) => {
            if (err) throw err;
            res.write(data)
            console.log("reading")
            res.end()
        })
    }
    else
        if (req.method === 'POST' ) {
            collectRequestData(req, result => {

                console.log("data is posted on the server");
                let body = ''
                body += `<tr><td>${result.name}</td><td>${result.email}</td><td>${result.feedback}</td>`

                console.log(result)
                res.end(`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                   <table>
                   <thead>
                   <th>Name</th>
                   <th>email</th>
                   <th>feeback</th>
                   </thead>
                   <tbody>
                   ${body}
                   </tbody>
                   </table>
                </body>
                </html>`)
           
            });
        }
        else {
            res.end();
        }

})
    .listen(8888)
console.log(`server is listening 8888 port`)


function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if (request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}