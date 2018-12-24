const clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "API KEY"
});

const handleApiCall = (req, res) => {
  app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => {
        res.json(data)
      })
      .catch(err => res.status(400).json("unable to consume api"));
      
}
  
const handleImage = (req, res, db) => {
    const { id } = req.body;
    db("users")
      .where("id", "=", id)
      .increment("entries", 1)
      .returning("entries")
      .then(entries => {
        res.json(entries[0]);
      })
      .catch(err => res.status(400).json("error getting user"));
  }

  module.exports = {
      handleImage,
      handleApiCall
  }



  //https://www.cutislaserclinics.com/wp-content/uploads/2018/02/Achieve-a-Youthful-V-Shape-Face.jpg
