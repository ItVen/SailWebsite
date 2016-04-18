/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new:function(req,res){
		res.render('pages/category_admin',{
			title:'后台分类录入页',
			category:{}
		})
	},
	save:function(req,res){
		var _category=req.body;
		var id=_category._id;
		console.log(_category);
		if(id){
			Category
			.update(id,_category)
			.exec(function(err,category){
				if(err){
					console.log(err);
				}
				res.redirect('/admin/category/list')
			})
		}else{
			console.log(_category);
			Category
			.create(_category)
			.exec(function(err,category){
				if(err){
					console.log(err);
				}
				res.redirect('/admin/category/list')
			});
		}
		
	},
	list:function(req,res){
		res.locals.moment=require('moment');
		//实现查询逻辑
		Category
		.find()
		.exec(function(err,categories){
			if(err){
				console.log(err);
			}
			res.render('pages/categorylist',{
				title:'用户信息列表页',
				categories:categories
			})
		})
	},
	delet:function(req,res){
		var query=req._parsedUrl.query;
		if(query!==undefined){
			var id=query.substr(3);
		}
		// console.log(id);
		if(id){
			Category.destroy({_id: id},function(err,category){
				if(err){
					console.log(err)
				}else{
					res.json({success:1})
				}

			});
		}
	},
	update:function(req,res){
		var id=req.params.id;
		// // console.log(id);
		if(id){
			Category
			.findOne({id:id})
			.exec(function(err,category){
				if(err){
					console.log(err)
				}
				console.log(category);
				res.render('pages/category_admin',{
					title:'后台分更新页',
					category:category
				})
			})
		}
	}
};

