exports.makePutRequest = async (req, res) => {
  var { user_name, user_age, user_gender, user_color, id } = req.body;
  let payload = { user_name, user_age, user_color, user_gender };
  try {
    await axios.put(
      `https://crudcrud.com/api/${process.env.apiKey}/users/${id}`,
      payload
    );
  } catch (error) {
    console.error(error);
  }

  return "Updated Successfully..!";
};
