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
        selectedGame.high_score = 0
        selectedGame.questions = []
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
            
            server.post('/games', selectedGame)
            .then(function(){
                update(function () {
                    selectedView = 'game'
                })
            })
        }
    })
}