const TelegramBot = require('node-telegram-bot-api');
const currencyToken = 'http://api.exchangeratesapi.io/v1/latest?access_key=42cfd38bf3dd29770b5181273c51c7ea';
const token = '6254110501:AAE2EGVegURMlyxMYFUyRfcEP51z8--vxMk'; 
const movieApiKey = '7e25daf30c527cea2d28621d4afa6cf3';
const bot = new TelegramBot(token, { polling: true });
const request = require('request');

  // Start the bot
  bot.onText(/\/startbot/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Bot is now active.');
  });

  bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Welcome", {
      "reply_markup": {
        "keyboard": [["Sample text", "Second sample"], ["Keyboard"], ["I'm robot"]]
      }
    });

  });

  //  First message and Commands
  bot.onText(/\/hello/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Hello! How can I assist you?');
  });

  bot.onText(/\/sendpic/, (msg) => {

    bot.sendPhoto(msg.chat.id, "welcome.jpg", { caption: "Here we go ! \n Welcome to my botai" });

  });

 
  // User
  bot.onText(/\/info/, (msg) => {
    const chatId = msg.chat.id;
    console.log(msg.from);
    console.log(msg);
    const firstName = msg.from.first_name;
    const lastName = msg.from.last_name;
    const username = msg.from.username;
    const userId = msg.from.id;
    const infoText = `User Info:\n\nFirst Name: ${firstName}\nLast Name: ${lastName}\nUser ID: ${userId}`;
    bot.sendMessage(chatId, infoText);
  });

  // Inline keyboards  and Keyboards
  bot.onText(/\/inline/, (msg) => {
    const chatId = msg.chat.id;
    const inlineKeyboard = {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Option 1', callback_data: 'option1' }],
          [{ text: 'Option 2', callback_data: 'option2' }]
        ]
      }
    };
    console.log(inlineKeyboard);
    bot.sendMessage(chatId, 'Please select an option:', inlineKeyboard);
  });

  // Callback query handling
  bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const queryData = query.data;
    bot.sendMessage(chatId, `Selected option: ${queryData}`);
  });

  // parse_mode
  bot.onText(/\/format/, (msg) => {
    const chatId = msg.chat.id;
    const text = '*Bold Text* _Italic Text_ [Link](https://www.example.com)';
    const options = {
      parse_mode: 'MarkdownV2'
    };
    bot.sendMessage(chatId, text, options);
  });

  // Location and Number
  bot.onText(/\/location/, (msg) => {
    const chatId = msg.chat.id;
    const locationOptions = {
      reply_markup: {
        keyboard: [
          [{ text: 'Share Location', request_location: true }],
          [{ text: 'Share Contact', request_contact: true }],
          [{ text: 'Cancel' }]
        ],
        one_time_keyboard: true
      }
    };
    bot.sendMessage(chatId, 'Please share your location or contact:', locationOptions);
  });

  // Interacting with groups and channels
  bot.onText(/\/broadcast/, (msg) => {
    const chatId = msg.chat.id;
    console.log(msg);
    if (chatId < 0) {
      const broadcastMessage = 'This is a broadcast message sent to all members of the group or channel.';
      bot.sendMessage(chatId, broadcastMessage);
    } else {
      bot.sendMessage(chatId, 'This command can only be used in a group or channel.');
    }
  });
  bot.onText(/\/movie (.+)/,function(msg,match){
    // var chatId = msg.chat.id;
    const chatId = msg.chat.id;
    const movieName = match[1];
  
    // Send a request to the movie API
    request(`https://api.themoviedb.org/3/search/movie?api_key=${movieApiKey}&query=${movieName}`, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const movieData = JSON.parse(body);
        const movie = movieData.results[0];
        if (movie) {
          const movieDetails = `Title: ${movie.title}\nRelease Date: ${movie.release_date}\nOverview: ${movie.overview}`;
          bot.sendMessage(chatId, movieDetails);
        } else {
          bot.sendMessage(chatId, 'No movie found!');
        }
      } else {
        console.log(error);
        bot.sendMessage(chatId, 'An error occurred while searching for the movie.');
      }
    });
});

  //Currency exchange margins
  bot.on("message", (msg) => {
    request(currencyToken, function (error, response, body) {
      if(JSON.parse(response.body).rates[msg.text]){
      bot.sendMessage(msg.chat.id,`one EUR(€) = ${JSON.parse(response.body).rates[msg.text]}${msg.text}` );
      }
    });
  });

//   const TelegramBot = require('node-telegram-bot-api');
//   // const token ='6136606944:AAFkk2_sBfUuvTssrCAlQEiwLoBU2Cy1JnY' fbcd88c0 ;
// const movieApiKey = '7e25daf30c527cea2d28621d4afa6cf3';
//   const token = '6254110501:AAE2EGVegURMlyxMYFUyRfcEP51z8--vxMk'; 
//   const bot = new TelegramBot(token, { polling: true });
//   var request = require('request');
  // bot.onText(/\/movie (.+)/,function(msg,match){
  //       // var chatId = msg.chat.id;
  //       const chatId = msg.chat.id;
  //       const movieName = match[1];
      
  //       // Send a request to the movie API
  //       request(`https://api.themoviedb.org/3/search/movie?api_key=${movieApiKey}&query=${movieName}`, (error, response, body) => {
  //         if (!error && response.statusCode === 200) {
  //           const movieData = JSON.parse(body);
  //           const movie = movieData.results[0];
  //           if (movie) {
  //             const movieDetails = `Title: ${movie.title}\nRelease Date: ${movie.release_date}\nOverview: ${movie.overview}`;
  //             bot.sendMessage(chatId, movieDetails);
  //           } else {
  //             bot.sendMessage(chatId, 'No movie found!');
  //           }
  //         } else {
  //           console.log(error);
  //           bot.sendMessage(chatId, 'An error occurred while searching for the movie.');
  //         }
  //       });
  // });

// const TelegramBot = require('node-telegram-bot-api');
// const axios = require('axios');

// const botToken = '6254110501:AAE2EGVegURMlyxMYFUyRfcEP51z8--vxMk';
// const movieApiKey = '7e25daf30c527cea2d28621d4afa6cf3';
// const currencyApiKey = 'http://api.exchangeratesapi.io/v1/latest?access_key=42cfd38bf3dd29770b5181273c51c7ea';

// // Create a new bot instance
// const bot = new TelegramBot(botToken, { polling: true });

// // Handle /start command
// bot.onText(/\/start/, (msg) => {
//   const chatId = msg.chat.id;
//   const welcomeMessage = 'Welcome to the MovieBot! Type /movie <movie name> to search for a movie.\nType /currency <amount> <from currency> <to currency> to convert currencies.';
//   bot.sendMessage(chatId, welcomeMessage);
// });

// // Handle /movie command
// bot.onText(/\/movie (.+)/, (msg, match) => {
//   const chatId = msg.chat.id;
//   const movieName = match[1];

//   // Send a request to the movie API
//   axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${movieApiKey}&query=${movieName}`)
//     .then(response => {
//       const movie = response.data.results[0];
//       console.log(movie);
//       console.log(response.data);
//       if (movie) {
//         const movieDetails = `Title: ${movie.title}\nRelease Date: ${movie.release_date}\nOverview: ${movie.overview}`;
//         bot.sendMessage(chatId, movieDetails);
//       } else {
//         bot.sendMessage(chatId, 'No movie found!');
//       }
//     })
//     .catch(error => {
//       console.log(error);
//       bot.sendMessage(chatId, 'An error occurred while searching for the movie.');
//     });
// });

// // Handle /currency command
// bot.onText(/\/currency (\d+) (\w+) (\w+)/, (msg, match) => {
//   const chatId = msg.chat.id;
//   const amount = match[1];
//   const fromCurrency = match[2].toUpperCase();
//   const toCurrency = match[3].toUpperCase();

//   // Send a request to the currency converter API
//   axios.get(`https://v6.exchangerate-api.com/v6/${currencyApiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`)
//     .then(response => {
//       const convertedAmount = response.data.conversion_result;
//       bot.sendMessage(chatId, `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
//     })
//     .catch(error => {
//       console.log(error);
//       bot.sendMessage(chatId, 'An error occurred while converting the currency.');
//     });
// });
