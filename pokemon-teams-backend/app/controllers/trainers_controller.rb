class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        opts = {
            only: [:name, :id],
            include: {
                pokemons: { except: [:created_at, :updated_at]}
            }
        }
        render json: trainers.to_json(opts)
    end
end
