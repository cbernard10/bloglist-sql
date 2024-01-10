const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    try {
      await queryInterface.addColumn("users", "disabled", {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      });

      await queryInterface.createTable("active_sessions", {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "users", key: "id" },
        },
        token: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("users", "disabled");
    await queryInterface.dropTable("active_sessions");
  },
};
