class Image < ApplicationRecord
  validates :description, :name, presence: true
end
