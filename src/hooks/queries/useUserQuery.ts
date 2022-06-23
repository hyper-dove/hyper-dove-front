import {useInfiniteQuery, useMutation} from 'react-query';
import {AxiosError} from 'axios';
import {flatMap} from 'lodash-es';

import {listUserOwnedApi, reportBuyToken, reportListingToken} from '~/apis/user';
import {UserReportTokenRequest, UserReportTokenResponse} from '~/types/user';

export const userKeys = {
  all: ['user'] as const,
  ownedLists: () => [...userKeys.all, 'owned', 'list'] as const,
};

const LIMIT = 20;

export const useUserOwnedList = (userAddress: string) => {
  return useInfiniteQuery(
    userKeys.ownedLists(),
    (context) =>
      listUserOwnedApi(userAddress, {
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

export const useReportBuyToken = (userAddress: string) => {
  return useMutation<UserReportTokenResponse, AxiosError, UserReportTokenRequest>((data) =>
    reportBuyToken(userAddress, data),
  );
};

export const useReportListingToken = (userAddress: string) => {
  return useMutation<UserReportTokenResponse, AxiosError, UserReportTokenRequest>((data) =>
    reportListingToken(userAddress, data),
  );
};
