/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {
  '*': 'isAuthenticated',
  // '*': 'isAuthenticated',
  // // 验证逻辑都不需要登录
  // // 用户创建后不再允许注册
  MovieController: {
      detail: 'isAuthenticated',
      delet: ['isAuthenticated','isLogin','isAdmin'],
      update: ['isAuthenticated','isLogin','isAdmin'],
      save: ['isAuthenticated','isLogin','isAdmin'],
      list: ['isAuthenticated','isLogin','isAdmin'],
      new: ['isAuthenticated','isLogin','isAdmin']
  },
  UserController:['isAuthenticated','isLogin','isAdmin'],
  CategoryController:['isAuthenticated','isLogin','isAdmin'],
  CommentController:['isAuthenticated','isLogin']
  
};
