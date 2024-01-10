const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    try {
      await queryInterface.addColumn("reading_lists", "read", {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      });
    } catch (err) {
      console.log(err);
    }
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("reading_lists", "read");
  },
};
