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

  // membuat object untuk dimasukkan ke dalam array
  let blog = {
    title: title,
    content: content,
    image: image,
    author: 'Joel Hukubun',
    postAt: new Date(),
  }
  console.log(blog)
  // Menambahkan object sebelumnya ke dalam array blogs dgn perintah push
  blogs.push(blog)

  // function renderBlog() dijalankan
  renderBlog()
}

function renderBlog() {
  // mengambil class contents
  let contentContainer = document.getElementById('contents')

  // membersihkan kodingan html di dalam class content tadi
  // contentContainer.innerHTML = ''

  // di buat perulangan dimulai dari 0 dgn kondisi panjangnya index i sesuai panjangnya index dalam blogs
  for (let i = 0; i < blogs.length; i++) {
    // dengan +=, konten akan ditambahkan
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

function editBlog(event) {
  event.preventDefault()

  let title = document.getElementById('edit-blog-title').value
  let content = document.getElementById('edit-blog-content').value
  let image = document.getElementById('edit-blog-image')

  if (title == '' || content == '' || image == '') {
    // memakai return agar kodingan di bawahnya tidak di execute
    return alert('mohon diisi lengkap datanya ya mblo...')
  }

  image = URL.createObjectURL(image.files[0])

  // membuat object untuk dimasukkan ke dalam array
  let blog = {
    title: title,
    content: content,
    image: image,
    author: 'Joel Hukubun',
    postAt: new Date(),
  }
  renderBlog()
}

// getMonth() mengembalikan bulan (0 hingga 11) dari suatu tanggal sehingga nama-nama bulan harus di isi dengan string
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

// function untuk menunjukkan keterangan waktu postingan
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

function getTimeAgo(time) {
  let timePost = time // kapan postingan di post
  let timeNow = new Date() // waktu realtime untuk fitur "time ago"

  let distance = timeNow - timePost

  // convert to day => miliseconds in 1 day
  let miliseconds = 1e3 // berapa milisekon dlm 1 detik
  let secondsinHours = 3600 // how many second in 1 hours
  let hoursInDay = 23 // how many hours in 1 day

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
}, 15e3)
