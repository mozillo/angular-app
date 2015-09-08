class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.string :title
      t.string :address
      t.datetime :begin_at
      t.datetime :end_at
      t.integer :max_amount
      t.text :more_detail
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
