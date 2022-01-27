import fs from'fs'
fs.appendFile('entered data.txt',"hello",(err,data)=>{
    if (err) throw err;
    console.log("appended")
}
)
fs.readFile('entered data.txt',(err,data)=>{
    if (err) throw err;
    console.log(data.toString());
})

