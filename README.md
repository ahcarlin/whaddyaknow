# whaddyaknow

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
 * user can request multiple question categories from API

