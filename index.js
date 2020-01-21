const express = require('express')
const app = express()
const port = 3000
const {
    getElephants,
    getSanctuaries,
    getVisits
} = require('./queries') //destructuring

app.use(express.json())
app.get('/elephants', getElephants)
app.get('/sanctuaries', getSanctuaries)
app.post('/visits', getVisits)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))