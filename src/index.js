const { Template } = require("@walletpass/pass-js");
const fs = require("fs");
const path = require('path');
async function createTemplate() {
  const template = new Template("generic", {
      passTypeIdentifier: "pass.software.bambumeta.wallet.test",
      teamIdentifier: "TRNSUVDVDT",
      backgroundColor: "white",
      sharingProhibited: true,
      organizationName: "BambuMeta"
    });

    await template.loadCertificate("./certificates/pass.software.bambumeta.pass.test.pem", "diet4coke");

    return template;
   
}

function createPass(serialNumber, description) {
    createTemplate().then(async (template) => {

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
        serialNumber: serialNumber,
        description: description,
        foregroundColor: "blue",
        backgroundColor: "black",
        labelColor: "white",
        webServiceURL: "https://northern.bambumeta.software/shopify",
        authenticationToken: "abcd-1234-efgh-5678"
      });
      pass.primaryFields.add({
        key: "name",
        label: "Name",
        value: "Pat Faiola"
      })
      pass.
      console.log("pass");
      pass.asBuffer().then((buffer) => {
        fs.createWriteStream('passes/pass.pkpass').write(buffer);
        console.log("Write Pass to File");
      })

    })
}

createPass("1234", "My Pass");