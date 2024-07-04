class Project < ApplicationRecord
  def self.ransackable_attributes(auth_object = nil)
    %w[title description technologies completion_date url role status created_at updated_at]
  end

  def self.ransackable_associations(auth_object = nil)
    []
  end
end
