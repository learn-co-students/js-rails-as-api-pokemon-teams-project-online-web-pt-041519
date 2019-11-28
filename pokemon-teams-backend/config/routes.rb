Rails.application.routes.draw do
  
  patch 'trainers/:trainer_id/pokemon/:pokemon_id' => 'pokemons#add_or_remove_trainer'
  get 'pokemon/rand' => 'pokemons#rand', as: 'rand_pokemon'
  resources :pokemons, path: 'pokemon'
  resources :trainers

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
