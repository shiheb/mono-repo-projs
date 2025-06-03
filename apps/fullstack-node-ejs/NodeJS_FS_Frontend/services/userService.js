const axios = require('axios');
require('dotenv').config();



const postRegister = async (body) => {
const result = await axios.post(process.env.url + '/register', {
    firstName: body.firstName,
    lastName: body.lastName,
    address: body.address,
    city: body.city,
    state: body.state,
    zipCode: body.zipCode,
    email: body.email,
    password: body.password,
  })

return result;
}

const postLogin = async (body) => {
const result = await axios.post(process.env.url + '/login', {
    email: body.email,
    password: body.password,
  })

return result;
}


module.exports = {postRegister, postLogin}