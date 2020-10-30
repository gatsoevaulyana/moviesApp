const Book = require("../../Models/Book");

const listBooks = (req, res) => {

    Book.find(null, null, (err, projects) => {
        if (err) {
            res.send(err);
        }

        res.json(projects);
    })



};


const addBook = (req, res) => {

    const book = Object.assign(new Book(), req.body);

    book.save(err => {
        if (err) {
            res.send(err);
        }
        res.json({message: 'movie added'});
    });
};



 const deleteBook = (req, res) => {

    Book.deleteOne(
        {_id: req.params.id},
        err => {
            if (err) {
                res.send(err);
            }
            res.json({message: 'successfully deleted'});
        }
    )

} ;


 const addSampleBooks = (req, res) => {


    Promise.all(req.body.map((book) => {
        return Book.findOneAndUpdate({'title': book['title']}, book, {upsert:true}, (err,doc) =>{
            console.log(err,doc);
        })
    }))
        .then(()=>{res.json({ message: 'book added' })});

};

module.exports = {
    listBooks, addSampleBooks, addBook, deleteBook
};
