class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  belongs_to :role
  before_create :set_default_role

  def as_json(options={})
    {
      :id => self.id,
      :email => self.email,
      :username => self.username,
      :nickname => self.nickname,
      :role => self.role.name,
      :last_sign_in_at => self.last_sign_in_at.to_i
    }
  end

  private
  def set_default_role
    self.role ||= Role.find_by_name('registered')
  end
end
