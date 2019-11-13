class PokemonsController < ApplicationController

  # Add Pokemon to trainer if trainer team < 6
  def create    

    # byebug


    # # Set params
    # params[:pokemon][:nickname] = Faker::Name.first_name if !params[:nickname]

    # params[:pokemon][:species] = Faker::Games::Pokemon.name if !params[:species]

    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.new(nickname: name, species: species, trainer_id: params[:trainer_id])

    # pokemon = Pokemon.new(params)

    if pokemon.save
      # Send return json
      render json: pokemon
    else
      # Send error json
      render json: { message: 'Bird not found' }
    end
  end

  # Delete pokemon
  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    render json: pokemon
    pokemon.destroy
  end

  # private
 
  # def poke_params
  #   params.require(:pokemon).permit(:nickname, :species, :trainer_id)
  # end

end


