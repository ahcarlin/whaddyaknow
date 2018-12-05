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

    if (queryParams.difficulty){
     searchParams += `&difficulty=${queryParams.difficulty}`
    }

    if (queryParams.type){
        searchParams += `&type=${queryParams.type}`
    }

    if (queryParams.category){
        searchParams += `&category=${categoryArray.index(queryParams.category)+9}`
    }

    return fetch(`https://opentdb.com/api.php${searchParams}`)
    .then((resp) => resp.json())
}

// module ApiCommunicator
//     require 'httparty'
// search_params = ''
// # query_params can include number of questions(amount), array of question categories(category - one at a time), difficulty, type(type = <multiple or boolean.)
// def make_search_params(query_params)
// search_params = "?amount=#{query_params[:amount]}"

// if (query_params[: difficulty])
// search_params += "&difficulty=#{query_params[:difficulty]}"
// end

// if (query_params[: type])
// search_params += "&type=#{query_params[:type]}"
// end

// if (query_params[: category])
// cat_array = ['General Knowledge',
//     'Entertainment: Books',
//     'Entertainment: Film',
//     'Entertainment: Music',
//     'Entertainment: Musicals & Theatres',
//     'Entertainment: Television',
//     'Entertainment: Video Games',
//     'Entertainment: Board Games',
//     'Science & Nature',
//     'Science: Computers',
//     'Science: Mathematics',
//     'Mythology',
//     'Sports',
//     'Geography',
//     'History',
//     'Politics',
//     'Art',
//     'Celebrities',
//     'Animals',
//     'Vehicles',
//     'Entertainment: Comics',
//     'Science: Gadgets',
//     'Entertainment: Japanese Anime & Manga',
//     'Entertainment: Cartoon & Animations']

// search_params += "&category=#{cat_array.index(query_params[:category])+9}"
// end
// search_params
// end

// def get_questions(search_params)
// HTTParty.get("https://opentdb.com/api.php#{make_search_params(search_params)}").parsed_response
// end
// end