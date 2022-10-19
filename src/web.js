const { Template } = require("@walletpass/pass-js");
const fs = require("fs");

// Create a Template from local folder, see __test__/resources/passes for examples
// .load will load all fields from pass.json,
// as well as all images and com.example.passbook.pem file as key
// and localization string too
const express = require("express");
const next = require("next");
var path = require("path");

const nextApp = next({ dev: true });
const handle = nextApp.getRequestHandler();

async function createTemplate() {
  const template = new Template("generic", {
      passTypeIdentifier: "pass.software.bambumeta.wallet.test",
      teamIdentifier: "TRNSUVDVDT",
      backgroundColor: "black",
      sharingProhibited: true,
      organizationName: "BambuMeta"
    });
    
    await template.loadCertificate("./certificates/pass.software.bambumeta.pass.test.pem", "diet4coke");

    return template;
   
}


nextApp
  .prepare()
  .then(async () => {
    const app = express();

    let template = await createTemplate();

    app.get("/", (req, res) => {
      nextApp.render(req, res, "/index");
    });

    app.get("/pass", async function (req, res, next) {
      console.log("start");

      await template.images.add(
        "icon",
        path.join(__dirname, "images", "icon.png")
      );

      console.log("image 1");
      await template.images.add(
        "logo",
        path.join(__dirname, "images", "icon.png")
      );
      console.log("image 2");

      const pass = template.createPass({
        serialNumber: "123456",
        description: "20% off"
      });
      console.log("pass");
      fs.createWriteStream('passes/pass.pkpass').write(await pass.asBuffer())
      res.json({
        message: "Apple Pass Created",
        pass: await pass.asBuffer()
      });
    });

    app.get("*", (req, res) => {
      handle(req, res);
    });

    app.listen(8080, () => {
      console.log("Server listening on port 8080.");
    });
  })
  .catch((err) => {
    console.error("Server crashed:");
    console.error(err);
  });

module.exports = nextApp;