class TrainerSerializer
  # include FastJsonapi::ObjectSerializer
  # attributes :name
  # has_many :pokemons

  def initialize(trainer_obj)
    @trainer = trainer_obj
  end

  def to_serialized_json
    @trainer.to_json( include: {
      pokemons: { except: [:created_at, :updated_at] }
    }, except: [:created_at, :updated_at])
  end

end
