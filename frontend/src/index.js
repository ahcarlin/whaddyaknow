const titleBox = document.getElementById('title-box')
const app = document.getElementById('app')
const server = ajax('http://localhost:3000/api/v1')

let games = []
let selectedGame = {}
let selectedView = 'games'

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

function renderGameForm() {
    titleBox.innerHTML = 'New Game'
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

render()