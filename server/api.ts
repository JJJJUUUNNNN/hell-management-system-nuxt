import { mongo } from "#nuxt-mongodb";

/**
 * 数据库查询
 * @param table 数据集合
 * @param obj 查询结果
 */
export const findSQL = async (table: string, obj: object = {}) => {
  return new Promise(async (resolve, reject) => {
    const db = mongo.db();
    console.log('db!',db)
    try {
      const response = await db.collection(table).find(obj).toArray(); //注意此处的toArray()方法，否则可能返回的数据无法正常访问
      resolve(response);
      db.close();
    } catch (err) {
      reject(err);
    }
  });
};
