

//Smpt

module.exports = {
  smtpConf: {
    host: 'smtp.googlemail.com', // Gmail Host
    port: 465, // Port
    secure: true, // this is true as port is 465
    auth: {
      user: 'a.beroro@digieye.io', // Gmail username
      pass: 'jesuisber009', // Gmail password
    },
  },
  webURL: 'https://localhost:5100/',
};
