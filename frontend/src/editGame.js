
const renderEditGame = function() {
  titleBox.innerHTML = "<h2><i class='icon star is-medium'></i>Create A Game</h2>"

  const editForm = document.createElement('form')
    editForm.innerHTML = `
        <div class='container is-rounded'>
            <input id='title' type='text' placeholder="Title" class='input'>
        </div>
        <div class='container with-title'>
            <label class='title'>How many questions?</label>
            <input id='numOfQuestions' type='number' class='input' placeholder="number of questions">
        </div>
    `
}
renderEditGame()