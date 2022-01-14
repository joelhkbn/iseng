const express = require('express')

const app = express()
const PORT = 5000

let isLogin = true

app.set('view engine', 'hbs') // set template engine

app.use('/public', express.static(__dirname + '/public')) // set folder to public
app.use(express.urlencoded({ extended: false }))

// app.get('/', function(req,res){
//     res.send('Hello World') // Only send 'Hello World' text
// })

app.get('/', function (req, res) {
  res.render('index') // Only send 'Hello World' text
})

app.get('/contact-me', function (req, res) {
  res.render('contact')
})

app.get('/blog', function (req, res) {
  res.render('blog', { isLogin: isLogin }) // render file blog
})

app.get('/detail-blog/:id', function (req, res) {
  let id = req.params.id

  res.render('blog-detail', { id: id })
})

app.get('/add-blog', function (req, res) {
  res.render('add-blog') // render file add-blog
})

app.post('/blog', function (req, res) {
  console.log(req.body)
})

// To bind and listen the connections on the specified host and port
app.listen(PORT, function () {
  console.log(`Server starting on PORT: ${PORT}`)
})
