import { delSQL } from "~/server/api";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await delSQL("user", body);
  } catch (err: any) {

  }
});
