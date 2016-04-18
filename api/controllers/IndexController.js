/**
 * IndexController
 *
 * @description :: Server-side logic for managing indices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index:function(req,res){
		Category
		.find()
		.populate('movies')
		.exec(function(err,categories){
			if(err) console.log(err);
			res.render('pages/index', {
		        title : 'Node 首页',
		        categories: categories
		    })
		})
	},
	search : function (req, res) {
		var cateId=req.query.cat;
		var page=parseInt(req.query.p,10) || 0;
		var search=req.query.search;//搜索
		var count=2;
		var index=page*count;
		console.log(cateId);

		if(cateId){
			Category
		    .findOne({id:cateId})
		    .populate('movies')
		    .exec(function (err, categories) {
		      if (err) console.log(err);
		      var movies=categories.movies||[];
		      console.log(categories);
		      var result=movies.slice(index,index+count);
		      res.render('pages/result', {
		        title : '查询结果',
		        courrentPage:page+1,
		        movies:result,
		        totalPage:Math.ceil(movies.length/count),
		        keyword:categories.name,
		        query:'cat='+cateId
		      })  
		  });
		}else{
			Movie
			.find({title:new RegExp(search + '*', 'i')})//通过正则表达式进行模糊查询
			.exec(function(err,movies){
				 if (err) console.log(err);
			      var result=movies.slice(index,index+count);
			      res.render('pages/result', {
			        title : '查询结果',
			        courrentPage:page+1,
			        movies:result,
			        totalPage:Math.ceil(movies.length/count),
			        keyword:search,
			        query:'cat='+search
			      })  
			});
		}
	}
};
