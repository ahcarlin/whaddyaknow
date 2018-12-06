# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Game.destroy_all
Question.destroy_all

firstGame = Game.create({
  title: "Trivia Thing 1"
})

firstGame.questions_attributes = [{
  question: "How many fish are made of cheese?",
  correct_answer: "Moon",
  incorrect_answers: ["The color blue", "Ford Edsel", "Portugal"]
}]

firstGame.questions_attributes = [{
  question: "Am I full of owls?",
  correct_answer: "London",
  incorrect_answers: ["Harbinger", "Lamarck", "Buddy Beer"]
}]

firstGame.questions_attributes = [{
  question: "Is ANYTHING a table?",
  correct_answer: "John Stamos",
  incorrect_answers: ["Replicants From Blade Runner", "Oort Cloud", "Doctor Who"]
}]

secondGame = Game.create({
  title: "Trivia Thing 2"
})

secondGame.questions_attributes = [{
  question: "How many fish are made of cheese?",
  correct_answer: "Moon",
  incorrect_answers: ["The color blue", "Ford Edsel", "Portugal"]
}]

secondGame.questions_attributes = [{
  question: "Am I full of owls?",
  correct_answer: "London",
  incorrect_answers: ["Harbinger", "Lamarck", "Buddy Beer"]
}]

secondGame.questions_attributes = [{
  question: "Is ANYTHING a table?",
  correct_answer: "John Stamos",
  incorrect_answers: ["Replicants From Blade Runner", "Oort Cloud", "Doctor Who"]
}]

firstGame.save
secondGame.save
