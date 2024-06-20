import { mongo } from "#nuxt-mongodb";

/**
 * 数据库查询
 * @param table 数据集合
 * @param obj 查询结果
 */
export const findSQL = async (table: string, obj: Record<string,any> = {}) => {
  return new Promise(async (resolve, reject) => {
    const db = mongo.db();
    console.log("db!", db);
    let query:Record<string,any> = {};
    let isEmpty = true;

    try {
      for (let key in obj) {
        if (obj[key] !== "") {
          query[key] = obj[key];
          isEmpty = false;
        }
      }

      if (isEmpty) {
        query = {};
      }

      const response = await db.collection(table).find(query).toArray(); //注意此处的toArray()方法，否则可能返回的数据无法正常访问
      
      resolve(response);
      db.close();
    } catch (err) {
      reject(err);
    }
  });
};
