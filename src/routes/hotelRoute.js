import express from 'express';
const hotelRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
//const url = "mongodb://localhost:27017";
const url = "mongodb+srv://admin:mahi12345@cluster0.hoqxg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

function router(menu){
hotelRouter.route('/')
    .get((req, res)=>{
        //Creating a connection to the server
        mongodb.connect(url, (err, connection)=>{
            if(err){
                res.status(500).send("Error While Connecting")
            }
            else{
                //establish a connection
                const dbo = connection.db('hotelapp');
                dbo.collection('hotel').find({}).toArray((err, data)=>{
                    if(err){
                        res.status(501).send('Error while establishing a connection')
                    }
                    else{
                        res.render('Hotel', {title:"Hotel", hoteldata:data,menu})
                    }
                })
            }
        })
    });
hotelRouter.route('/Detail/:id') 
    .get((req, res)=>{
        const {id} = req.params
        mongodb.connect(url,(err, connection)=>{
            if(err){
                res.status(500).send("Error while connecting to server");
            }else{
                const dbo = connection.db('hotelapp');
                dbo.collection('hotel').findOne({_id:id}, (err, data)=>{
                    if(err){
                        res.status(501).send('Error while fetching a data');
                    }else{
                        res.render('HotelDetail', {title:"Hotel Detail Page", menu, hoteldata:data})
                    }

                })
            }
        })
        
    })

    return hotelRouter
}

module.exports = router;

