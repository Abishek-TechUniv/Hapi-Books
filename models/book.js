

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    Name: { type: DataTypes.STRING, unique: true },
    Author: DataTypes.STRING,
    rating: DataTypes.STRING,
    liked: DataTypes.BOOLEAN,
    disliked: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return Book;
};
