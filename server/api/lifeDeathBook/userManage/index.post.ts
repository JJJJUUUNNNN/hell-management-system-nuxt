import { findSQL } from "~/server/api";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await findSQL("user", body);
  } catch (err: any) {

  }
});
