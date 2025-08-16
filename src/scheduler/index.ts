import cron from "node-cron";
import { main } from "../main";

// TEST 10 sec
// "*/10 * * * * *"

// PROD 1 day 7 am
// "0 7 * * *"

cron.schedule(
  "0 7 * * *",
  () => {
    console.log("Running daily task...");
    main().catch(console.error);
  },
  {
    timezone: "Europe/Warsaw",
  }
);

console.log("Scheduler running...");
