const validateRegistration = (body) => {
  let errors = {};

  if (
    body.firstName?.trim().length < 2 ||
    !/^[A-Za-z]+$/.test(body.firstName?.trim())
  ) {
    errors.firstNameMsg = "First name is required";
  }
  if (
    body.lastName?.trim().length < 2 ||
    !/^[A-Za-z]+$/.test(body.lastName?.trim())
  ) {
    errors.lastNameMsg = "Last name is required";
  }
  if (
    body.address?.trim().length < 3 ||
    !/^[\d{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*\.]+$/.test(body.address?.trim())
  ) {
    errors.addressMsg = "Address must be 2 characters or more";
  }
  if (body.city?.trim().length < 2 || !/^[A-Za-z]+$/.test(body.city?.trim())) {
    errors.cityMsg = "City is required";
  }

  if (
    body.state?.trim().length < 2 ||
    !/(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$/.test(
      body.state?.trim()
    )
  ) {
    errors.stateMsg = "State must be 2 characters or more";
  }

  if (
    body.zipCode?.trim().length < 2 ||
    !/^\d{5}$/.test(body.zipCode?.trim())
  ) {
    errors.zipCodeMsg = "Zip code format is 12345";
  }

  if (
    body.email?.trim() == "" ||
    !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(body.email?.trim())
  ) {
    errors.email = "Invalid Email address";
  }

  if (
    body.password?.trim().length == 0 ||
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(body.password?.trim())
  ) {
    errors.passwordMsg = "Invalid Password format";
  }

  if (
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(body.confirmPassword?.trim())
  ) {
    errors.cPasswordMsg = "Invalid Password format";
  }

  if (body.confirmPassword?.trim().length != body.password?.trim().length) {
    errors.cPasswordMsg = "Passwords do not match";
  }

  return errors;
};

const validateLogin = (body) => {
  let errors = {};

  if (
    body.email?.trim() == "" ||
    !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(body.email?.trim())
  ) {
    errors.email = "Invalid Email address";
  }

  if (
    body.password?.trim().length == 0 ||
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(body.password?.trim())
  ) {
    errors.passwordMsg = "Invalid Password format";
  }

  return errors;
};

module.exports = { validateRegistration, validateLogin };
