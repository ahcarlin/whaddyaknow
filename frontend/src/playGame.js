// shows the game and you can play it yay


const renderGamePlay = () => {
  app.innerHTML = ''
  titleBox.innerHTML = `<h2><i class='icon star is-medium'></i> ${selectedGame.title} (playing part)</h2>`
  let questionsIndex = 0
  //selectedGame.questions.forEach
  app.innerHTML = `
  <section class='container with-title is-rounded'>
      <h5 class='title'>Question 1</h5>
      <p>${selectedGame.questions[questionsIndex].content}</p>
  </section>
  <section class='container with-title is-rounded'>
      <!-- <p>${selectedGame.questions[questionsIndex].correct}</p> -->

      <label>
          <input type='radio' class='radio' name='answer' checked>
          <span>${selectedGame.questions[questionsIndex].correct}</span>
      </label>
      <label>
          <input type='radio' class='radio' name='answer'>
          <span>${selectedGame.questions[questionsIndex].incorrect[0]}</span>
      </label>

      <!-- <p>${selectedGame.questions[questionsIndex].incorrect[0]}</p> -->
  </section>
  `
  //this is a hack, please resolve in the future
  return ''
  // TODO start game render will be in game.js, also at end of game we have to show their score and some other things maybe
  //renderButton()
}
