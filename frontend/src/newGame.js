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
        selectedGame.high_score_holder = 'NIL'
        selectedGame.high_score = 0
        selectedGame.attempts = 0
        selectedGame.questions = []
        renderQuestionForm(1,selectedGame.numQuests)
    })
    exit = renderButton('Exit', renderGamesList)

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
    // submit = document.createElement('button')
    // submit.innerHTML = 'Submit'
    
    let question = {}
    if (index<=numQuests){
        submit = renderButton('Submit',()=>{
            question.content = document.getElementById('content').value
            question.correct_answer = document.getElementById('correct').value
            incorrectNodes = document.querySelectorAll('.incorrect')
            question.incorrect_answers = []
            incorrectNodes.forEach((node)=>question.incorrect_answers.push(node.value))
            selectedGame.questions.push(question)
            renderQuestionForm(index+1, numQuests)
        })
    }else{
        saveGame(selectedGame)
    }

    doneButton = renderButton('Done',(e)=>{
        finishQuestionList(numQuests-index)        
    })
    questionForm.append(submit, doneButton)
    app.append(questionForm)
}

function finishQuestionList(num){
    app.innerHTML = '<p>Querying the Open Trivia Database</p>'
    apiQueryForm = document.createElement('form')
    apiQueryForm.innerHTML = `
        <div class='container is-rounded with-title'>
            <label class='title'>What difficulty of questions?</label>
            <select id='difficulty'>
                <option value='' selected>Any</option>
                <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='hard'>Hard</option>
            </select>
        </div>
        <div class='container is-rounded with-title'>
            <label class='title'>What kind of questions?</label>
            <select id='type'>
                <option value=''>Any</option>
                <option value='multiple'>Multiple Choice</option>
                <option value='boolean'>True/False</option>
            </select>
        </div>
    `
    categorySelectorsDiv = document.createElement('div')
    categorySelectorsDiv.setAttribute('class','container is-rounded with-title')
    categorySelectorsDiv.inneHTML = "<label class='title'>What category?</label>"

    categorySelectors = document.createElement('select')
    categorySelectors.setAttribute('id','category')
    categoryOptions = categoryArray.map((category)=>{
        return `<option value='${category}'>${category}</option>`
    })
    categorySelectors.innerHTML = categoryOptions.join('')
    categorySelectorsDiv.append(categorySelectors)
    apiQueryForm.append(categorySelectorsDiv)
    addQuestionsButton = document.createElement('button')
    addQuestionsButton.setAttribute('id','addQuestionsButton')
    addQuestionsButton.setAttribute('class','btn')
    addQuestionsButton.innerHTML = 'Get Questions';

    addQuestionsButton.addEventListener('click',(e)=>{
        e.preventDefault()
        let queryParams = {}
        queryParams.amount = num
        queryParams.difficulty = document.getElementById('difficulty').value
        queryParams.type = document.getElementById('type').value
        queryParams.category = document.getElementById('category').value;
        
        getQuestions(queryParams)
            .then( questions => {
                questions.forEach((question) => selectedGame.questions.push(question))
                saveGame(selectedGame)
            })
    })    
    apiQueryForm.append(addQuestionsButton)
    app.append(apiQueryForm)
}

function saveGame(selectedGame){
    console.log('saving game')
    selectedGame.questions_attributes = selectedGame.questions
    server.post('/games', selectedGame)
    .then(function(){
        update(function () {
            selectedView = 'game'
        })
    })
}

