const titleBox = document.getElementById('title-box')
const app = document.getElementById('app')
const server = ajax('http://localhost:3000/api/v1')

let games = []
let selectedGame = {questionArray: []}

let selectedView = 'game-form' // changed for testing

server.get('/games')
.then(result => {update(() => { games = result })})

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
    }
    
}

const renderGameForm = () => {
    titleBox.innerHTML = 'Create A Game'
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
        // <button class='btn' type='button'>Submit</button>
    submit = document.createElement('button')
    submit.setAttribute('class','btn')
    submit.setAttribute('type', 'button')
    submit.innerHTML = 'Submit'
    gameForm.append(submit)
    submit.addEventListener('click', () => {
        selectedGame.title = document.getElementById('title').value    
        selectedGame.numQuests = document.getElementById('numOfQuestions').value    
        selectedGame.category = document.getElementById('categoryQuestions').value
        renderQuestionForm(1,selectedGame.numQuests)
    })
    return gameForm
}

// const getQuestions = (gameParams) => {
//     let questionArray = []
//     // don't know how to get this to work
//     questionArray.push(renderQuestionForm(1, gameParams.numQuests))

//     return questionArray
// }

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
        selectedGame.questionArray.push(question)
        if (index<numQuests){
            renderQuestionForm(index+1, numQuests)
        }
        else {
            console.log('end of question form, yay!', selectedGame)
        }
    })

}

// TODO this probably moves to games.js
// function renderQuestion(question) {
    
// }

// TODO we need a header title thing here that says ALL GAMES
const renderGamesList = function() {
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
        renderButton('+', function(){
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
// two buttons for 'start game', 'edit game', 'delete game'
// start game render will be in game.js, also at end of game we have to show their score and some other things maybe
// edit game will go to game-form
// delete game goes to delete

const renderSelectedGame = function(){
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
        renderLabel('Questions'),
        renderList(
            ...selectedGame.questions.map(function(question){
                return renderListItem(question.content)
            })
        )
        //,
        // renderButton('Edit', function(){
        //     update(function(){
        //         selectedView = 'game-form'
        //     })
        // }),
        // renderButton('Delete', function(){
        //     update(function(){
        //         let targetIndex = games.indexOf(selectedGame)
        //         games.splice(targetIndex, 1)
        //         selectedView = 'games'
        //         // Persisting our edits
        //         server.delete(`/games/${selectedGame.id}`)
        //     })
        // })
    )
    return selectedGameDiv
}


const update = function(updater) {
    updater()
    render()
}

// render()