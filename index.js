// const express = require("express");
// const bodyparser = require("body-parser");
// const request = require("requests");
// const https = require("https");
// const app = express();

// app.use(express.static("public"));

// app.use(bodyparser.urlencoded({extended: true}));

// app.get("/" , function(req , res){
//     res.sendFile(__dirname + "/signup.html");
// });


// app.post("/" , function(req, res){

// const firstname = req.body.fname;
// const lastname = req.body.lname;
// const email = req.body.email;

// // console.log(firstname , lastname , email);

// const data = {
//    members: [
// {
// email_address : email ,
//   status : "subscribed",
// merge_fields: {
//  FNAME : firstname ,
//  LNAME : lastname

// }
// }
//  ]

// };

// const jsondata = JSON.stringify(data);
// const url = "https://us8.api.mailchimp.com/3.0/lists/baacf10f6b";

// const options = {
//  metthod: "POST" ,

// auth:"dheerap:799b2b5c2c16150e074abba770e963e3-us8"
// }

//  const request = https.request(url , options , function(response){
//    response.on("data" , function(data){
// console.log(JSON.parse(data));
//    });
// });

// request.write(jsondata);
// request.end();

// });



// app.listen(1000 , function(){
//     console.log("server is running on port 1000");
// });








// api key of mailchimp

/*799b2b5c2c16150e074abba770e963e3-us8*/

//baacf10f6b   audiance list id







const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req , res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const { fname, lname, email } = req.body;
  
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us8.api.mailchimp.com/3.0/lists/baacf10f6b";

  const options = {
    method: "POST",
    auth: "dheerap:799b2b5c2c16150e074abba770e963e3-us8"
  };

  const request = https.request(url, options, function(response) {

    if(response.statusCode === 200){
      //res.send("sucessfully subscribed!");
      res.sendFile(__dirname + "/success.html");
    }
    else{

      //res.send("There was an error with signup , please try again!");
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});


app.post("/failure" , function( req ,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 1000, function(){
  console.log("Server is running on port 1000");
});
