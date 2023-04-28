const { signup, signin } = require("./user_auth");
const { createUser, getUsers, getUser, updateUser, deleteUser,changePassword, logout } = require("./user_services");

  const router = require("express").Router();
  
  router.route("/").post(createUser).get(getUsers);
  router
    .route("/:id")
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);
  
   router.patch("/changePassword/:id",changePassword) 
   router.post("/signup",signup)
   router.post("/signin",signin)
   router.get("/logout/:id",logout)
  module.exports = router;
  