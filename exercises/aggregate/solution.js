var mongo = require('mongodb').MongoClient

var size = process.argv[2]

var url = 'mongodb://localhost:27017/learnyoumongo'
mongo.connect(url, function (err, db) {
  if (err) throw err
  var collection = db.collection('prices')
  collection.aggregate([
    { $match: { size: size } },
    { $group: {
      _id: 'average',
      average: {
        $avg: '$price'
      }
    }}
  ]).toArray(function (err, results) {
    if (err) throw err
    if (!results.length) {
      throw new Error('No results found')
    }
    console.log(Number(results[0].average).toFixed(2))
    db.close()
  })
})
