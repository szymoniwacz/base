module Mutations
  class RequestPasswordReset < BaseMutation
    argument :email, String, required: true

    field :message, String, null: true
    field :errors, [String], null: false

    def resolve(email:)
      user = User.find_by(email: email)
      if user
        user.send_reset_password_instructions
        { message: "Instructions to reset your password have been sent to #{email}.", errors: [] }
      else
        { message: nil, errors: ["Email not found"] }
      end
    end
  end
end
