import express from "express";

const router = express.Router();


router
  .route("/admins")
  .get((req, res, next) => {
    res.status(200).json({
      admins: ["Admin Bhuwan", "Admin Sujal"],
    });
  })
  .post()
  .put()
  .patch()
  .delete();

export default router;
