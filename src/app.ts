import initApp from "./server";
const port = process.env.PORT;

console.log("port", port);
initApp().then((app) => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});