class Api::V1::GamesController < ApplicationController
  before_action :define_current_game

  def create
    game = Game.create(game_params)
    render json: game
  end

  def index
    render json: Game.all
  end

  def show
    render json: current_game, include: [ :questions ]
  end

  def update
    current_game.update(game_params)
    render json: current_game
  end

  def destroy
    current_game.destroy
    render json: Game.all
  end

  def game_params
    params.permit(:title, :high_score, :high_score_holder, :average_score, :attempts, questions_attributes: [ [ :id, :question, :correct_answer, :incorrect_answers => [] ] ])
  end

  def define_current_game
    if(params[:id])
      @current_game = Game.find(params[:id])
    end
  end

  def current_game
    @current_game
  end
end
