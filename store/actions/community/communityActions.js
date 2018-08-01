import axios from '@/axios';
import {
  FETCH_COMMUNITIES,
  FETCH_COMMUNITY
} from './actionTypes';

export const setCommunities = communities => {
  return {
    type: FETCH_COMMUNITIES,
    communities
  };
};

export const setCommunity = community => {
  return {
    type: FETCH_COMMUNITY,
    community
  };
};

export const fetchCommunity = (communityId) => {
  return async dispatch => {
    try {
      const { data : communityResponse } = await axios.get(`api/communities/${communityId}`);
      const community = communityResponse.value;
      dispatch(setCommunity(community));
    } catch (err) {
      console.log(err.response || err)
    }
  };
};

export const fetchCommunities = () => {
  return async dispatch => {
    try {
      const { data : communitiesResponse } = await axios.get(`api/communities}`);
      const communities = communitiesResponse.value;
      dispatch(setCommunities(communities));
    } catch (err) {
      console.log(err.response || err)
    }
  };
};