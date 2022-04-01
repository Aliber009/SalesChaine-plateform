

//Smpt

module.exports = {
  smtpConf: {
    host: 'smtp.googlemail.com', // Gmail Host
    port: 465, // Port
    secure: true, // this is true as port is 465
    auth: {
      user:  // Gmail username
      pass:  // Gmail password
    },
  },
  webURL: 'https://localhost:5100/',
};
