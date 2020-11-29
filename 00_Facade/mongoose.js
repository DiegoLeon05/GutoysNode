const mongoose = require('mongoose')
const uri = "mongodb+srv://FactInAdmin:MongoseeQuinto5@factin.t8zyd.mongodb.net/FactInGutoys?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
}).
catch(error =>console.log(error));