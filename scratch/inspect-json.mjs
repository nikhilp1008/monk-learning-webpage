import fs from "fs";

const localJsonPath = "/Users/raasikhnaveed/Desktop/JSON_LESSONS/Class12_phy/p12_ch01_electric-charges-and-fields_full.json";
const jsonContent = JSON.parse(fs.readFileSync(localJsonPath, "utf8"));

console.log("Root keys:", Object.keys(jsonContent));
if (jsonContent.sections) {
  console.log("sections length:", jsonContent.sections.length);
  console.log("Section 0:", JSON.stringify(jsonContent.sections[0], null, 2));
}
