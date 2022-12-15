require('dotenv').config({
  path: `./environments/.env.${process.env.NODE_ENV}`,
});

const env = process.env.NODE_ENV;
if (env === 'production') {
  console.log('production');
} else {
  console.log('Getting ready for development...', 'Happy hacking!');
}
