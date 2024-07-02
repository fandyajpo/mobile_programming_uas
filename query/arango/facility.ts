import { query } from "@/lib/arangoDb";
import { IFacility } from "@/types/facility";

type TFacility = Partial<IFacility>;

export const listFacility = async (page: number, limit: number) => {
  try {
    const res = await query(
      `LET data = (
        FOR p IN @@coll
          LIMIT ${page}, ${limit}
        RETURN p
      )
      LET total = (
        FOR p IN @@coll
          COLLECT WITH COUNT INTO length
        return length
      )
      RETURN { total: TO_NUMBER(total), data }
      `,
      { "@coll": "facility" }
    );
    return res?.[0];
  } catch (error) {
    throw error;
  }
};

export const insertFacility = async (data: IFacility) => {
  try {
    const res = await query<IFacility>(
      `INSERT { 
        name: @name,
        category: @category,
      } IN @@coll RETURN NEW
      `,
      { "@coll": "facility", ...data }
    );
    return res?.[0];
  } catch (error) {
    throw error;
  }
};

export const facilityById = async (_key: string) => {
  try {
    const res = await query<TFacility>(
      `FOR u IN @@coll
      FILTER u._key == @_key
      RETURN u
      `,
      { "@coll": "facility", _key }
    );
    return res?.[0];
  } catch (error) {
    throw error;
  }
};

export const updateFacility = async (_key: string, data: TFacility) => {
  try {
    const res = await query<TFacility>(
      `LET f = DOCUMENT(@@coll, @_key)
      FILTER f != null
      UPDATE f WITH { 
        "name": @name,
        "category": @category,
      }
      IN @@coll RETURN NEW
      `,
      { "@coll": "facility", _key, name: data?.name, category: data?.category }
    );
    return res?.[0];
  } catch (error) {
    throw error;
  }
};

export const removeFacility = async (_key: string) => {
  try {
    const res = await query<TFacility>(
      `FOR u IN @@coll
      FILTER u._key == @_key
        REMOVE {
          _key: @_key
        }
      IN @@coll RETURN OLD`,
      { "@coll": "facility", _key }
    );
    return res?.[0];
  } catch (error) {
    throw error;
  }
};
