const express = require('express')

const db = require('./connection/db')

const app = express()
const PORT = 5000

let isLogin = true

let month = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]

app.set('view engine', 'hbs') // set template engine

app.use('/public', express.static(__dirname + '/public')) // untuk mengimport data-data yang diperlukan hbs

app.use(express.urlencoded({ extended: false })) // sebagai middleware

app.get('/', function (req, res) {
  db.connect(function (err, client, done) {
    if (err) throw err
    query = 'SELECT * FROM tb_card'

    client.query(query, function (err, result) {
      done()
      let data = result.rows

      res.render('index', { cards: data }) // render file index
    })
  }) // memanggil file hbs untuk di render
})

app.get('/blog', function (req, res) {
  db.connect(function (err, client, done) {
    if (err) throw err
    query = 'SELECT * FROM tb_blog'

    client.query(query, function (err, result) {
      done()
      let data = result.rows

      data = data.map(function (item) {
        return {
          ...item,
          isLogin: isLogin,
        }
      })

      res.render('blog', { isLogin: isLogin, blogs: data }) // render file blog
    })
  })
}) // untuk mengambil data dalam blogs dan keterangan login

app.get('/detail-blog/:id', function (req, res) {
  let id = req.params.id

  db.connect(function (err, client, done) {
    if (err) throw err

    client.query(
      `SELECT * FROM tb_blog WHERE id = ${id}`,
      function (err, result) {
        if (err) throw err
        let data = result.rows[0]
        res.render('blog-detail', { id: id, blog: data })
      }
    )
  })
})

app.get('/add-blog', function (req, res) {
  res.render('add-blog') // render file add-blog
})
app.get('/edit-blog/:id', function (req, res) {
  let id = req.params.id

  let query = `SELECT * FROM tb_blog WHERE id = ${id}`

  db.connect(function (err, client, done) {
    if (err) throw err

    client.query(query, function (err, result) {
      if (err) throw err
      let data = result.rows[0]
      res.render('edit-blog', { blog: data, id })
    })
  }) // render file edit-blog
})

app.post('/blog', function (req, res) {
  let data = req.body

  let query = `INSERT INTO tb_blog(title,content, image) VALUES ('${data.title}','${data.content}','image.png')`

  db.connect(function (err, client, done) {
    if (err) throw err

    client.query(query, function (err, result) {
      if (err) throw err
      res.redirect('/blog')
    })
  })
})

app.post('/update-blog/:id', function (req, res) {
  let id = req.params.id
  let data = req.body
  let query = `UPDATE tb_blog SET title='${data.title}', content='${data.content}' WHERE id=${id};`

  db.connect(function (err, client, done) {
    if (err) throw err

    client.query(query, function (err) {
      if (err) throw err
      res.redirect('/blog')
    })
  })
})

app.get('/delete-blog/:id', function (req, res) {
  let id = req.params.id
  let query = `DELETE FROM tb_blog WHERE id = ${id}`

  db.connect(function (err, client, done) {
    if (err) throw err

    client.query(query, function (err, result) {
      if (err) throw err
      res.redirect('/blog')
    })
  })
})

app.get('/contact-me', function (req, res) {
  res.render('contact') // memanggil file hbs untuk di render
})

// To bind and listen the connections on the specified host and port
app.listen(PORT, function () {
  console.log(`Server starting on PORT: ${PORT}`)
})

// function custom
function getFullTime(time) {
  let date = time.getDate()
  let monthIndex = time.getMonth()
  let year = time.getFullYear()

  let hours = time.getHours()
  let minutes = time.getMinutes()

  // isi dari tampilan waktu
  let fullTime = `${date} ${month[monthIndex]} ${year} ${hours}:${minutes} WITA`

  return fullTime
}

// function getTimeAgo(time) {
//   let timePost = time // kapan postingan di post
//   let timeNow = new Date() // waktu realtime untuk fitur "time ago"

//   let distance = timeNow - timePost

//   // convert to day => miliseconds in 1 day
//   let miliseconds = 1e3 // berapa milisekon dlm 1 detik
//   let secondsinHours = 3600 // how many second in 1 hours
//   let hoursInDay = 23 // how many hours in 1 day

//   let distanceDay = Math.floor(
//     distance / (miliseconds * secondsinHours * hoursInDay)
//   )

//   if (distanceDay >= 1) {
//     return `${distanceDay} days ago`
//   } else {
//     // convert ke jam
//     let distanceHours = Math.floor(distance / (miliseconds * 60 * 60))

//     if (distanceHours >= 1) {
//       return `${distanceHours} hours ago`
//     } else {
//       // convert ke menit
//       let distanceMinutes = Math.floor(distance / (miliseconds * 60))
//       if (distanceMinutes >= 1) {
//         return `${distanceMinutes} minutes ago`
//       } else {
//         // convert ke detik
//         let distanceSeconds = Math.floor(distance / miliseconds)
//         return `${distanceSeconds} seconds ago`
//       }
//     }
//   }
// }
// getTimeAgo()
