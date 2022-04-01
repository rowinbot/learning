import { BufReader } from "https://deno.land/std@0.133.0/io/buffer.ts";
import { parse } from "https://deno.land/std@0.133.0/encoding/csv.ts";

import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

interface Planet {
  [key: string]: string;
}

async function readPlanetsCSV(filePath: string) {
  const fileContent = await readCSV(filePath);

  const planets = (fileContent as Array<Planet>).filter((planet) => {
    const planetaryRadius = Number(planet["koi_prad"]);
    const stellarMass = Number(planet["koi_smass"]);
    const stellarRadius = Number(planet["koi_srad"]);

    return planet["koi_disposition"] === "CONFIRMED" &&
      planetaryRadius > 0.5 &&
      planetaryRadius < 1.5 &&
      stellarMass > 0.78 &&
      stellarMass < 1.04 &&
      stellarRadius > 0.99 &&
      stellarRadius < 1.01;
  }).map((planet) =>
    _.pick(planet, [
      "koi_disposition",
      "koi_smass",
      "koi_srad",
      "kepler_name",
      "koi_count",
      "koi_steff",
      "koi_period",
    ])
  ).sort((a, b) => Number(a["koi_period"]) - Number(b["koi_period"]));

  const shortest = planets.at(0);
  const longest = planets.at(-1);

  for (const planet of planets) {
    console.log(planet);
  }
  
  console.log("----- SHORTEST -----");
  console.log(shortest);
  console.log("--------------------");
  console.log("----- LONGEST -----");
  console.log(longest);
  console.log("-------------------");
}

async function readCSV(filePath: string) {
  const file = await Deno.open(filePath);
  const bufReader = new BufReader(file);
  const data = await parse(bufReader, { skipFirstRow: true, comment: "#" });
  Deno.close(file.rid);

  return data;
}

try {
  const { args } = Deno;
  const fileName: string | null = args[0];

  if (!fileName) {
    throw new Error("Use: deno run mod.ts <fileName>");
  }

  await readPlanetsCSV(fileName);
} catch (err) {
  console.log(err.message);
}
