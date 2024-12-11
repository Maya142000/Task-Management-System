module.exports = {
    PasswordValidator: (Password) => {
      if (Password.length < 5) {
        throw new Error('Password should be at least 5 characters long.');

      } else if (!/[a-z]/.test(Password)) {
        throw new Error('Password should contain at least one lowercase character.');

      } else if (!/[A-Z]/.test(Password)) {
        throw new Error('Password should contain at least one uppercase character.');

      } else if (!/\d/.test(Password)) {
        throw new Error('Password should contain at least one digit.');
        
      } else if (!/[!@#$%^&*]/.test(Password)) {
        throw new Error('Password should contain at least one special character.');
      }

    },
  };