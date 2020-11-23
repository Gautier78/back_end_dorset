const express = require('express');                        // require the Express library and 
const app = express();                                    // 
const { MongoClient, ObjectId } = require("mongodb");   //the MongoDb driver

const bodyParser = require('body-parser');               //to use all the Http requests 
app.use(bodyParser.urlencoded({ extended: false}));      //we need to require body-parser
 
// Replace the following with your Atlas connection string 
const url = "mongodb+srv://gautier:backend@clusterbackend.wcefp.mongodb.net/building?retryWrites=true&w=majority";//link given in mongoDB with our username, password and bdd name
const client = new MongoClient(url, {useUnifiedTopology: true}); //create an instance of MongoClient
let col, data ;

 // The database to use
 const dbName = "building";  //building is the name of my DB in mongoDB
 
 //______________ All the CRUD operations______________//

 //Read operation
 //simply display my bdd. it get all my objects
 app.get('/building', (req,res) => {    //bdd displayed on the url localhost:3000/building
     async function getBuilding(){
         const get = await data.find().toArray();//read all the elements in my bdd
         res.json(get);
     }
     getBuilding();//run the function that Read all my bdd
 })

//Create operation
app.post('/building', (req,res) => { 
    async function postBuilding(){
        let house = new House (req.body.nbrOfRoom,req.body.garage,req.body.m2,req.body.streetName);//we will set the values of these elements in postman
        data.insertOne(house);//insert in the bdd the new house we add with postman
        res.send(200);//it says that the request as been done
    }
    postBuilding();//run the function that Insert a new house in the bdd
})

//Read operation
 app.get('/building/:id', (req,res) => {  //bdd displayed on the url localhost:3000/building/id 
    async function getBuilding(){
        const find = await data.findOne({"_id": ObjectId(req.params.id)});//I read one object by his id
        res.json(find);
    }
    getBuilding();//run the function that Read one element in my bdd thanks to his Id
})

//Update operation
app.put('/building', (req,res) => { 
    async function getBuilding(){
        const find = await data.findOne({"_id": ObjectId(req.body.id)});
        let house = new House(find.nbrOfRoom, find.garage, find.m2, find.streetName);//we will Update the values of these elements in postman
        house.nbrOfRoom = req.body.nbrOfRoom,
        house.garage = req.body.garage,
        house.m2 = req.body.m2,
        house.streetName = req.body.streetName
        
        await data.updateOne({"_id": ObjectId(req.body.id)}, {$set: house});
    }
getBuilding();//run the function that Update elements in my bdd 
})

//Delete operation
app.delete('/building', (req,res) => { 
    data.deleteOne({"_id": ObjectId(req.body.id)});//I delete one object by his id thanks to postman
})




 async function run() {
    try {
        await client.connect();//await  indicate that we should block further execution until the connexion has been completed 
        // client.connect() return a promise (represents the eventual completion (or failure) of an asynchronous operation and its resulting value)
        console.log("Connected correctly to server"); //if we succeed to connect to the server, this message is displayed
        col = client.db(dbName);
        data = col.collection("house");//link to the table
        app.listen(3000);// invoke the callback to connect to mongo database

    } catch (err) {     //if there is an unexpected error...
        console.log(err.stack); //print the error in the console
    }

    
}

run().catch(console.dir); //run the function above

class House {           //create the class named House
    constructor(nbrOfRoom, garage = false , m2, streetName){ //create and initiate an object
        this.nbrOfRoom = nbrOfRoom;
        this.garage = garage;
        this.m2 = m2;
        this.streetName = streetName;
    }

    printValues(){
        console.log(this.nbrOfRoom, this.garage, this.m2, this.streetName);
    }
}