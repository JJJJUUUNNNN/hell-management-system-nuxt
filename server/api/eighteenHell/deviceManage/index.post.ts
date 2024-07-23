import { findSQL } from "~/server/api";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await findSQL("device", body);
  } catch (err: any) {

  }
});
