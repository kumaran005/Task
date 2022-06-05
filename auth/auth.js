const { sign, verify } = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.loggingIn = async (req, res, next) => {
  // var { query } = req.query;
  var message = "Incorrect! Username or Password";
  var { e_mail, password } = req.body;

  try {
    var { data } = await axios.get(
      `https://crudcrud.com/api/${process.env.apiKey}/loggins/`
    );
    for (i in data) {
      var element = data[i];
      var verified = bcrypt.compareSync(password, element.passwordHash);
      if (e_mail == element.e_mail && verified) {
        const accessToken = sign({ e_mail }, process.env.SECRET, {
          expiresIn: "24h",
        });
        res.cookie("access-token", accessToken, {
          httpOnly: true,
        });
        next();
        return;
      }
    }

    return res.status(400).send(message);
  } catch (err) {
    console.error(err);
    return res.status(400).send("Something went wrong");
  }
};

exports.signUp = async (req, res, next) => {
  var { e_mail, password } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);
  try {
    var { data } = await axios.get(
      `https://crudcrud.com/api/${process.env.apiKey}/loggins/`
    );
    for (i in data) {
      var element = data[i];
      if (e_mail == element.e_mail) {
        res.send("Email already Exist");
        return;
      }
    }

    await axios.post(
      `https://crudcrud.com/api/${process.env.apiKey}/loggins/`,
      {
        e_mail,
        passwordHash,
      }
    );

    next();
  } catch (error) {
    console.error(error);
  }
};
exports.verifyUser = async (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  //   if (!accessToken)
  //     return res.status(400).json({ error: "User Not Authenticated" });
  try {
    const validToken = this.isValid(accessToken);
    var { e_mail } = validToken;

    if (e_mail) {
      req.token = validToken;
      next();
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    return res.redirect("/");
  }
};
exports.isValid = (accessToken) => verify(accessToken, process.env.SECRET);

exports.logout = function (req, res) {
  res.cookie("access-token", "", {
    maxAge: 1,
  });

  res.redirect("/");
};
