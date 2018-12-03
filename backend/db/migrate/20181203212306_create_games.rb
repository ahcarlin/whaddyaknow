class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.string :title
      t.integer :high_score
      t.float :average_score
      t.integer :attempts

      t.timestamps
    end
  end
end
