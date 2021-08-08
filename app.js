import express from 'express';
const app = express();
const port = process.env.PORT || 8700;



const menu = [
    {Link:'/', page:'Home'},
    {Link:'/city', page:'City'},
    {Link:'/hotel', page:'Hotel'},
]

const hotelRouter = require("./src/routes/hotelRoute")(menu);
const cityRouter = require("./src/routes/cityRoute")(menu);


app.get("/", (req, res) => {
    res.render('Home', {title:'Home Page', menu})

});


//For static files please
app.use(express.static(__dirname+'/public'));
//For HTML Files
app.set('views', './src/views');
//for View engines
app.set('view engine', 'ejs')

app.use('/hotel', hotelRouter)
app.use('/city', cityRouter)
app.listen(port, (err)=>{
    if(err) throw err;
    console.log(`The server is running on port ${port}`)
})




