// array di deklarasi di luar function agar bukan cuma 1 data yang terpakai
let blogs = []

function addBlog(event) {
  event.preventDefault()

  let title = document.getElementById('input-blog-title').value
  let content = document.getElementById('input-blog-content').value
  let image = document.getElementById('input-blog-image')

  if (title == '' || content == '' || image == '') {
    // memakai return agar kodingan di bawahnya tidak di execute
    return alert('mohon diisi lengkap datanya ya mblo...')
  }

  image = URL.createObjectURL(image.files[0])

  let blog = {
    title: title,
    content: content,
    image: image,
    author: 'Joel Hukubun',
    postAt: new Date(),
  }

  blogs.push(blog)

  renderBlog()

  // console.log(blogs)
}

function renderBlog() {
  let contentContainer = document.getElementById('contents')

  contentContainer.innerHTML = ''

  for (let i = 0; i < blogs.length; i++) {
    contentContainer.innerHTML += ` <div class="blog-list-item">
          <div class="blog-image">
            <img src="${blogs[i].image}" alt="" />
          </div>
          <div class="blog-content">
            <div class="btn-group">
              <button class="btn-edit">Edit Post</button>
              <button class="btn-post">Post Blog</button>
            </div>
            <h1>
              <a href="blog-detail.html" target="_blank"
                >${blogs[i].title}</a
              >
            </h1>
            <div class="detail-blog-content">
              ${getFullTime(blogs[i].postAt)} | ${blogs[i].author}
            </div>
            <p>${blogs[i].content}
            </p>
            <div style="text-align: right:font-size;20px;color:gray;">
              ${getTimeAgo(blogs[i].postAt)}
            </div>
          </div>
        </div>`
  }
}

let month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'Septmber',
  'October',
  'November',
  'December',
]

function getFullTime(time) {
  let date = time.getDate()
  let monthIndex = time.getMonth()
  let year = time.getFullYear()

  let hours = time.getHours()
  let minutes = time.getMinutes()

  let fullTime = `${date} ${month[monthIndex]} ${year} ${hours}:${minutes} WITA`

  return fullTime
}

function getTimeAgo(time) {
  let timePost = time // Jam post di
  let timeNow = new Date() // Jam sekarang

  let distance = timeNow - timePost

  // convert to day => miliseconds in 1 day
  let miliseconds = 1000 // milisekon dlm 1 detik
  let secondsinHours = 3600 // second in 1 hours
  let hoursInDay = 23 // hours in 1 day

  let distanceDay = Math.floor(
    distance / (miliseconds * secondsinHours * hoursInDay)
  )

  if (distanceDay >= 1) {
    return `${distanceDay} days ago`
  } else {
    // convert ke jam
    let distanceHours = Math.floor(distance / (miliseconds * 60 * 60))

    if (distanceHours >= 1) {
      return `${distanceHours} hours ago`
    } else {
      // convert ke menit
      let distanceMinutes = Math.floor(distance / (miliseconds * 60))
      if (distanceMinutes >= 1) {
        return `${distanceMinutes} minutes ago`
      } else {
        // convert ke detik
        let distanceSeconds = Math.floor(distance / miliseconds)
        return `${distanceSeconds} seconds ago`
      }
    }
  }
}
getTimeAgo()

setInterval(() => {
  renderBlog()
}, 10000)
