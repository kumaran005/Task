exports.makePostRequest = async (req, res) => {
  var payload = req.body;
  try {
    await axios.post(
      `https://crudcrud.com/api/${process.env.apiKey}/users`,
      payload
    );
  } catch (error) {
    console.error(error);
  }

  return "Added Successfully";
};
