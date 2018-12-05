# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Game.destroy_all
# Question.destroy_all

firstGame = Game.create({
  title: "Trivia Thing"
})

firstGame.questions_attributes = [{
  content: "How many fish are made of cheese?",
  correct: "Moon",
  incorrect: ["The color blue", "Ford Edsel", "Portugal"]
}]

firstGame.questions_attributes = [{
  content: "Am I full of owls?",
  correct: "London",
  incorrect: ["Harbinger", "Lamarck", "Buddy Beer"]
}]

firstGame.questions_attributes = [{
  content: "Is ANYTHING a table?",
  correct: "John Stamos",
  incorrect: ["Replicants From Blade Runner", "Oort Cloud", "Doctor Who"]
}]

secondGame = Game.create({
  title: "Trivia Thing"
})

secondGame.questions_attributes = [{
  content: "How many fish are made of cheese?",
  correct: "Moon",
  incorrect: ["The color blue", "Ford Edsel", "Portugal"]
}]

secondGame.questions_attributes = [{
  content: "Am I full of owls?",
  correct: "London",
  incorrect: ["Harbinger", "Lamarck", "Buddy Beer"]
}]

secondGame.questions_attributes = [{
  content: "Is ANYTHING a table?",
  correct: "John Stamos",
  incorrect: ["Replicants From Blade Runner", "Oort Cloud", "Doctor Who"]
}]

firstGame.save 
secondGame.save


