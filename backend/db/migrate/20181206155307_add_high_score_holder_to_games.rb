class AddHighScoreHolderToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :high_score_holder, :string, :limit => 3
  end
end
