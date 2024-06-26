# frozen_string_literal: true

module Mutations
  class RegisterUser < BaseMutation
    argument :email, String, required: true
    argument :password, String, required: true
    argument :password_confirmation, String, required: true

    field :user, Types::UserType, null: true
    field :errors, [String], null: false

    def resolve(email:, password:, password_confirmation:)
      user = User.new(email: email, password: password, password_confirmation: password_confirmation)
      if user.save
        user.send_confirmation_instructions
        { user: user, errors: [] }
      else
        { user: nil, errors: user.errors.full_messages }
      end
    end
  end
end
