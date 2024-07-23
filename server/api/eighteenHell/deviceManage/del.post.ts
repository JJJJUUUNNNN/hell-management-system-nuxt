import { delSQL } from "~/server/api";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await delSQL("device", body);
  } catch (err: any) {

  }
});
