/**
 * Comment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'comment',
  attributes: {
  	content:'string',
    movieid:'string',
  	movie:{
  		model:'movie'
  	},
    //和用户表示多对多的关系
  	from:{
      collection:'user',
      via:'fromu',
      // dominant:true
  		// model:'user'
  	},
  	to:{
      collection:'user',
      via:'tou',
      // dominant:true
      // model:'user'
    }
    // reply:{
    //   type:'array',
    //   from:{model:'user' },
    //   to:{model:'user'},
    //   reply:'string'
    // }
  }
};
