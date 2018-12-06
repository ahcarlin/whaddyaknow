const titleBox = document.getElementById('title-box')
const app = document.getElementById('app')
const server = ajax('http://localhost:3000/api/v1')

let games = []
let selectedGame = {questions: []}

let selectedView


const getGames = function() {server.get('/games')
.then(result => {
    update(() => {
        games = result
        selectedView = 'games'
    })
})
}

const getSelectedGame = function(game) {server.get(`/games/${game.id}`)
.then(result => {
    update(() => {
        selectedGame = result
        selectedView = 'game'
    })
})
}



document.querySelector('h1').addEventListener('click', getGames)

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


const renderGamesList = function() {
  titleBox.innerHTML = "<h2><i class='icon star is-medium'></i> All Games</h2>"
  games.sort(function(a, b) {
    return a.id - b.id;
  });

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

        renderButton('Add Game', function(){
            update(function(){
                selectedGame = {
                    title: ''
                }
                selectedView = 'game-form'
            })
        })
    )
}


// edit game will go to game-form

const renderSelectedGame = function(){
  titleBox.innerHTML = ``
    let selectedGameDiv = h('div')
    selectedGameDiv.append(
        renderHeader(selectedGame.title),
        renderParagraph(`High Score: ${selectedGame.high_score}`),
        renderParagraph(`High Score Holder: ${selectedGame.high_score_holder}`),
        renderParagraph(`Average Score: ${selectedGame.average_score}`),
        renderParagraph(`Attempts: ${selectedGame.attempts}`),
        renderParagraph(`Number of Questions: ${selectedGame.questions.length}`),
        h('br'),
        
        )
        playButton = renderButton('<i class="nes-logo"></i> Play', function(){
            update(function(){
            selectedView = 'play-game'
            })
        })
        playButton.setAttribute('class','btn is-success')

        deleteButton = renderButton('<i class="icon close"></i> Delete Game',()=> {
            server.delete(`/games/${selectedGame.id}`)
            .then( getGames )
        })
        deleteButton.setAttribute('class','btn is-error')

        backButton = renderButton('<i class="icon star"></i> Back to Games', getGames)

        selectedGameDiv.append(playButton, deleteButton, backButton)
    return selectedGameDiv
}


const update = function(updater) {
    updater()
    render()
}
getGames()
