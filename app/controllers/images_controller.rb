class ImagesController < ApplicationController
  def index
    @images = Image.all
    images_data = @images.map do |image|
      data = image.as_json
      data["image_url"] = url_for(image.image) if image.image.attached?
      data
    end
    render json: images_data
  end

  def show
    imageId = params[:id]
    @image = Image.find(imageId)

    image_data = @image.as_json

    if @image.image.attached?
      image_data["image_url"] = url_for(@image.image)
    end

    render json: image_data
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
    logger.debug "\n\nParams sent from frontend: #{params.inspect}\n\n"
    params.require(:image).permit(:name, :description, :image)
  end
end
