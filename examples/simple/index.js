require('dotenv').config()
const candymail = require('../../lib')
const automations = require('../candymail.automation.json')

candymail.init(automations.automations, {
  mail: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: true,
    },
  },
  hosting: { url: process.env.HOSTING_URL },
})

candymail.start()

// candymail.unsubscribeUser('user@hotmail.com') // Immediatedly unsubscribe user and they will not receive any more messages

// candymail.sendEmail({
//   template: 'string',
//   sendFrom: 'sunnyashiin@gmail.com',
//   sendTo: 'sunnyashiin@gmail.com',
//   subject: 'string',
//   body: 'string',
// })

const someConditionSatisfiedByUser = () => {
  const user = process.env.RECIPIENT_EMAIL
  candymail.runAutomation('automation1', user)
  console.log({ get: candymail.getAllScheduledMessages() })
}

someConditionSatisfiedByUser()
