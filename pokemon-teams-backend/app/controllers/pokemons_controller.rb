class PokemonsController < ApplicationController
end
class PokemonsController < ApplicationController
   # Add Pokemon to trainer if trainer team < 6
 def create    
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name

    pokemon = Pokemon.new(nickname: name, species: species, trainer_id: params[:trainer_id])

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
end
