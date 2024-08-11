const nodemailer = require('nodemailer');

exports.notify = (req, res) => {
  const { toUserId, amount } = req.body;
  
  // Get recipient's email from User Service (simplified for MVP)
  axios.get(`http://localhost:5000/api/users/${toUserId}`)
    .then(response => {
      const email = response.data.email;
      
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'your-email@gmail.com',
          pass: 'your-email-password'
        }
      });

      const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'You received funds!',
        text: `You have received Ksh ${amount} in your wallet. Log in to view your balance.`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ message: 'Error sending email', error });
        } else {
          res.status(200).json({ message: 'Notification sent successfully' });
        }
      });
    })
    .catch(err => res.status(500).json({ message: 'Error fetching user email', err }));
};
