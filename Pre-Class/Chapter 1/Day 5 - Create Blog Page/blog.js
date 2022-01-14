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
              12 Jul 2021 22:30 WIB | Ichsan Emrald Alamsyah
            </div>
            <p>${blogs[i].content}
            </p>
          </div>
        </div>`
  }
}
