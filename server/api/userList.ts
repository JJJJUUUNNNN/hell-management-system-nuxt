export default defineEventHandler((event) => {
  return {
    code: 0,
    message: "操作成功",
    data: [
      {
        id: 1,
        name: "张三",
        time: Date.now(),
      },
      {
        id: 2,
        name: "李四",
        time: Date.now(),
      },
      {
        id: 3,
        name: "王五",
        time: Date.now(),
      },
    ],
  };
});
