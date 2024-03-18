var translate = require('./queryjp')
// var db = require('./connection/firebase-admin')

const express = require ('express'); //return a function
const cors = require('cors');
const app = express(); //this represents our application
app.use(express.json());
app.use(cors())

app.get('/api/translate/jp', async (req, res) => {
    try {
        const needTranslate = req.query.jptext
        const url = encodeURI(`https://dict.asia/jc/${needTranslate}`);
        
        const data = await new Promise((resolve, reject) => {
            translate.jp(url, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        })

        // const newRef = db.ref('words').push();
        // await newRef.set(needTranslate);

        // 回傳成功的回應
        res.send(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error fetching or writing data');
    }
    
})
app.listen(3000, () => console.log('Listening on PORT 3000...'));