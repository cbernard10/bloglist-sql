const { DataTypes } = require("sequelize");

const currentYear = new Date().getFullYear();
// console.log(currentYear, typeof currentYear);

module.exports = {
  up: async ({ context: queryInterface }) => {
    try {
      await queryInterface.addColumn("blogs", "year", {
        type: DataTypes.INTEGER,
        defaultValue: currentYear,
        validate: {
          min: 1991,
          max: currentYear,
        },
      });
    } catch (err) {
      console.log(err);
    }
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("blogs", "year");
  },
};
