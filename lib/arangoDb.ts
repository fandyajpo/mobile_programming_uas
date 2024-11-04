//
const getConnection = async () => {
  try {
    const auth = await fetch(
      `${process.env.EXPO_PUBLIC_ARANGO_URL}/_db/_system/_open/auth`,
      {
        method: "POST",
        body: JSON.stringify({
          username: process.env.EXPO_PUBLIC_ARANGO_USER,
          password: process.env.EXPO_PUBLIC_ARANGO_PASS,
        }),
      }
    );
    const result = await auth.json();

    return {
      token: result?.jwt,
    };
  } catch (error) {
    throw error;
  }
};

export const query = async <T>(
  query: string,
  bindVars: T & { "@coll": string }
) => {
  try {
    const { token } = await getConnection();
    const cursor = await fetch(
      `${process.env.EXPO_PUBLIC_ARANGO_URL}/_db/facility_admin/_api/cursor`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
        method: "POST",
        body: JSON.stringify({
          id: "currentFrontendQuery",
          query,
          bindVars,
          options: { profile: true },
        }),
      }
    );
    const res = await cursor.json();
    return res?.result;
  } catch (error) {
    throw error;
  }
};

// const getCollection = async (cName: string, db: Database) => {
//   try {
//     const collections = await db.collections();
//     if (collections.find((c: any) => c._name === cName)) {
//       return db.collection(cName);
//     }
//     return null;
//   } catch (error) {
//     console.log("error getCollection", error);
//     throw error;
//   }
// };

// const getView = async (cName: string, db: Database) => {
//   try {
//     const view = await db.views();
//     if (view.find((c: any) => c._name === cName)) {
//       return db.view(cName);
//     }
//     return null;
//   } catch (error) {
//     throw error;
//   }
// };

// const createPing = async (message: string) => {
//   const db = getConnection();
//   try {
//     await getCollection("ping", db);
//     const resx = await db.query({
//       query: 'INSERT { "ping": @message } in ping RETURN NEW',
//       bindVars: { message },
//     });
//     const result = await resx.all();
//     return result;
//   } catch (error) {
//     throw error;
//   } finally {
//     db.close();
//   }
// };
