#Whaddya Know?
##A customizable trivia game, powered by [Open Trivia DB.](https://opentdb.com/)
---
###Installation
##Server
1. Clone the repo into your directory of choice. 

2. In your terminal, navigate to `<DIRECTORY_OF_CHOICE>/whaddyaknow/backend`, then run `rails s` to start the server.

   You may need to open and run a Postgres database as well.
   
##In your browser of choice, go to the URL <<DIRECTORY_OF_CHOICE>/whaddyaknow/frontend/index.html>

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
