Rails.application.routes.draw do
  # resources :pokemons
  # resources :trainers

  # Limit resources for api
  get '/trainers' => 'trainers#index'
  resources :pokemons, only: [:create, :destroy]

end
