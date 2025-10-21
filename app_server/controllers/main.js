/* GRT Homepage */

const index = (req, res) => {
  res.render('index', {title: "Pet Hotel"});
};

module.exports = {
  index
}
