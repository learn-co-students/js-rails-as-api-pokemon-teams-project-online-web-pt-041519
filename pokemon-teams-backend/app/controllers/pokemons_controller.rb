class PokemonsController < ApplicationController
    def create
        trainer = Trainer.find_by(params[:trainer_id])
        new_pokemon = trainer.pokemons.build(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name)

        if trainer.pokemons.length < 6 && new_pokemon.save
            render json: new_pokemon
        else
            render json: {message: "Your team is full! Release some pokemon before adding more."}
        end
    end

    def destroy
        pokemon =  Pokemon.find_by(params[:id])
        if pokemon
            render json: {message: "Pokemon released!"}, status 200
        else
            render json: {message: "There was a problem, please retry"}, status 400
        end
    end




end
