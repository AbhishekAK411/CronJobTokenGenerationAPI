import express from "express";
import { flightAPIOneWay, searchFlight } from "../controllers/flights.js";
import { CronJob } from "cron";
import sessionToken from "../models/sessionToken.js";

const router = express.Router();

let job = new CronJob('0 */8 * * *', ()=>{
    sessionToken.updateOne({}, {$unset : {sessionToken : 1}}).exec();
});
job.start();

router.get("/onewayflight", flightAPIOneWay);
router.post("/searchFlight", searchFlight);



export default router;