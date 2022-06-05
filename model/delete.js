exports.makeDeleteRequest = async (req, res) => {
  var { id } = req.body;
  try {
    await axios.delete(
      `https://crudcrud.com/api/${process.env.apiKey}/users/${id}`
    );
  } catch (error) {
    console.error(error);
  }

  return "deleted Succefully";
};
