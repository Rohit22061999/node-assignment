import http from 'http'
const server =http.createServer((req, res) =>{
    if (req.url === "/"){
        res.write('<h2>Hello ! Node.js<h2>')
    }
    else if (req.url === "/about"){
        res.write('about Page')
    }
    else if (req.url=== "/gallery"){
        res.write('gallery Page')
    }
    res.end();
})
server.listen(5000);
console.log('server work on 5000 port')