const { createUser, getUsers, getUser, updateUser, deleteUser } = require("./user_services");

  const router = require("express").Router();
  
  router.route("/").post(createUser).get(getUsers);
  router
    .route("/:id")
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);
  
  module.exports = router;
  