class Game < ApplicationRecord
  has_many :questions, dependent: :delete_all
  accepts_nested_attributes_for :questions
  before_save :default_values

  def default_values
    self.high_score ||= 0
    self.average_score ||= 0
    self.attempts ||= 0
  end
end
