const Movie = require("../../Models/Movie");

const listBooks = (req, res) => {

    Movie.find(null, null, (err, projects) => {
        if (err) {
            res.send(err);
        }

        res.json(projects);
    })


};


const addBook = async (req, res) => {


    let movieSearch = await Movie.findOne({
        title: req.body.title,
        year: req.body.year,
        stars: req.body.stars,
        format: req.body.format
    });

    let starsArr = req.body.stars.split(/, /);
    let starsIdentity = true;

    for (let i = 0; i < starsArr.length - 1; i++) {
        for (j = i + 1; j < starsArr.length; j++)
            if (starsArr[i] === starsArr[j]) {
                starsIdentity = false;
            }
    }

    if(!starsIdentity) {
        return res.status(404).json({msg: "Movie actors are not identity"});
    }
    if (movieSearch) {
        return res.status(404).json({msg: "Movie already exist"});
    }

    const movie = Object.assign(new Movie(), req.body);

    movie.save(err => {
        if (err) {
            res.send(err);
        }
        return res.status(200).json({msg: "Movie added successfully"});
    });


};


const deleteBook = (req, res) => {

    Movie.deleteOne(
        {_id: req.params.id},
        err => {
            if (err) {
                res.send(err);
            }
            res.json({message: 'successfully deleted'});
        }
    )

};


const addSampleBooks = (req, res) => {


    Promise.all(req.body.map((book) => {
        return Movie.findOneAndUpdate({'title': book['title']}, book, {upsert: true}, (err, doc) => {
            console.log(err, doc);
        })
    }))
        .then(() => {
            res.json({message: 'movie added'})
        });

};

module.exports = {
    listBooks, addSampleBooks, addBook, deleteBook
};
