'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vocabulary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vocabulary.init({
    word: DataTypes.STRING,
    reading: DataTypes.STRING,
    meaning: DataTypes.STRING,
    meaning_ko: DataTypes.STRING, 
    jlpt_level: DataTypes.STRING,
    example_sentence: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Vocabulary',
  });
  return Vocabulary;
};