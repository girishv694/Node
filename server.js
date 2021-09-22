const express = require('express')
const app = express();
app.use(express.json())

const books = require('./Books_data.json')

app.get('/', (req,res) => {
    res.send(books);
    
});

app.get('/books/:id',(req,res)=>{

    const {id} = req.params;

  const foundbook =   books.find((book)=> book.id==id);
  
    res.send(foundbook);         // params holds id

    
});

app.patch('/data/:id',(req,res)=>{
    const {id} = req.params;
    const {author,book_name,pages,published_year} = req.body;

    const updateBook =   books.find((book)=> book.id==id);

    if(author){
        updateBook.author = author;
    }

    if(pages){
        updateBook.pages = pages;
    }



    
    console.log(id);
    res.send(updateBook);
});

app.post('/books', (req,res) => {
    console.log(req.body)
    const user = {
        id : req.body.id,
        author : req.body.author,
        book_name : req.body.book_name,
        pages: req.body.pages,
        published_year:req.body.published_year
    }
    books.push(user)
    res.json(user)

});


app.delete("/books/delete/:id",(req,res)=>{
    let id = req.params.id;

    let index = books.findIndex((book)=>{
        return (book.id == Number.parseInt(id))
    })

    if(index>=0){
        let std = books[index]
        books.splice( index,1)
        res.json(std);
    }
    else{
        res.status(404);
    }
})


app.listen(3001,() => {
    console.log("on port 3001");
})