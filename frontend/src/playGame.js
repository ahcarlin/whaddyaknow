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
      ${selectedGame.questions[questionsIndex].content}
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
  answers = selectedGame.questions[questionsIndex].incorrect.slice()
  answers.push(selectedGame.questions[questionsIndex].correct)
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
      if (e.nextElementSibling.innerText === selectedGame.questions[questionsIndex].correct) {
        console.log('yay')
        score++
      }
    }
    // alert('no')
  })
}

const renderNextQuestion = () => {
  if (questionsIndex < selectedGame.questions.length) {
    questionsIndex++
    renderGamePlay()
  }
  // TODO
  else { console.log('show a game complete page with final score and button to play again or go back to all games if high score, show highScoreForm to enter initials and save to database')
  }
}



// -------------------------- a bunch of useless stuff below here --------------------

// app.innerHTML = `
// <section class='container with-title is-rounded'>
//     <h5 class='title'>Question 1</h5>
//     <p>${selectedGame.questions[questionsIndex].content}</p>
// </section>
// <section class='container with-title is-rounded'>
    // <label>
    //     <input type='radio' class='radio' name='answer' checked>
    //     <span>${selectedGame.questions[questionsIndex].correct}</span>
    // </label>
//     <label>
//         <input type='radio' class='radio' name='answer'>
//         <span>${selectedGame.questions[questionsIndex].incorrect[0]}</span>
//     </label>
//     <label>
//         <input type='radio' class='radio' name='answer'>
//         <span>${selectedGame.questions[questionsIndex].incorrect[1]}</span>
//     </label>
//     <label>
//         <input type='radio' class='radio' name='answer'>
//         <span>${selectedGame.questions[questionsIndex].incorrect[2]}</span>
//     </label>
//
// </section>
// `
