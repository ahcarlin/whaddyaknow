// shows the game and you can play it yay

let questionsIndex = 0
let answers = []
let score = 0

const renderGamePlay = () => {
  app.innerHTML = `score: ${score}`
  titleBox.innerHTML = `<h2><i class='icon star is-medium'></i> ${selectedGame.title} (playing)</h2>`

  // create element to display the question and append to #app
  q1 = document.createElement('p')
  q1.innerHTML = `
    <section class='container with-title is-rounded'>
      <p class='title'>Question #${questionsIndex+1} of ${selectedGame.questions.length}</p>
      ${selectedGame.questions[questionsIndex].question}
    </section>
  `
  app.append(q1)

  // answerBox is a section to hold all answers
  // answers is a new array with correct and incorrect answers, then shuffle (see utils.js)
  // forEach to display each answer, they are selectable

  answerBox = document.createElement('section')
  answerBox.className = 'container is-rounded'

  answers = selectedGame.questions[questionsIndex].incorrect_answers.slice()
  answers.push(selectedGame.questions[questionsIndex].correct_answer)
  shuffle(answers)
  answers.forEach( answer => {
    a = document.createElement('div')
    a.innerHTML = `
    <label>
        <input type='radio' class='radio' name='answer'>
        <span>${answer}</span>
    </label>
    `
    answerBox.append(a)
    app.append(answerBox)
  })
  answerBox.firstElementChild.firstElementChild.firstElementChild.checked = true
  answerBox


  app.append(
    renderButton('try it', function() {
      checkAnswer()
      renderNextQuestion()
    }))

  return '' // return score later
}

const checkAnswer = () => {
  document.querySelectorAll('input').forEach( e => {
    if (e.checked) {
      if (e.nextElementSibling.innerText === selectedGame.questions[questionsIndex].correct_answer) {
        score++
      }
    }
  })
}

const renderNextQuestion = () => {
  if (questionsIndex < selectedGame.questions.length-1) {
    questionsIndex++
    renderGamePlay()
  }
  else {
    selectedGame.attempts++
    updateGame(selectedGame)
    renderGameEnd()
  }
}

const renderGameEnd = () => {
  app.innerHTML = `
  Final Score: ${score}<br><br>
  Attempts: ${selectedGame.attempts}<br>
  `
  if (score > selectedGame.high_score) {
    updateHighScore()
  }
  app.append(
    renderButton('play again', () => {
      questionsIndex = 0
      score = 0
      answers = []
      renderGamePlay()
    }),
    renderButton('back to all games', getGames)
  )
}

function updateGame(selectedGame){
    server.patch(`/games/${selectedGame.id}`, selectedGame)
}

const updateHighScore = () => {
  console.log('hi THIS IS RUNNING UPDATE HIGH SCORE OK')
  highScoreForm = document.createElement('form')
  highScoreForm.className = 'container with-title'
  highScoreTitle = document.createElement('h3') 
  highScoreTitle.innerHTML = "New High Score! Please enter initials"
  highScoreTitle.className = "title"
  highScoreForm.append(highScoreTitle)

  //highScoreForm = document.createElement('section')

  nameField = document.createElement('input')
  nameField.placeholder = 'your initials'
  highScoreForm.append(
    nameField,
    renderButton('save', () => {
      selectedGame.high_score = score;
      selectedGame.high_score_holder = nameField.value
      updateGame(selectedGame)
    })
  )
  app.append(highScoreForm)

}
