require("dotenv").config();
const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require("express");

const app = express();
app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  //   dialectOptions: {
  //     ssl: {
  //       require: true,
  //       rejectUnauthorized: false,
  //     },
  //   },
});

class Note extends Model {}
Note.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.TEXT, allowNull: false },
    important: { type: DataTypes.BOOLEAN },
    date: { type: DataTypes.DATE },
  },
  { sequelize, underscored: true, timestamps: false, modelName: "note" }
);

app.get("/api/notes", async (req, res) => {
  const notes = await Note.findAll();
  res.json(notes);
});

app.post("/api/notes", async (req, res) => {
  try {
    const note = await Note.create(req.body);
    return res.json(note);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Postgres cluster fs-psql-lecture-db-cb10 created
//   Username:    postgres
//   Password:    1IpFq5HdRdYQ9mn
//   Hostname:    fs-psql-lecture-db-cb10.internal
//   Flycast:     fdaa:3:b3a7:0:1::2
//   Proxy port:  5432
//   Postgres port:  5433
//   Connection string: postgres://postgres:1IpFq5HdRdYQ9mn@fs-psql-lecture-db-cb10.flycast:5432

// Postgres cluster bloglist-sql-db-cb10 created
//   Username:    postgres
//   Password:    rSDTdBPEO011vAH
//   Hostname:    bloglist-sql-db-cb10.internal
//   Flycast:     fdaa:3:b3a7:0:1::3
//   Proxy port:  5432
//   Postgres port:  5433
//   Connection string: postgres://postgres:rSDTdBPEO011vAH@bloglist-sql-db-cb10.flycast:5432

// DATABASE_URL=postgres://bloglist_sql_cb10:wSf9vaWWRv5c3JD@bloglist-sql-db-cb10.flycast:5432/bloglist_sql_cb10?sslmode=disable
