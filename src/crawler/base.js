var request = require("request");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/MBookReader", {
  useNewUrlParser: true
});
// var htmlparser = require("htmlparser");
// request({
//   uri: "http://sachvui.com",
// }, (error, response, body) => {
//   var handler = new htmlparser.DefaultHandler(function (error, dom) {
//     if (error) {
//       console.log(error);
//     }
//     else {
//       console.log(dom);
//     }
//   });
//   var parser = new htmlparser.Parser(handler);
//   parser.parseComplete(body);
// });

const genJsDom = async (html) => {
  /* parse the html and create a dom window */
  let jsdom = require('jsdom');
  let { JSDOM } = jsdom;
  let dom = await new JSDOM(html, {
    // standard options:  disable loading other assets
    // or executing script tags
    FetchExternalResources: false,
    ProcessExternalResources: false,
    MutationEvents: false,
    QuerySelector: false
  });

  let window = dom.window
  let $ = require('jQuery')(window);

  return $;
}

const retrieveHtml = (url) => {
  // try {
  //   let response = await request(url);
  //   return response.body;
  // } catch (error) {
  //   console.log(error);
  // }

  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error) {
        resolve(body);
      } else {
        reject(error);
      }
    })
  })
}

let sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

module.exports = { genJsDom, retrieveHtml, sleep }