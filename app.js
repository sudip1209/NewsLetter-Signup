const express=require("express");
const bodyParser = require("body-parser");
const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
    
})
app.post("/",function(req,res){
    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const email=req.body.email;
const data={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstname,
                LNAME:lastname 
        }}]};
        const jsonData=JSON.stringify(data);
        const url="https://us21.api.mailchimp.com/3.0/lists/293e745f48";
        const options={
            method:  "POST",
            auth:"sudip1:5a7602da3d7d79ec5214b5eb9f597274-us21"
        };
        const request=https.request(url,options,function(response){

           if(response.statusCode===200) {
            res.sendFile(__dirname+"/sucess.html");
           }
           else{
            res.sendFile(__dirname+"/failuer.html");
           }
            response.on("data",function(data){
                console.log(JSON.parse(data));
            });
        });
        request.write(jsonData);
        request.end();
});
app.post("/failuer",function(req,res){
    res.redirect("/");
});
app.listen(process.env.PORT || 3000,function()
{
    console.log("server is live on 3000");
});