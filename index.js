import express from "express";
import axios from "axios";
import ejs from "ejs";

const port = 3001;
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { result: "Ask Joke, by submiting your choise" });
});

app.post("/joke", async (req, res) => {
  console.log(req.body);
  let url = "https://v2.jokeapi.dev/joke/";
  let determinedCatagories = determineCatagories(
    JSON.parse(req.body.selectedCatagories)
  );
  let determinedFlaslists = determineFlaglists(
    JSON.parse(req.body.colecBlacklist)
  );
  let determinedLanguage = determineLanguage(
    req.body.language,
    determinedFlaslists
  );
  url = url + determinedCatagories + determinedFlaslists + determinedLanguage;
  console.log(url);
  try {
    let result = await axios.get(url);
    console.log(result.data);
    if (result.data.type == "single") {
      res.render("index.ejs", { result: result.data.joke });
    } else {
      res.render("index.ejs", {
        setup: result.data.setup,
        delivery: result.data.delivery,
      });
    }
  } catch (error) {
    console.error(
      "There is error when sending get request to the API: " + error
    );
    res.render("index.ejs", { result: error.response.data });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

function determineCatagories(array) {
  if (array.length == 0) {
    return "Any";
  } else {
    var catag = "";
    for (var i = 0; i < array.length - 1; i++) {
      catag += array[i] + ",";
    }
    catag += array[array.length - 1];
    return catag;
  }
}

function determineFlaglists(array) {
  if (array.length == 0) {
    return "";
  } else {
    var blacklistFlags = "?blacklistFlags=";
    for (var i = 0; i < array.length - 1; i++) {
      blacklistFlags += array[i] + ",";
    }
    blacklistFlags += array[array.length - 1];
    return blacklistFlags;
  }
}

function determineLanguage(language, catagory) {
  if (catagory == "") {
    if (language == "English") {
      return "";
    } else {
      let lang = "?lang=" + language;
      return lang;
    }
  } else {
    if (language == "English") {
      return "";
    } else {
      let lang = "&lang=" + language;
      return lang;
    }
  }
}
