class PokemonsController < ApplicationController

    def create
        # Generated using Faker (see seeds.rb)
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.new(nickname: name, species: species, trainer_id: params[:trainer.id])

        # Render json if saved, error if not
        if pokemon.save
            render json: pokemon
        else
            render json: {message: 'Error: Could not save pokemon'}
        end
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon 
        pokemon.destroy
    end

end
