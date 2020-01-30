class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
    end

    def create
        @pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: params[:trainer_id])
        render json: PokemonSerializer.new(@pokemon)
        
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.delete
        render json: PokemonSerializer.new(pokemon)
    end

end
