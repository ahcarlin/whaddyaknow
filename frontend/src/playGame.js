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
      ${selectedGame.questions[questionsIndex].question}
    </section>
  `
  app.append(q1)

  // answerBox is a section to hold all answers
  // answers is a new array with correct and incorrect answers, then shuffle (see utils.js)
  // forEach to display each answer, they are selectable

  // try to make first answer selected but not important
  // answerBox.firstChild.firstElementChild.innerHTML = "<input type='radio' class='radio' name='answer' checked>"
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
      console.log(questionsIndex)
      checkAnswer()
      renderNextQuestion()
    }))

  return '' // return score later
}

const checkAnswer = () => {
  document.querySelectorAll('input').forEach( e => {
    if (e.checked) {
      if (e.nextElementSibling.innerText === selectedGame.questions[questionsIndex].correct_answer) {
        console.log('yay')
        score++
      }
    }
    // alert('pls choose answer') this won't be necessary if first answer is selected by default
  })
}

const renderNextQuestion = () => {
  if (questionsIndex < selectedGame.questions.length-1) {
    questionsIndex++
    renderGamePlay()
  }
  else {
    renderGameEnd()
  }
}

const renderGameEnd = () => {
  app.innerHTML = `
  final score: ${score}<br><br>
  [if high score, submit your name yay]<br>
  `
  app.append(
    renderButton('play again', () => {
      questionsIndex = 0
      score = 0
      answers = []
      renderGamePlay()
    }),
    renderButton('back to all games', () => {
      selectedView = 'games'
      render()
    })
  )
  if (score > selectedGame.high_score) {
    selectedGame.high_score = score;
    // save to database
    // render high_score_form to accept initials
  }
  else {
    console.log('joe disapproval face')
  }
  // selectedGame.attempts++ save to database
  // selectedGame.high_score save to database
}
