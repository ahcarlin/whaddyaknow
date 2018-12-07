document.addEventListener('click', () => {
  josh = document.createElement('img')
  josh.src = 'walkright.gif'
  josh.style.position = 'absolute'
  josh.style.left = '0px'
  josh.style.bottom = '100px'
  josh.style.width = "50px"
  document.body.append(josh)

  setInterval( () => {
    let currentPosition = parseInt(josh.style.left)
    josh.style.left = currentPosition + 6 + 'px'
  }, 20)

  setTimeout( () => {
    josh.remove()
  }, 5000)

})
