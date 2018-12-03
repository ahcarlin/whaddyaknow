class Question < ApplicationRecord
  extend ApiCommunicator
  belongs_to :game
end
