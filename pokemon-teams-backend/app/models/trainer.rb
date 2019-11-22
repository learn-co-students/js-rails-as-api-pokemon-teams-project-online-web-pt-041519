class Trainer < ApplicationRecord
  has_many :pokemons

  # Validation currently not working
  # validates :pokemons, on: :update, length: { maximum: 6, message: "You can only have up to 6 Pokemon." }
end
