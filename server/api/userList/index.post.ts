import { findSQL } from "~/server/api";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const data = await findSQL("user", body);
    return {
      code: 200,
      msg: "ok",
      data:data,
    };
  } catch (err:any) {
    return {
      code: 500,
      msg: err.message,
    };
  }
});
