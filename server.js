const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const items = require("./models/items");
const rentals = require("./models/rentals");


mongoose.connect(
    "mongodb://localhost:27017/user-database",
    { useNewUrlParser: true, useUnifiedTopology: true }, // Add options to avoid deprecation warnings
    (err) => {
        if (err) {
            console.error("MongoDB connection error:", err);
        } else {
            console.log("MongoDB is connected");
        }
    }
);


// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

//////AVAILABLE ITEMS

app.get("/",(req,res) => {
    res.send("welcome")
})


app.get("/api/items", (req, res) => {
    items.find({}).then(items => {
        res.json(items);
    });
});

app.get("/api/items/:id", (req, res) => {
    items.findOne({ _id: req.params.id }).then(item => {
        res.json(item);
    });
});

// To Create Item
app.post("/api/items", (req, res) => {
    console.log(req.body,'request-post')
    const id = req.body?.id
    const data = {
        name: req.body.title,
        typeBike: req.body.typeBike,
        price: req.body.price
    };
    items.create(data, (err, createdItem) => {
        if (err) {
            // Handle error
            return res.status(500).json({ error: "Internal server error" });
        }
        res.status(201).json({message:"Item Created Successfully"});
    });
    // items.findOne({ id: req.body.id }, (err, item) => {
    //     if (err) {
    //         console.log(err,'err')
    //         // Handle error
    //         return res.status(500).json({ error: "Internal server error" });
    //     }
    
    //     if (item) {
    //         // Item found, update it
    //         items.findByIdAndUpdate(id, data, { upsert: false, new: true }, (err, updatedItem) => {
    //             if (err) {
    //                 // Handle error
    //                 return res.status(500).json({ error: "Internal server error" });
    //             }
    //             // Send updated item as response
    //             res.json(updatedItem);
    //         });
    //     } else {
    //         // Item not found, create a new one
    //         items.create(data, (err, createdItem) => {
    //             if (err) {
    //                 // Handle error
    //                 return res.status(500).json({ error: "Internal server error" });
    //             }
    //             res.status(201).json({message:"Item Created Successfully"});
    //         });
    //     }
    // });
    
});

app.delete("/api/items/:id", (req, res) => {
    items.findByIdAndDelete(req.params.id).then(() => {
        res.json({ message: "Your item was deleted!" });
    });
});



////RENTAL ITEMS


app.get("/api/rentals", (req, res) => {
    rentals.find({}).then(items => {
        res.json(items);
    });
});

app.get("/api/rentals/:id", (req, res) => {
    rentals.findOne({ _id: req.params.id }).then(item => {
        res.json(item);
    });
});

app.post("/api/rentals", (req, res) => {
    const data = {
        name: req.body.title,
        typeBike: req.body.typeBike,
        price: req.body.price
    };
    rentals.findOne({ _id: req.body.id }, (err, item) => {
        if (item) {
            rentals.findByIdAndUpdate(req.body.id, data, { upsert: false }).then(
            updated => {
                res.json(updated);
            }
        );
        } else {
            rentals.create(data).then(created => {
                res.json(created);
            });
        }
    });
});

app.delete("/api/rentals/:id", (req, res) => {
    rentals.findByIdAndDelete(req.params.id).then(() => {
        res.json({ message: "Your item was deleted!" });
    });
});



app.listen(3333, () => console.log("Server is running on port 3333"));
