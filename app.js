const express = require("express");
const app = express();
const https = require("https");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.post("/",(req,res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields: {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/3a3ea30816";

    const details = {
        method: "POST",
        auth : "adnaan07:53d6c10497b702d5e330d76474357830-us14"
    }

    const request = https.request(url,details,(response) => {
        response.on("data",function(data){
            console.log(data);
        });
    });

    request.write(jsonData);
    request.end();
    console.log(firstName + " " + lastName + " " + email);
    res.set("Content-Type", "text/html");
    res.write("<h2>The Details entered are : </h2>");
    res.write("<ol><li>" + firstName + "</li><li>" + lastName + "</li><li>" + email + "</li></ol>");
    res.send();
});
app.use(express.static("public"));
app.get("/",(req,res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(4500,"127.0.0.1",() => {
    console.log("Running port no 4500");
});

// My API key 
// 53d6c10497b702d5e330d76474357830-us14

//List id
// 3a3ea30816