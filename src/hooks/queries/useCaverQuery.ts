import {useMutation, useQuery} from 'react-query';

import {buyToken, getKaikasAddress, getMyMintRareToken, saleMyToken} from '~/apis/caver';
import {
  CaverTokenBuyRequest,
  CaverTokenBuyResponse,
  CaverTokenListingRequest,
  CaverTokenListingResponse,
} from '~/types/caver';
import {QueryOptions, MutationOptions} from '~/types/react-query';

const caverKeys = {
  all: ['caver'] as const,
  address: () => [...caverKeys.all, 'address'] as const,
  token: () => [...caverKeys.all, 'token'] as const,
};

≈≈
export const useGetMyToken = (userAddress: string) => {
  return useQuery<number, Error, number>(caverKeys.token(), () => getMyMintRareToken(userAddress));
};

export const useBuyToken = (options?: MutationOptions<CaverTokenBuyRequest, CaverTokenBuyResponse, Error>) => {
  return useMutation<CaverTokenBuyResponse, Error, CaverTokenBuyRequest>((req) => buyToken(req), options);
};

export const useListingToken = (
  options?: MutationOptions<CaverTokenListingRequest, CaverTokenListingResponse, Error>,
) => {
  return useMutation<CaverTokenListingResponse, Error, CaverTokenListingRequest>((req) => saleMyToken(req), options);
};
