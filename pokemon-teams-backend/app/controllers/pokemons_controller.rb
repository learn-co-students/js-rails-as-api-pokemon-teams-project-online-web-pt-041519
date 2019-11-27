class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
    end

    def remove_trainer
        trainer = Trainer.find_by(id: params[:trainer_id])
        pokemon = Pokemon.find_by(id: params[:pokemon_id])
        if pokemon && trainer && pokemon.trainer == trainer
            pokemon.trainer = nil
            pokemon.save
            render json: pokemon
        else
            render json: { message: "There was a problem processing your request"}, status: 400
        end
    end

    def rand
        pokemon = Pokemon.all.sample
        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        if pokemon
            pokemon.destroy
            render json: PokemonSerializer.new(pokemon)
        else
            render json: { message: 'Pokemon Not Found'}
        end
    end
end
