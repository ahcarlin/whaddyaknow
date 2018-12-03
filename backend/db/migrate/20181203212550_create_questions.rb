class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.string :content
      t.string :correct
      t.string :incorrect, array: true
      t.belongs_to :game, foreign_key: true

      t.timestamps
    end
  end
end
