class TrainersController < ApplicationController

  def index
    trainers = Trainer.all
    # render json: trainers, include: [:pokemons]

    render json: TrainerSerializer.new(trainers).to_serialized_json
  end

end
