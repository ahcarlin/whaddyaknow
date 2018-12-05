const titleBox = document.getElementById('title-box')
const app = document.getElementById('app')
const server = ajax('http://localhost:3000/api/v1')

let games = []
let selectedGame = {questions: []}

let selectedView = 'games' // changed for testing

server.get('/games')
.then(result => {
    update(() => {
        games = result
        selectedView = 'games'
        })
    })

function render() {
    app.innerHTML = ''
    switch(selectedView){
        case 'games':
        app.append( renderGamesList() )
        break;
        case 'game':
        app.append( renderSelectedGame() )
        break;
        case 'game-form':
        app.append( renderGameForm() )
        break;
        case 'play-game':
        app.append( renderGamePlay() )
        break;
    }

}

const renderGameForm = () => {
    titleBox.innerHTML = "<h2><i class='icon star is-medium'></i>Create A Game</h2>"
    const gameForm = document.createElement('form')
    gameForm.innerHTML = `
        <div class='container is-rounded'>
            <input id='title' type='text' placeholder="Title" class='input'value=''>
        </div>
        <div class='container is-rounded with-title'>
            <label class='title'>How many questions?</label>
            <input id='numOfQuestions' type='number' class='input' placeholder="15" value='15'>
        </div>
        <div class='container is-rounded with-title'>
            <label class='title'>What category?</label>
            <input id='categoryQuestions' type='text' class='input' placeholder='General' value="General">
        </div>
        `
    submit = renderButton('Submit', ()=>{
        selectedGame.title = document.getElementById('title').value
        selectedGame.numQuests = document.getElementById('numOfQuestions').value
        selectedGame.category = document.getElementById('categoryQuestions').value
        renderQuestionForm(1,selectedGame.numQuests)
    })
    submit.setAttribute('class','btn')
    exit = renderButton('Exit', renderGamesList)
    exit.setAttribute('class', 'btn')

    gameForm.append(submit, exit)
    return gameForm
}

const renderQuestionForm = (index, numQuests) => {
    app.innerHTML = ''
    const questionForm = document.createElement('form')
    questionForm.innerHTML = `
        <div class='container is-rounded with-title'>
            <label class='title'>Question ${index}</label>
            <input id='content' type='text' class='input'>
        </div>
        <div class='container is-rounded with-title'>
            <label class='title'>Correct answer</label>
            <input id='correct' type='text' class='input'>
        </div>
        <div class='container is-rounded with-title'>
            <label class='title'>Incorrect Answers</label>
            <input class='incorrect input' type='text'>
            <input class='incorrect input' type='text'>
            <input class='incorrect input' type='text'>
        </div>
        `
    submit = document.createElement('button')
    submit.setAttribute('class', 'btn')
    submit.setAttribute('type', 'button')
    submit.innerHTML = 'Submit'
    questionForm.append(submit)
    app.append(questionForm)

    let question = {}
    submit.addEventListener('click',()=>{
        question.content = document.getElementById('content').value
        question.correct = document.getElementById('correct').value
        incorrectNodes = document.querySelectorAll('.incorrect')
        question.incorrect = []
        incorrectNodes.forEach((node)=>question.incorrect.push(node.value))
        selectedGame.questions.push(question)
        if (index<numQuests){
            renderQuestionForm(index+1, numQuests)
        }
        else {
            console.log('end of question form, yay!', selectedGame)
            server.post('/games', selectedGame)
            .then(function(){
                update(function () {
                    selectedView = 'game'
                })
            })
        }
    })
}

// TODO this probably moves to games.js
// function renderQuestion(question) {

// }

const renderGamesList = function() {
  titleBox.innerHTML = "<h2><i class='icon star is-medium'></i> All Games</h2>"
    return renderList(
        ...games.map( function(currentGame){
            return renderListItem(currentGame.title, function(){
                server.get(`/games/${currentGame.id}`)
                    .then(function(currentGame){
                        update(function(){
                            selectedGame = currentGame
                            selectedView = 'game'
                        })
                    })
           })
        }),
        renderButton('+ Add A Game', function(){
            update(function(){
                selectedGame = {
                    title: ''
                    // description: '',
                    // image: '',
                    // questions: []
                }
                selectedView = 'game-form'
            })
        })
    )
}


// TODO renderSelectedGame will be the game show page with title, number of questions, high score, average score, and attempts
// start game render will be in game.js, also at end of game we have to show their score and some other things maybe
// edit game will go to game-form
// delete game goes to delete

const renderSelectedGame = function(){
  titleBox.innerHTML = "<h2><i class='icon star is-medium'></i></h2>"
    let selectedGameDiv = h('div')
    selectedGameDiv.append(
        renderLink('Back to Games', function(){
            update(function(){
                selectedView = 'games'
            })
        }),
        renderHeader(selectedGame.title),
        renderParagraph(`High Score: ${selectedGame.high_score}`),
        h('br'),
        renderButton('PLAY', function(){
          update(function(){
            selectedView = 'play-game'
          })
        }),
        renderButton('Edit', function(){
          update(function(){
            selectedView = 'game-form'
          })
        }),
        renderButton('Delete', function(){
          update(function(){
            let targetIndex = games.indexOf(selectedGame)
            games.splice(targetIndex, 1)
            selectedView = 'games'
            // Persisting our edits
            server.delete(`/games/${selectedGame.id}`)
          })
        })
    )
    return selectedGameDiv
}

const renderGamePlay = () => {
  titleBox.innerHTML = `<h2><i class='icon star is-medium'></i> ${selectedGame.title} (playing part)</h2>`
  app.innerHTML = `
  <section class='container with-title is-rounded'>
      <h5 class='title'>Question 1</h5>
      <p>IN HERE WE WILL ITERATE OR SOMETHING???</p>
  </section>
  `
  // TODO this chunk renders questions, and should show up one at a time after game is started
  // ,
  // renderLabel('Questions'),
  // renderList(
    //     ...selectedGame.questions.map(function(question){
      //         return renderListItem(question.content)
      //     })
      // )

      //,

}

const update = function(updater) {
    updater()
    render()
}

// render()
