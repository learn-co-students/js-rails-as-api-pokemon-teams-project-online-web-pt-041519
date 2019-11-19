class PokemonsController < ApplicationController
  
  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.new(nickname: name, species: species, trainer_id: params[:trainer_id])
    if pokemon.save
      render json: pokemon, except: [:updated_at, :created_at]
    else
      render json: { message: 'Pokemon was too weak to join your squad.'}
    end
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    if pokemon
      pokemon.destroy
    else
      render json: { message: "This pokemon deserves to be treated better."}
    end
  end

end
