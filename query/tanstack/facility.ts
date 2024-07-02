import { queryClient } from "@/components/provider/tQuery";
import { fetcher } from "@/lib/fetcher";
import { IFacility } from "@/types/facility";
import { useInfiniteQuery, useQuery, useMutation } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";

export const useInfiniteFacility = () => {
  const queryKey = ["facility_infinite"];
  const queryFn = async ({ pageParam = 1 }) => {
    const result = await fetcher(`api/facility`, {
      method: "GET",
      params: {
        page: Number(pageParam),
        limit: 10,
      },
    });
    return result?.data?.data;
  };
  return useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      console.log("pages", lastPage.data?.length);
      if (lastPage.data?.length < 10) return undefined;
      return pages?.length + 1;
    },
  });
};

export const useFacility = () => {
  const queryKey = ["facility"];
  const queryFn = async () => {
    const result = await fetcher("api/facility", { method: "GET" });

    return result.data?.data;
  };
  return useQuery({
    queryKey,
    queryFn,
  });
};

export const useFacilityById = () => {
  const params = useLocalSearchParams();
  const _key = params?._key;
  const queryKey = ["facility_by_id", _key];
  const queryFn = async (): Promise<IFacility> => {
    const result = await fetcher(`api/facility/${_key}`, { method: "GET" });
    return result.data?.data;
  };

  return useQuery({
    queryKey,
    queryFn,
  });
};

export const useInsertFacility = () => {
  const navigation = useNavigation();
  const mutationKey = ["facility_insert"];
  const mutationFn = async (data: IFacility) => {
    return await fetcher("api/facility", {
      method: "POST",
      data: JSON.stringify(data),
    });
  };
  return useMutation({
    mutationKey,
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facility_infinite"] });
      return navigation.goBack();
    },
  });
};

export const useUpdateFacility = () => {
  const params = useLocalSearchParams();
  const _key = params?._key;
  const navigation = useNavigation();
  const mutationKey = ["facility_update"];
  const mutationFn = async (data: IFacility) => {
    return await fetcher(`api/facility/${_key}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
  };
  return useMutation({
    mutationKey,
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facility_infinite"] });
      queryClient.invalidateQueries({ queryKey: ["facility_by_id", _key] });
      return navigation.goBack();
    },
  });
};

export const useRemoveFacility = () => {
  const mutationKey = ["facility_delete"];
  const mutationFn = async (_key: string) => {
    console.log(_key);
    return await fetcher(`api/facility/${_key}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return useMutation({
    mutationKey,
    mutationFn,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["facility_infinite"] }),
  });
};
