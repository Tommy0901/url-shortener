const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;

const urls = require("./public/jsons/urls.json");
const shortenURL = require("./utils/shortenURL");

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  const inputURL = req.query.input;
  if (inputURL) {
    const outputURL = shortenURL(inputURL);
    return res.render("outcome", { inputURL, outputURL });
  }
  res.render("index");
});

// Redirection of shortened urls
app.get("/:garbledText", (req, res) => {
  const garbledText = req.params.garbledText;
  const url = urls.find((item) => item.garbledText === garbledText);

  // 如果找不到對應資料則導回首頁
  url ? res.redirect(url.inputURL) : res.redirect("/");
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
