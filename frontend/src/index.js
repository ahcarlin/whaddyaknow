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

        renderButton('Add Game', function(){
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
        // renderLink('Back to Games', function(){
        //     update(function(){
        //         selectedView = 'games'
        //     })
        // }),
        renderHeader(selectedGame.title),
        renderParagraph(`High Score: ${selectedGame.high_score}`),
        h('br'),
        renderButton('PLAY', function(){
          update(function(){
            selectedView = 'play-game'
          })
        }),
//         renderButton('Edit', function(){
//           update(function(){
//             selectedView = 'game-form'
//           })
//         }),

        renderButton('Delete Game',()=> {
            
            games.splice(games.indexOf(selectedGame),1)
            server.delete(`/games/${selectedGame.id}`)
            .then(()=>{
                selectedView = 'games'
                render()
            })
        }),
        renderButton('Back to Games', ()=>{
            selectedView = 'games'
            render()
        })

        // renderLabel('Questions'),
        // renderList(
        //     ...selectedGame.questions.map(function(question){
        //         return renderListItem(question.content)
        //     })
        // )

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
