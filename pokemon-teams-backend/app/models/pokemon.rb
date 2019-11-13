class Pokemon < ApplicationRecord
  belongs_to :trainer

  def self.create_random(trainer_id)
    trainer = Trainer.find_by(id: trainer_id);
    if trainer.pokemons.length < 6 
      newPoke = trainer.pokemons.build(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name)
      newPoke.save
      newPoke
    end
  end
end
