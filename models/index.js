const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./reading_list");
const ActiveSession = require("./active_session");

Blog.belongsTo(User);
User.hasMany(Blog);
// User.belongsTo(ActiveSession);

Blog.belongsToMany(User, { through: ReadingList, as: "user_blog_readings" });
User.belongsToMany(Blog, { through: ReadingList, as: "blog_user_readings" });

module.exports = {
  Blog,
  User,
  ReadingList,
  ActiveSession
};
