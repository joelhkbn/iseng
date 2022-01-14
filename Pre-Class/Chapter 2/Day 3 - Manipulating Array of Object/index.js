const express = require('express')

const app = express()
const PORT = 5000

let isLogin = true

let blogs = [
  {
    title: 'Pasar Coding di Indonesia Dinilai Masih Menjanjikan',
    image: '/public/assets/blog-img-detail.png',
    post_at: '12 Jul 2021 22:30 WIB',
    author: 'Ichsan Emrald Alamsyah',
    content:
      'Ketimpangan sumber daya manusia (SDM) di sektor digital masih menjadi isu yang belum terpecahkan. Berdasarkan penelitian ',
  },
]

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

app.use('/public/', express.static(__dirname + '/public/'))
app.use(express.static(dir)) // set folder to public
app.use(express.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.render('index') // Only send 'Hello World' text
})

app.get('/contact-me', function (req, res) {
  res.render('contact')
})

app.get('/blog', function (req, res) {
  let dataBlogs = blogs.map(function (data) {
    return {
      ...data,
      isLogin: isLogin,
    }
  })
  res.render('blog', { isLogin: isLogin, blogs: dataBlogs }) // render file blog
})

app.get('/detail-blog/:id', function (req, res) {
  let id = req.params.id

  res.render('blog-detail', { id: id, blogs: blogs })
})

app.get('/add-blog', function (req, res) {
  res.render('add-blog') // render file add-blog
})

app.post('/blog', function (req, res) {
  let data = req.body

  data = {
    title: data.title,
    content: data.content,
    image: data.image,
    author: 'Joel Hukubun',
    post_at: getFullTime(new Date()),
    time_ago: getTimeAgo(),
  }
  console.log(data.time_ago)

  blogs.push(data)

  res.redirect('/blog')
})

app.get('/delete-blog/:id', function (req, res) {
  let index = req.params.id
  blogs.splice(index, 1)
  res.redirect('/blog')
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
