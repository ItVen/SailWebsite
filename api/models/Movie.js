/**
 * Movie.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'movie',
  attributes: {
  	doctor:'string',
	title:'string',
	language:'string',
	country:'string',
	summary:'string',
	flash:'string',
	poster:'string',
	year:'string',
	pv:{
		type: 'integer',
	    // autoIncrement: true,//++
		defaultsTo:0
	},
	category:{
      model:'category'
    },
    comments:{
    	collection:'comment',
    	via:'movie'
    }
  }
};

