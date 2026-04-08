class Image < ApplicationRecord
  validates :description, :name, presence: true
  has_one_attached :image
end
