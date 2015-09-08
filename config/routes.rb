Rails.application.routes.draw do


  scope :api , defaults: {format: :json} do
    resources :activities
  end

  devise_for :users

  get '/app' => 'application#app'
  root 'application#default'
end
