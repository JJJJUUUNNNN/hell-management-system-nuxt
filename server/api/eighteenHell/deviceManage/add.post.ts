import { addSQL } from "~/server/api";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await addSQL("device", body);
  } catch (err: any) {

  }
});
