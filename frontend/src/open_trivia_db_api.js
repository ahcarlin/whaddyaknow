const categoryArray = ['General Knowledge',
    'Entertainment: Books',
    'Entertainment: Film',
    'Entertainment: Music',
    'Entertainment: Musicals & Theatres',
    'Entertainment: Television',
    'Entertainment: Video Games',
    'Entertainment: Board Games',
    'Science & Nature',
    'Science: Computers',
    'Science: Mathematics',
    'Mythology',
    'Sports',
    'Geography',
    'History',
    'Politics',
    'Art',
    'Celebrities',
    'Animals',
    'Vehicles',
    'Entertainment: Comics',
    'Science: Gadgets',
    'Entertainment: Japanese Anime & Manga',
    'Entertainment: Cartoon & Animations']

function getQuestions(queryParams) {
    searchParams = `?amount=${queryParams.amount}`

    if (queryParams.difficulty) {
        searchParams += `&difficulty=${queryParams.difficulty}`
    }

    if (queryParams.type) {
        searchParams += `&type=${queryParams.type}`
    }

    if (queryParams.category) {
        searchParams += `&category=${categoryArray.indexOf(queryParams.category) + 9}`
    }

    return fetch(`https://opentdb.com/api.php${searchParams}`)
        .then((resp) => resp.json())
        .then((data) => {
            return (data.results)
        })
    // return results
}
