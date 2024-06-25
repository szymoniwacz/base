module Mutations
  class ResetPassword < BaseMutation
    argument :token, String, required: true
    argument :password, String, required: true
    argument :password_confirmation, String, required: true

    field :message, String, null: true
    field :errors, [String], null: false

    def resolve(token:, password:, password_confirmation:)
      user = User.with_reset_password_token(token)
      if user && user.reset_password(password, password_confirmation)
        { message: "Password has been reset successfully.", errors: [] }
      else
        { message: nil, errors: user.errors.full_messages }
      end
    end
  end
end
