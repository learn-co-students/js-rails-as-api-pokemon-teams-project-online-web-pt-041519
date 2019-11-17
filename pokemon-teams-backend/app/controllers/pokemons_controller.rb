class PokemonsController < ApplicationController
    def create
        trainer = Trainer.find_by(params [:trainer_id])
        new_poke = trainer.pokemons.build(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name)

        if trainer.pokemons.length < 6 && new_poke.save
            render json: new_poke
        else
            render json: {message: "Team's full! Please release a Pokemon before adding a new one."}, status: 400 
        end
    end

    def destroy
        pokemon = Pokemon.find_by(params[:id])
        if pokemon
            render json: {message: "Pokemon released."}, status 200
        else
            render json: {message: "Release was not successful, please try again"}, status 400
        end
    end

end
