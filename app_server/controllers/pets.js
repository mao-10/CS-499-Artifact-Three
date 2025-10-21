const petsEndpoint = "http://localhost:3000/api/pets";
const options = {
  method: "GET",
  headers: {
    'Accept': "application/json"
  }
};

/* GET Pets view */
// define with asynchronous function
const pets = async function(req, res, next) {
  await fetch(petsEndpoint, options)
  .then((res) => res.json())
  .then((json) => {
    let message = null;
    // if response isn't an array of JSON objects
    if (!(json instanceof Array)) {
      message = "API lookup error";
      json = [];
    }
    // response is an array, but length 0
    else {
      if (!json.length) {
        message = "No pets exist in our database!";
      }
    }
    res.render("pets", { title: "Pet Hotel", petsData: json, message});
  })
  .catch((err) => res.status(500).send(err.message));
};

module.exports = {
  pets
};
