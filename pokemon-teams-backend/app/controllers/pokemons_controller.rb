class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons).to_serialized_json
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: PokemonSerializer.new(pokemon).to_serialized_json
    end

    def create
        randomPokemon = Pokemon.create_random(pokemon_params)
        render json: PokemonSerializer.new(randomPokemon).serialized_for_create_or_destroy
    end

    def destroy
        releasing = Pokemon.find_by(id: params["id"])
        # releasing.destroy
        render json: PokemonSerializer.new(releasing).serialized_for_create_or_destroy

        releasing.destroy
        # binding.pry
    end

    private

    def pokemon_params
        params.require(:trainer_id);
    end

end
