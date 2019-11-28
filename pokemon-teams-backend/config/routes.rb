Rails.application.routes.draw do
  resources :pokemons
  resources :trainers
  # get trainers
  get '/trainers' => 'trainers#index'
  # post and delete pokemons
  resources :pokemons, only: [:create, :destroy]
end
