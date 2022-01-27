import http from 'http';
import fs from 'fs';
import {parse} from 'querystring';


http.createServer((req,res)=>{
    if(req.url==="/" && req.method=='GET'){
        res.writeHead(200, {"Content-Type": "text/html"});
        let arrayOfStrings=[]
        let emplist=''
        let details = []
        fs.readFile("EmpDetails.txt",(err,data)=>{
            details=data.toString().split(',')
            console.log(details)
            for(let i=0;i<details.length;i++){
                arrayOfStrings[i]=parse(details[i])
            }
            let body=''
          console.log(arrayOfStrings)
          arrayOfStrings.map(val =>
            body += `<tr><td>${val.name}</td><td>${val.email}</td><td>${val.age}</td>`
        )
            if(err) throw err;
            res.write(` <!DOCTYPE html>
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
               <th>age</th>
               </thead>
               <tbody>
               ${body}
               </tbody>
               </table>
            </body>
            </html>`);
            res.end();
            
        })
    }
   else if(req.url==="/addEmployee" && req.method==='GET'){
        res.writeHead(200,{'content-type':'text/html'})
        fs.readFile('addEmployee.html',(err,data)=>{
            if (err) throw err;
            res.write(data);
            res.end();
    })
    }
    else if(req.method==="POST"){
        let body = ''
        req.on('data', (data) => {
            console.log(parse(data.toString()))
            fs.appendFile("EmpDetails.txt",data,(err)=>{
                if (err) console.log(err);
                fs.appendFile("EmpDetails.txt",',',(err)=>{
                    if (err) console.log(err);
                    res.end()  
                })
            })
            res.writeHead(301, { "Location": "http://localhost:6677/" });
        });
    }
 
}).listen(6677)