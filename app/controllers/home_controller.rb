class HomeController < ApplicationController
  def index
    # @projects = Project.all

    # if params[:section]
    #   render turbo_stream: turbo_stream.replace('main-content', partial: "home/#{params[:section]}")
    # end
  end

  def about
    # render partial: 'home/about', layout: false
    # render turbo_stream: turbo_stream.replace('main-content', partial: "home/about"), layout: false
  end

  def projects
    # render partial: 'home/project', layout: false
    # render turbo_stream: turbo_stream.replace('main-content', partial: "home/project"), layout: false
  end

  def contact
    # render partial: 'home/contact', layout: false
    # render turbo_stream: turbo_stream.replace('main-content', partial: "home/contact"), layout: false
  end

  def send_message

    name = params[:name]
    email = params[:email]
    message = params[:message]

    Contact.create(name: name, email: email, message: message)
    # Example: Send an email or save the contact request to the database
    # ContactMailer.with(name: @name, email: params[:email], message: @message).deliver_now
    
    # You can implement email sending functionality or whatever you need to do here.
    flash[:notice] = "Thank you for your message, we will get back to you soon!"
    
    redirect_to contact_path
  end
end 
