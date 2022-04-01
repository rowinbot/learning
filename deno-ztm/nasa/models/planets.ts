import { join } from 'https://deno.land/std/path/mod.ts';
import { BufReader } from "https://deno.land/std@0.133.0/io/buffer.ts";
import { parse } from "https://deno.land/std@0.133.0/encoding/csv.ts";

import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

type Planet = Record<string, string>;

let planets: Array<Planet>;

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
  
  return planets;
}

async function readCSV(filePath: string) {
  const file = await Deno.open(filePath);
  const bufReader = new BufReader(file);
  const data = await parse(bufReader, { skipFirstRow: true, comment: "#" });
  Deno.close(file.rid);

  return data;
}

try {    
  planets = await readPlanetsCSV(join("data", "kepler_exoplanets_archive.csv"));
  console.log(`${planets.length} habitable planets found!`);
} catch (err) {
  console.log(err);
}

export function getAllPlanets() {
  return planets;
}