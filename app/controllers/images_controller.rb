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

  def create
    Rails.logger.info("Image params: #{params.inspect} ")
    logger.debug "Creating an image with params #{params.inspect}"
    logger.debug "Request raw_post an image with params #{request.raw_post}"
    @image = Image.new(image_params)
    if @image.save
      render json: @image, status: :created, location: @image
    else
      render json: @image.errors, status: :unprocessable_entity
    end
    puts params
  end

  def destroy
    @image = Image.find(params[:id])
    @image.destroy

    render json: { message: "Image deleted successfully" }
    logger.debug "Deleting image with params #{params.inspect}"
  end

  def update
    @image = Image.find(params[:id])
    if @image.update(image_params)
      render json: @image
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  private

  def image_params
    params.expect(image: [ :name, :description ])
  end
end
