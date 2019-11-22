class PokemonsController < ApplicationController

  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.new(nickname: name, species: species, trainer_id: params[:trainer_id])
    if pokemon.save
      render json: pokemon
    else
      render json: {mssg: "Pokemon not found"}
    end
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    render json: pokemon
    pokemon.destroy
  end
  
end
