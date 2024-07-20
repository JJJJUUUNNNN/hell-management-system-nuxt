import { updateSQL } from "~/server/api";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await updateSQL("user", body);
  } catch (err: any) {

  }
});
