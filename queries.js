const {Pool} = require('pg')
const pool = new Pool ({
    host: 'test-db.czvlzefg23d7.us-east-1.rds.amazonaws.com',
    port: 5432,
    user: 'someadmin',    
    database: 'postgres',
    password: 'somepassword'
})

const getElephants = (request, response) => {
    pool.query('SELECT * FROM elephants', (error, results) => {
        if(error) {
            console.log(error)
            throw error 
        }   
            console.log(results.rows)
            response.status(200).json(results.rows)
    })
}

const getSanctuaries = (request, response) => {
    pool.query('SELECT * FROM sanctuaries', (error, results) => {
        if(error) {
            console.log(error)
            throw error
        } 
        console.log(results.rows)
        response.status(200).json(results.rows)
    })
}

const getVisits = (request, response) => {
    const joinQuery = `
    SELECT sanctuaries.name
    FROM sanctuaries
    JOIN visitation ON visitation.sanctuary_id = sanctuaries.sanctuary_id
    JOIN elephants ON visitation.elephant_id = elephants.elephant_id
    WHERE elephants.name = '${request.body.data}';`

    pool.query(joinQuery, (error, results) => {
        if(error) {
            console.log(error)
            throw error
        }
        console.log(results.rows)
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getElephants,
    getSanctuaries,
    getVisits
}


