class Pokemon < ApplicationRecord
  belongs_to :trainer, optional: true

  scope :unowned, ->(){ where(trainer_id: nil) }
end
