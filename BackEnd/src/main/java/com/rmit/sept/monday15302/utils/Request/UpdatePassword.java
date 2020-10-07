package com.rmit.sept.monday15302.utils.Request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class UpdatePassword {
    @NotBlank(message = "Old password is required")
    @Size(min = 6)
    private String oldPassword;

    @NotBlank(message = "New password is required")
    @Size(min = 6)
    private String newPassword;

    @NotBlank(message = "Confirm password is required")
    @Size(min = 6)
    private String confirmPassword;

    public UpdatePassword(String oldPassword, String newPassword, String confirmPassword) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        this.confirmPassword = confirmPassword;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setOldPassword(String s) {
        this.oldPassword = s;
    }

    public void setNewPassword(String s) {
        this.newPassword = s;
    }
}
