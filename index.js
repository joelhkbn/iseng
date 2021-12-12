function submitForm() {
  let name = document.getElementById('input-name').value
  let email = document.getElementById('input-email').value
  let phone = document.getElementById('input-phone').value
  let subject = document.getElementById('input-subject').value
  let message = document.getElementById('input-message').value

  if (
    name == '' ||
    email == '' ||
    phone == '' ||
    subject == '' ||
    message == ''
  ) {
    alert('mohon diisi lengkap datanya ya mblo...')
  }

  let emailReceiver = 'joelhukubun@gmail.com'
  let a = document.createElement('a')
  a.href = `mailto:${emailReceiver}?subject=${subject}&body=Hallo, nama saya ${name}, ${message}`
  a.click()
}
