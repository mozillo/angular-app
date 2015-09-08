class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  respond_to :html, :json

  def default
    render layout: "non-application"
  end

  def app
    render layout: "angular"
  end

end
