import fs from "fs";
import { feature } from "topojson-client";
import us from "us-atlas/states-10m.json" assert { type: "json" };

const states = feature(us, us.objects.states);

fs.writeFileSync("src/data/us-states.json", JSON.stringify(states));
