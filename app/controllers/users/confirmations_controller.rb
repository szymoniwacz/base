class Users::ConfirmationsController < Devise::ConfirmationsController
  # GET /resource/confirmation?confirmation_token=abcdef
  def show
    self.resource = resource_class.confirm_by_token(params[:confirmation_token])
    yield resource if block_given?

    if resource.errors.empty?
      set_flash_message!(:notice, :confirmed)
      redirect_to new_user_session_path, notice: 'Your email address has been successfully confirmed. Please log in.'
    else
      respond_with_navigational(resource.errors, status: :unprocessable_entity) { render :new }
    end
  end

  protected

  # The path used after confirmation.
  def after_confirmation_path_for(resource_name, resource)
    root_url
  end
end
