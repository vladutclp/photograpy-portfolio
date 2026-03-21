class ImagesController < ApplicationController
  def index
    @images = Image.all

    render json: @images
  end

  def show
    imageId = params[:id]
    @image = Image.find(imageId)

    render json: @image
  end
end
