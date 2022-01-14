// fungsi untuk mengambil data dari form

function submitForm() {
  let name = document.getElementById('input-name').value
  let email = document.getElementById('input-email').value
  let phone = document.getElementById('input-phone').value
  let subject = document.getElementById('input-subject').value
  let message = document.getElementById('input-message').value

  // menggunakan IF untuk cek form-form yang belum di isi dan OR untuk memperpendek kodingan
  if (
    name == '' ||
    email == '' ||
    phone == '' ||
    subject == '' ||
    message == ''
  ) {
    // memakai return agar kodingan di bawahnya tidak di execute
    return alert('mohon diisi lengkap datanya ya mblo...')
  }

  // membuat tag anchor agar mengeksekusi perintah submit dan data form bakal dikirim ke email
  let emailReceiver = 'joelhukubun@gmail.com'
  let a = document.createElement('a')
  a.href = `mailto:${emailReceiver}?subject=${subject}&body=Hallo. Nama saya ${name}. ${message}`
  a.click()
}
