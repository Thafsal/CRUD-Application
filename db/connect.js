const mongoose =require('mongoose')
const MONGO_URI = 'mongodb+srv://thafsal97:wE8ES97da6UK5l45@nodeexpressproject.1rwxihe.mongodb.net/Crud-api?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI).then(()=>{
    console.log("Connected to data base.....")
}).catch((err)=>{
    console.log(err)
})