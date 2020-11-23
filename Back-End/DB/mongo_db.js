const mongoose = require("mongoose");
const config = require("../Configs/config").DB;
const Loger = require("../Util/Loger");
const FormattedDate = require("../Util/time_format");
const UserSchema = require("../Schemas/user_schema");

mongoose.connect(config.db_name, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  Loger.log("Sucsses on DB Conection");
  const users = await UserSchema.find();
  if (users.length === 0) {
    const defaultUser = {
      username: "bot-admin@mail.com",
      password: "bot-admin123456",
      role: "admin",
    };
    await NewUser(defaultUser).save();
    Loger.info(
      `defult log in Username : ${defaultUser.username} | Password : ${defaultUser.password} | Role : ${defaultUser.role} `
    );
  }
});

function NewUser(paylode) {
  const { username, password, role } = paylode;
  const NewUser = new UserSchema({
    user_name: username,
    password: password,
    role: role,
    isband: false,
    createdDate: FormattedDate.HumanDate(),
  });
  return NewUser;
}

module.exports = mongoose;
