MongoClient.connect(uri, (err, db) => {
  const data = db.db('kdt1').collection('review');

  data.find({}).toArray((err, result) => {
    const ARTICLE = result;
    const articlelen = ARTICLE.length;
    res.render('review', { ARTICLE, articleCounts: articlelen });
  });
});
