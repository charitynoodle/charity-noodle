import * as path from "path";
import * as passport1 from "passport";
const router: any = require("express").Router();

// Self Explanitory
router.get("/login", (req: any, res: { render: (arg0: string) => void }) => {
  res.render("login");
});

// Self Explanitory
router.get(
  "/logout",
  (req: { logout: () => void }, res: { render: (arg0: string) => void }) => {
    req.logout();
    res.render("home");
  }
);

// First trip to google
router.get(
  "/google",
  passport1.authenticate("google", {
    scope: ["profile"],
  })
);

// Second trip to google
router.get(
  "/google/redirect",
  passport1.authenticate("google"),
  (req: any, res: { sendFile: (arg0: string) => void }) => {
    res.sendFile(path.resolve(__dirname, "../build/index.html"));
  }
);

module.exports = router;
