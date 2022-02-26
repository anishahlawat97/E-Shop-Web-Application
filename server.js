const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models');

db.mongoose.connect(
    db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
)
.then(() => {
    console.log("Connected to the Database");
})
.catch(err => {
    console.log("Cannot connect to the Database", err);
    process.exit();
});

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to UpGrad E-shop"
    });
});

require('./routes/user.routes')(app);
require('./routes/address.routes')(app);
require('./routes/product.routes')(app);

const port = 8085;
app.listen(port, () => {
    console.log(`Server is listening on Port ${port}`);
});
