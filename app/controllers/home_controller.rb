class HomeController < ApplicationController
  def index
    @projects = Project.all

    if params[:section]
      render turbo_stream: turbo_stream.replace('main-content', partial: "home/#{params[:section]}")
    end
  end

  def contact
    @name = params[:name]
    @message = params[:message]

    # Example: Send an email or save the contact request to the database
    # ContactMailer.with(name: @name, email: params[:email], message: @message).deliver_now

    flash[:notice] = "Thank you for your message! will contact you back soon"

    respond_to do |format|
      format.html { redirect_to root_path, notice: "Thank you for your message! will contact you back soon" }
      format.turbo_stream { render turbo_stream: turbo_stream.replace('flash', partial: 'layouts/flash') }
    end
  end
end 
