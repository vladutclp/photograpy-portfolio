class CreatePhotos < ActiveRecord::Migration[8.1]
  def change
    create_table :photos do |t|
      t.string :git
      t.string :commit

      t.timestamps
    end
  end
end
