/**
 * Category.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
//分类标签和电影是一对多的关系
module.exports = {
  tableName: 'category',
  // _identity: 'sails.models.category',
  attributes: {
  	name:'string',
  	movies:{
  		collection: 'movie',
	    via: 'category'
	}
  }
};

