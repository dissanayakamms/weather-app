const express = require("express");
const https = require("https");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("weather");
});

app.post("/", (req, res) => {
  const location = req.body.location;

  https
    .get(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        location +
        "&appid=4552c868dae98cf83338a4f2f49407ad&units=metric",
      (response) => {
        response.on("data", (d) => {
          const wetherData = JSON.parse(d);

          const temperature = wetherData.main.temp;
          const wetherDis = wetherData.weather[0].description;
          const icon = wetherData.weather[0].icon;
          const imageUrl =
            "https://openweathermap.org/img/wn/" + icon + "@2x.png";
          const image = "<img src=" + imageUrl + " >";

          res.render('data', {location, temperature, wetherDis, imageUrl})

        });
      }
    )
    .on("error", (e) => {});
});

app.get("/calc", (req, res) => {
  res.render("calc");
});

app.listen(3000, () => {
  console.log("server lisning...");
});
