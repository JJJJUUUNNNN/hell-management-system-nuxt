import { addSQL } from "~/server/api";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await addSQL("user", body);
  } catch (err: any) {

  }
});
