# Whaddya Know?
## A customizable trivia game, powered by [Open Trivia DB.](https://opentdb.com/)

### Challenge your friends! Frustrate your enemies!
 
Build a trivia contest that asks whatever questions you want! Or, if you can't think of anything, leverage the power of the Open Trivia database to add up to 50 questions of varying difficulty, from books to video games, sports to manga. Challenge your friends to beat your high score!

---

### Installation

1. Clone the repo into your directory of choice. 

2. In your terminal, navigate to `<DIRECTORY_OF_CHOICE>/whaddyaknow/backend`, then run `rails s` to start the server.

   You may need to open and run a Postgres database as well.
   
3. In your browser of choice, go to the URL <file:///Users/DIRECTORY_OF_CHOICE/whaddyaknow/frontend/index.html>

---

### How we'd make this better

1. Serve this online. We, the project developers ([Hannah](https://github.com/ch0mper), [Alex])https://github.com/AHCarl), and [Eddie](https://github.com/no-relation) tried to get this project hosted on Heroku, but were thwarted at every turn. We had a hard deadline on this and couldn't spend the whole week wrestling with free web service providers.

2. Serving the questions on the backend. As it is, questions and answers are visible in the console (really though, you're just cheating yourself); if we wanted to be taken seriously, we'd have it so the correct answer wasn't queried from the backend until the user commits to an answer to the question. 

3. More robust editing of games. Currently you can edit the name of the game; if we had more time, we'd add the ability to edit individual questions and answers.

4. Top three high score leaderboard on games.

<!-- # whaddyaknow

#MVP
* visitor can create games consisting of up to 30 questions
  * visitor can create own questions
  * additional questions can be pulled from [https://opentdb.com/api_config.php]
    * visitor can configure parameters (category, true/false or multiple choice, etc.)
  * individual games keep record of number of attempts, high score, and average score
  * visitor can edit or remove questions on any game
    * editing a game resets attempts, high score, and average score (obvs.)

* backend on Rails
  * Model: Game has title, high score, average score, number of attempts, has_many Questions
  * Model: Question has content, correct answer, incorrect answer(s), belongs_to Game
  
* frontend
  * a form for a new game will have a title, number of questions, and the visitor will be able to add as many question/answer fields they want up to the question limit they select.
     * if the number of questions they add is less than the number of questions they want to have, the Opentdb API is queried
      * visitor will be able to limit the questions by category (checkboxes), difficulty (also checkboxes) or type (true/false or multiple choice) (also checkboxes)

# sooo extra
 * CSS styling (NES CSS?)
 * sound effects
 * weighted scoring (more points for more difficult questions)
 * user can request multiple question categories from API-->
