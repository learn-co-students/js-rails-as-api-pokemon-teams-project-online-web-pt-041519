class PokemonSerializer
  # include FastJsonapi::ObjectSerializer
  # attributes :nickname, :species
  # belongs_to :trainer

  def initialize(pokemon_obj)
    @pokemon = pokemon_obj
  end

  def to_serialized_json
    @pokemon.to_json( 
      include: {
        trainer: { only: [:id, :name] }
      }, 
      except: [:trainer_id, :created_at, :updated_at]
    )
  end

  def serialized_for_create_or_destroy
    @pokemon.to_json(
      except: [ :created_at,:updated_at ]
    )
  end


end
