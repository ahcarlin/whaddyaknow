// shows the game and you can play it yay

let questionsIndex = 0
let answers = []
let score = 0

const renderGamePlay = () => {
  app.innerHTML = `score: ${score}`
  titleBox.innerHTML = `<h2><i class='icon star is-medium'></i> ${selectedGame.title}</h2>`

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
        score = score + 10
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
    selectedGame.average_score = updateAverageScore(selectedGame)
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
    renderButton('<i class="nes-logo"></i> Play Again?', () => {
      questionsIndex = 0
      score = 0
      answers = []
      renderGamePlay()
    }),
    renderButton('<i class="icon star"></i> Back to Games', () => {
      questionsIndex = 0
      score = 0
      answers = []
      getGames()
    })
  )
}
function updateAverageScore(selectedGame){
  currentAverage = selectedGame.average_score
  currentAttempts = selectedGame.attempts
  return (currentAverage*currentAttempts+score)/(currentAttempts+1)
}

function updateGame(selectedGame){
    server.patch(`/games/${selectedGame.id}`, selectedGame)
}

const updateHighScore = () => {
  highScoreForm = document.createElement('form')
  highScoreForm.className = 'container with-title'
  highScoreTitle = document.createElement('h3')
  highScoreTitle.innerHTML = "New High Score! Please enter initials"
  highScoreTitle.className = "title"
  highScoreForm.append(highScoreTitle)
  nameField = document.createElement('input')
  nameField.className = 'input'
  nameField.setAttribute('maxlength', '3')
  nameField.placeholder = 'your initials'
  highScoreForm.append(
    nameField,
    renderButton('save', (e) => {
      e.preventDefault()
      selectedGame.high_score = score;
      selectedGame.high_score_holder = nameField.value
      updateGame(selectedGame)
      renderGameEnd()
    })
  )
  // nameField.addEventListener('keydown', e => {
  //   if(e.target.value.length >= 3) {
  //     e.preventDefault()
  //   }
  // })
  app.append(highScoreForm)

}
