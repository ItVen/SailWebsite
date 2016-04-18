/**
 * MovieController
 *
 * @description :: Server-side logic for managing movies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
	detail:function(req,res){
		//实现详情页查询逻辑
		var id=req.params.id;
		console.log(id);
		if(id){
			Movie
			.findOne({id:id})
			.exec(function(err,movie){
				if(err) console.log(err);
				Movie
				.update(id,{pv:++movie.pv})
				.exec(function(err,movie){ if(err) console.log(err)});
				Comment
				  .find({movieid:movie.id})
				  .populate('from')
				  .exec(function(err,comments){
				  	console.log(comments);
				  	res.render('pages/detail',{
						title:'Sails '+movie.title,
						movie:movie,
						comments:comments
					})
				})
			});	
		}	
	},
	new:function(req,res){
		Category
		.find()
		.exec(function(err,categories){
			res.render('pages/admin',{
				title:'Node 后台录入页',
				movie:{},
				categories:categories
			});
		});
	},
		//admin update page
	update:function(req,res){
		var id=req.params.id;
		// console.log(id);
		if(id){
			Movie
			.findOne({id:id})
			.exec(function(err,movie){
				if(err){
					console.log(err);
				}
				//分类标签同时放入
				Category
				.find()
				.exec(function(err,categories){
					res.render('pages/admin', {
						title: 'Node 后台更新页面',
						movie: movie,
						categories: categories
					});
				});
			});
		}
	},

		//admin post movie
	save:function(req,res){
		var id=req.body._id;
		var movieObj=req.body;
		var _movie;
		if(req.poster){
			movieObj.poster=req.poster;
		}
		var categoryId=movieObj.categoryObj;
		var categoryName=movieObj.categoryName;
		if(id){
			if(categoryId){

				Movie
				.update(id,movieObj)
				.exec(function(err,new_Movie){
					if(err) console.log(err);
					Movie
					.update(id,{category:categoryId}).exec(function(err,nMovie){
						if(err) console.log(err);
						res.redirect('/movie/' + nMovie[0].id);
					})
				})
			}else if(categoryName){
				Category
				.create({name:categoryName})
				.exec(function(err,category){
					if(err) console.log(err);
					Movie
					.update(id,movieObj)
					.exec(function(err,new_Movie){
						if(err) console.log(err);
						Movie
						.update(id,{category:category.id})
						.exec(function(err,nMovie){
							res.redirect('/movie/' + nMovie[0].id);
						});
					});
				});

			 }
			
		}else{
			if(categoryId){
				Movie
				.create(movieObj)
				.exec(function(err,movie){
					if(err){
						console.log(err);
					}
					Movie
					.update(movie.id,{category:categoryId})
					.exec(function(err,upmovie){
						if(err) {console.log(err);}
						res.redirect('/movie/' + upmovie[0].id);
					});
				});

			}else if(categoryName){
				Category
				.create({name:categoryName})
				.exec(function(err,category){
					Movie
					.create(movieObj)
					.exec(function(err,movie){
						if(err) console.log(err);
						Movie
						.update(movie.id,{category:category.id})
						.exec(function(err,movie){
							if(err) console.log(err);
							res.redirect('/movie/' + movie[0].id);
						});
					});
				});
			}
		}
	},
		//list page
	list : function(req,res){
		res.locals.moment=require('moment');
		//实现查询逻辑
		Movie
		.find()
		.exec(function(err,movies){
			if(err){
				console.log(err);
			}
			console.log(movies);
			res.render('pages/list',{
				title:'Node 列表页',
				movies:movies
			})
		})
		
	},
	delet: function(req,res){
		var query=req._parsedUrl.query;
		if(query!==undefined){
			var id=query.substr(3);
		}
		// console.log(id);
		if(id){
			Movie.destroy({id: id},function(err,movie){
				if(err){
					console.log(err)
				}else{
					res.json({success:1})
				}

			});
		}
	}
};

// 	//设置删除的路由
// 	//list delete movie net::ERR_empty_RESPONSE

// //增加存储图片的中间件
// exports.savePoster=function(req,res,next){
// 		// console.log(req.files);
// 	//拿到上传的文件
// 	var postData=req.files.uploadPoster;
// 	// 拿到文件的路径
// 	var filePath=postData.path;
// 	//拿到原始名字
// 	var originalFileName=postData.originalFilename;
// 	console.log("originalFileName--------------------");
// 	console.log(originalFileName);
// 	// 有原始名字代表有文件传过来
// 	if(originalFileName){
// 		fs.readFile(filePath,function(err,data){
// 			var timeName= Date.now();
// 			var type=postData.type.split('/')[1];
// 			var poster = timeName+'.'+type;
// 			var newPath=path.join(__dirname,'../../','/public/upload/'+poster);
// 			console.log("newPath--------------------");
// 			console.log(newPath);
// 			//写入文件
// 			fs.writeFile(newPath,data,function(){
// 				if(err){
// 					return;
// 				}
// 				req.poster=poster;
// 				next();
// 			})
// 		});
// 	}else{
// 		next();
// 	}
// };