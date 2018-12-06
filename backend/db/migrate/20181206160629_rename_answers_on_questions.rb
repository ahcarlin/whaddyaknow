class RenameAnswersOnQuestions < ActiveRecord::Migration[5.2]
  def change
    rename_column :questions, :correct, :correct_answer
    rename_column :questions, :incorrect, :incorrect_answers
    rename_column :questions, :content, :question
  end
end
