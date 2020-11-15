const express = require('express');
const app = express();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public")
    },
    filename: function(req, file, cb){
        const parts = file.mimetype.split("/");
        // mimetype??
        cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
    }
})


app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render("index");
});

const upload = multer({storage});

app.post("/save-image", upload.single("image"), (req, res) => {
    res.sendFile(`${__dirname}/public/${req.file.filename}`);
})



app.use(express.static("public"));


app.listen(5678, () =>console.log(`server started on port 5678`));