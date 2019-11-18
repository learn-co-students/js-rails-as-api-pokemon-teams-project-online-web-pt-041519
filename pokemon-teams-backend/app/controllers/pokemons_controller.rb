class PokemonsController < ApplicationController

    def create
        @pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
    end

    def destroy
        @pokemon = Pokemon.find_by(id: params[:id])
        @pokemon.destroy 
    end
end
