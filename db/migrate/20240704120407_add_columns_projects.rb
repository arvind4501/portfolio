class AddColumnsProjects < ActiveRecord::Migration[7.1]
  def change
    add_column :projects, :title, :string, null: false
    add_column :projects, :description, :text, null: false
    add_column :projects, :technologies, :string, null: false
    add_column :projects, :url, :string
    add_column :projects, :completion_date, :date
    add_column :projects, :role, :string
    add_column :projects, :status, :integer
  end
end
