Rails.application.routes.draw do

  get 'pokemon/rand' => 'pokemons#rand', as: 'rand_pokemon'
  resources :pokemons, path: 'pokemon'
  resources :trainers

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
