import {useInfiniteQuery, useQuery} from 'react-query';
import {AxiosError} from 'axios';
import {flatMap} from 'lodash-es';

import {detailAssetApi, listAssetApi} from '~/apis/asset';
import {AssetDetailRequest, AssetDetailResponse} from '~/types/asset';

export const assetKeys = {
  all: ['asset'] as const,
  lists: () => [...assetKeys.all, 'list'] as const,
  details: () => [...assetKeys.all, 'detail'] as const,
  detail: (params: AssetDetailRequest) => [...assetKeys.details(), params] as const,
};

const LIMIT = 20;

export const useAssetList = () => {
  return useInfiniteQuery(
    assetKeys.lists(),
    (context) =>
      listAssetApi({
        cursor: context?.pageParam || null,
        limit: LIMIT,
      }),
    {
      select: ({pages, pageParams}) => ({
        pages: flatMap(pages, ({tokens}) => tokens),
        pageParams,
      }),
      getNextPageParam: ({cursor}) => cursor || false,
    },
  );
};

export const useAssetDetail = (params: AssetDetailRequest) => {
  return useQuery<AssetDetailResponse, AxiosError, AssetDetailResponse>(assetKeys.detail(params), () =>
    detailAssetApi(params),
  );
};
