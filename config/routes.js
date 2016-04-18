/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {
  /********************************首页***************************************/
  '/':'Index.index',
  'get /results': "Index.search",
  /******************************用户登录注册逻辑*****************************/
  'get /signin': {
      view:'pages/signin'
  },
  'post /signin': 'AuthController.processSignin',

  'get /signup': 'AuthController.toSignup',
  'post /signup': 'AuthController.processSignup',
  
  '/logout': 'AuthController.logout',

  'get /admin/user/list':'User.list',
  'delete /admin/user/list':'User.delet',

  /*********************************用户***********************************/
  '/user': {
    view: 'index'
  },
  /********************************电影**************************************/
  'get /movie/:id':'MovieController.detail',
  'get /admin/movie/new':'MovieController.new',
  'get /admin/movie/list':'MovieController.list',
  'post /admin/movie':'MovieController.save',
  'get /admin/movie/update/:id':'MovieController.update',
  'delete /admin/movie/list':'MovieController.delet',
  /*******************************分类*****************************************/
  'get /admin/category/new':'Category.new',
  'post /admin/category':'Category.save',
  'get /admin/category/list':'Category.list',
  'delete /admin/category/list':'Category.delet',
  'get /admin/categories/update/:id':'Category.update',
  /*********************************评论***************************************/
  'post /user/comment':'Comment.save'

};
