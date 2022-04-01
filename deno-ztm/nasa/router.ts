import { Router } from 'https://deno.land/x/oak@v10.5.1/mod.ts';
import * as planets from "./models/planets.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "Maricita es muy linda";
});

router.get("/planets", (ctx) => {
  ctx.response.body = planets.getAllPlanets();
});

export default router;