const express = require('express')
const app = express()
const { MongoClient, ObjectId } = require("mongodb");

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false}))
 
// Replace the following with your Atlas connection string 
const url = "mongodb+srv://gautier:backend@clusterbackend.wcefp.mongodb.net/building?retryWrites=true&w=majority"
const client = new MongoClient(url, {useUnifiedTopology: true});
let col, data
 // The database to use
 const dbName = "building";
 
 
 app.get('/building', (req,res) => { 
     async function getBuilding(){
         const get = await data.find().toArray();
         res.json(get);
     }
     getBuilding();
 })

 app.get('/building/:id', (req,res) => { 
    async function getBuilding(){
        const find = await data.findOne({"_id": ObjectId(req.params.id)})
        res.json(find);
    }
    getBuilding();
})

app.post('/building', (req,res) => { 
    async function postBuilding(){
        let house = new House (req.body.nbrOfRoom,req.body.garage,req.body.m2,req.body.streetName)
        data.insertOne(house);
        res.send(200);//ok le truc a bien été fait
    }
    postBuilding();
})

app.delete('/building', (req,res) => { 
    data.deleteOne({"_id": ObjectId(req.body.id)})
})


app.put('/building', (req,res) => { 
    async function getBuilding(){
        const find = await data.findOne({"_id": ObjectId(req.body.id)})
        let house = new House(find.nbrOfRoom, find.garage, find.m2, find.streetName)
        house.nbrOfRoom = req.body.nbrOfRoom,
        house.garage = req.body.garage,
        house.m2 = req.body.m2,
        house.streetName = req.body.streetName
        
        await data.updateOne({"_id": ObjectId(req.body.id)}, {$set: house})
    }
getBuilding();
})


 async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        col = client.db(dbName);
        data = col.collection("house")
        app.listen(3000);

    } catch (err) {
        console.log(err.stack);
    }

    
}

run().catch(console.dir);

class House {
    constructor(nbrOfRoom, garage = false , m2, streetName){
        this.nbrOfRoom = nbrOfRoom;
        this.garage = garage;
        this.m2 = m2;
        this.streetName = streetName;
    }

    printValues(){
        console.log(this.nbrOfRoom, this.garage, this.m2, this.streetName);
    }
}