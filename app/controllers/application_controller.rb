class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :render_404

  def render_404
    logger.debug "from render 404"
    render json: { message: "Record not found" }, status: :unprocessable_entity
  end
end
