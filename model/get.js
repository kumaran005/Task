exports.makeGetRequest = async (req, res) => {
  try {
    var resp = await axios.get(
      `https://crudcrud.com/api/${process.env.apiKey}/users/`
    );
    var data = resp.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

exports.makeSingleGetRequest = async (req, res) => {
  var { id } = req.body;
  try {
    var resp = await axios.get(
      `https://crudcrud.com/api/${process.env.apiKey}/users/${id}`
    );
    var data = resp.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};
