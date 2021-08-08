import express from 'express';
const cityRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
//const url = "mongodb://localhost:27017"
const url = "mongodb+srv://admin:mahi12345@cluster0.hoqxg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

function router(menu){
    cityRouter.route('/')
    .get((req, res)=>{
        mongodb.connect(url, (err, connection)=>{
            if(err){
                res.status(500).send("Error while connecting")
            }else{
                const dbo = connection.db('hotelapp');
                dbo.collection('city').find({}).toArray((err, data)=>{
                    if(err){
                        res.status(501).send("Error while fetching data")
                    }else{
                        res.render('City', {title: 'City Page', menu, citydetail: data})
                    }
                })
            }
        })

    });
    cityRouter.get('/Detail/:id')
        .get((req, res)=>{
            const {id} = req.params
            mongodb.connect(url,(err, connection)=>{
                if(err){
                    res.status(500).send("Error while connecting to server");
                }else{
                    const dbo = connection.db('HotelApp');
                    dbo.collection('city').findOne({_id:id}, (err, data)=>{
                        console.log(data)
                        if(err){
                            res.status(501).send('Error while fetching a data');
                        }else{
                            res.render('cityDetail', {title:"city Detail Page", menu, citydetail:data})
                        }
    
                    })
                }
            })
            
        });
    return cityRouter;
}

module.exports = router;