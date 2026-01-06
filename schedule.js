const cron = require('node-cron');
const main = require('./mail') // Adjust the path as needed

// Set the timezone to IST
process.env.TZ = 'Asia/Kolkata';

// Schedule the task
cron.schedule('0 6 * * 1', async () => {
  try {
    await main();
    console.log('Function executed successfully');
  } catch (err) {
    console.error('Error executing function:', err);
  }
}, {
  scheduled: true,
  timezone: 'Asia/Kolkata',
});
