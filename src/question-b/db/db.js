import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
   dialect: 'sqlite',
   storage: './src/question-b/db/storage/database.sqlite' // Partindo da raiz.
});

export default sequelize;