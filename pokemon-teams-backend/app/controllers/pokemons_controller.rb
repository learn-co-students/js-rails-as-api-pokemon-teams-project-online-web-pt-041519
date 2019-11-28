class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
    end

    def add_or_remove_trainer
        trainer = Trainer.find_by(id: params[:trainer_id])
        pokemon = Pokemon.find_by(id: params[:pokemon_id])
        if params[:act] == 'remove'
            if pokemon && trainer && pokemon.trainer == trainer
                pokemon.trainer = nil
                pokemon.save
                render json: pokemon
            else
                render_error('The trainer/pokemon pair was invalid')
            end
        elsif params[:act] == 'add'
            if trainer && pokemon && pokemon.trainer.nil? && trainer.pokemons.length < 6
                trainer.pokemons << pokemon
                render json: pokemon
            else
                render_error('Your trainer cannot take on that pokemon')
            end
        else
            render_error("act: #{params[:act]}")
        end


    end


    def rand
        pokemon = Pokemon.unowned.sample
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


    private

    def render_error(msg = "There was a problem processing your request")
        render json: { message: msg}, status: 400
    end


end


