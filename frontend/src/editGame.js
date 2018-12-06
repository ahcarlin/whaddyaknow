
const renderEditGame = function() {
  titleBox.innerHTML = `<h2><i class='icon star is-medium'></i>Edit ${selectedGame.title}</h2>`

  const editForm = document.createElement('form')
    editForm.innerHTML = `
        <div class='container is-rounded'>
            <input id='title' type='text' value="${selectedGame.title}" class='input'>
        </div>
    `

    editForm.append(
      renderButton("Update", () => {
        selectedGame.title = document.querySelector("input").value 
        updateGame(selectedGame)
        renderSelectedGame()
      })
    )

    app.append(editForm)
    return ''
}
