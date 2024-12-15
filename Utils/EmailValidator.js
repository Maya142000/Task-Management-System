module.exports = {
  emailValidator: (Email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailPattern.test(Email)) {
      throw new Error("Invalid email address format..!");
    }
  },
};
