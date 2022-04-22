const express = require('express')
const Author = require('../models/author')
const router = express.Router()

//all author route
router.get('/',async (req,res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find (searchOptions)
        res.render('authors/index', {
            authors: authors, 
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
    
})

//new author
router.get('/new', (req, res)=> {
    res.render('authors/new', { author: new Author()})
})

router.post('/',async (req, res)=> {
    const author = new Author({
        name: req.body.name
    })
    try {
    const newAuthor = await author.save()
    res.redirect('authors')   
    } catch {
        res.render('authors/now', {
            author:author,
            errorMessage: 'error creating author'
        })
    }
/*    author.save((err, newAuthor) => {
        if (err) {
            res.render('authors/new', {
                author: author, 
                errorMessage : 'error creating Author'
            })
        } else {
           // res.redirect(`authors/${newAuthor.id}`)
            res.redirect(`authors`)
        }
    })
*/
})

module.exports = router