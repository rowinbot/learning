import * as log from "https://deno.land/std/log/mod.ts";
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

interface Launch {
  flightNumber: number;
  mission: string;
  rocket: string;
  customers: string[];
}
const launches = new Map<number, Launch>();

async function downloadLaunchData() {
  log.info("Downloading launch data...");
  log.warning("DOWNLOADIIIIIIINGGG!");
  const response = await fetch("https://api.spacexdata.com/v3/launches");

  if (!response.ok) {
    log.warning("Problem downloading launch data.");
    throw new Error("Launch data download failed.");
  }

  const launchData = await response.json();

  for (const launch of launchData) {
    const payloads = launch["rocket"]["second_stage"]["payloads"];
    const customers = _.flatMap(payloads, (payload: any) => payload["customers"]);

    const flightData: Launch = {
      flightNumber: Number(launch["flight_number"]),
      mission: launch["mission_name"],
      rocket: launch["rocket"]["rocket_name"],
      customers
    }

    launches.set(flightData.flightNumber, flightData);

    log.info(JSON.stringify(flightData));
  }

  return launchData;
}

await log.setup({
  handlers: { console: new log.handlers.ConsoleHandler("DEBUG") },
  loggers: {
    default: {
      level: "DEBUG",
      handlers: ["console"],
    },
  },
});

await downloadLaunchData();
log.info(JSON.stringify(import.meta))

if (import.meta.main) {
  log.info(`Download data for ${launches.size} SpaceX launches`);
}