# app/admin/contacts.rb
ActiveAdmin.register Contact do
  permit_params :name, :email, :message

  index do
    selectable_column
    id_column
    column :name
    column :email
    column :message
    column :created_at
    actions
  end

  form do |f|
    f.inputs 'Contact Details' do
      f.input :name
      f.input :email
      f.input :message
    end
    f.actions
  end

  show do
    attributes_table do
      row :name
      row :email
      row :message
      row :created_at
    end
  end
end
