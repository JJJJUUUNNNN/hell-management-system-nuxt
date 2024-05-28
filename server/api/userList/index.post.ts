import { findSQL } from "~/server/api";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log('body',body)
  try {
    const data = await findSQL("user", body);
    console.log('findSQL??',data)
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
  // return {
  //   code: 0,
  //   message: "操作成功",
  //   data: [
  //     {
  //       id: 1,
  //       name: "张三",
  //       time: Date.now(),
  //     },
  //     {
  //       id: 2,
  //       name: "李四",
  //       time: Date.now(),
  //     },
  //     {
  //       id: 3,
  //       name: "王五",
  //       time: Date.now(),
  //     },
  //   ],
  // };
});
