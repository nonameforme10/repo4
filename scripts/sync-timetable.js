import { fetchLatestTimetable } from "../src/edupage.js";
import { writeTimetableData } from "../src/storage.js";
import { syncTimetableToFirebase } from "../src/firebase-rtdb.js";
import { PUBLIC_TIMETABLE_DATA_URL } from "../src/config.js";

const push = process.argv.includes("--push");

try {
  const data = await fetchLatestTimetable();
  const filePath = await writeTimetableData(data);
  const publicFilePath = await writeTimetableData(data, PUBLIC_TIMETABLE_DATA_URL);

  console.log(`Saved ${data.metadata.counts.rooms} rooms to ${filePath}`);
  console.log(`Saved static dashboard copy to ${publicFilePath}`);
  console.log(`Timetable ${data.metadata.timetableNumber}: ${data.metadata.timetableText}`);

  if (push) {
    await syncTimetableToFirebase(data);
    console.log("Firebase RTDB updated at /timetable and /metadata");
  } else {
    console.log("Firebase not updated. Run npm run sync:firebase to push.");
  }
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
