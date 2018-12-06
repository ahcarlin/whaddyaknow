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
  titleBox.innerHTML = "<h2><i class='icon star is-medium'></i></h2>"
    let selectedGameDiv = h('div')
    selectedGameDiv.append(
        renderHeader(selectedGame.title),
        renderParagraph(`High Score: ${selectedGame.high_score}`),
        renderParagraph(`Average Score: ${selectedGame.average_score}`),
        renderParagraph(`Attempts: ${selectedGame.attempts}`),
        renderParagraph(`Number of Questions: ${selectedGame.questions.length}`),
        h('br'),
        renderButton('PLAY', function(){
          update(function(){
            selectedView = 'play-game'
          })
        }),
        renderButton('Delete Game',()=> {
            server.delete(`/games/${selectedGame.id}`)
            .then( getGames )
        }),
        renderButton('Back to Games', ()=>{
            selectedView = 'games'
            render()
        })
    )
    return selectedGameDiv
}


const update = function(updater) {
    updater()
    render()
}
getGames()