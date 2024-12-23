import express from "express";

const router = express.Router();

router
  .route("/users")
  .get((req, res, next) => {
    res.status(200).json({
      users: ["Bhuwan", "Sujal"],
    });
  })
  .post()
  .patch()
  .delete();

router.route("/users/:id").put((req, res, next) => {
  const { id } = req.params;
  console.log(id);
  res.status(200).json({
    message: "User updated",
  });
});

export default router;
