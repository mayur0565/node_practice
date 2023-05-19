const db = require('mysql')

const database = db.createConnection({
 host : 'localhost',
 user : 'root',
 password : '',
 database : 'learning_managment'
})

database.connect((err)=>{
if(err) throw err
})

module.exports.executeQuery = function (query, params = []) {
	return new Promise((resolve, reject) => {
		database.query(query, params, function (error, results) {
			if (error) reject(error);
			resolve(results);
		})
	})
};



