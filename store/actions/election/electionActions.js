import axios from '@/axios';
import web3 from '@/ethereum/web3';
import Election from '@/ethereum/election';
import generateCandidates from '@/utils/generateCandidates';
import {
  startLoading,
  stopLoading,
  showErrorMessages,
  showSuccessMessage
} from '../ui/uiActions';

import {
  SET_CANDIDATES,
  SET_ELECTION,
  SET_VOTERS,
  SET_COMMUNITY_USERS,
  SET_COMMUNITY
} from './actionTypes';

export const setCandidates = candidates => {
  return {
    type: SET_CANDIDATES,
    candidates
  };
};

export const setElection = election => {
  return {
    type: SET_ELECTION,
    election
  };
};

export const setVoters = voters => {
  return {
    type: SET_VOTERS,
    voters
  };
};

export const setCommunityUsers = communityUsers => {
  return {
    type: SET_COMMUNITY_USERS,
    communityUsers
  };
};

export const setCommunity = community => {
  return {
    type: SET_COMMUNITY,
    community
  };
};

export const fetchElection = ({ communityId, electionId }) => {
  return async dispatch => {
    try {
      const { data: communityResponse } = await axios.get(
        `/api/communities/${communityId}`
      );

      const community = communityResponse.value;

      const { data: electionResponse } = await axios.get(
        `/api/elections/${electionId}`
      );

      const election = electionResponse.value;

      const ethElection = await Election(election.blockchainAddress);

      const candidatesCount = await ethElection.methods
        .getCandidatesCount()
        .call();

      const ethCandidates = await Promise.all(
        Array(parseInt(candidatesCount))
          .fill()
          .map((element, index) => {
            return ethElection.methods.candidates(index).call();
          })
      );

      const voters = await election.Users.filter(async user => {
        const isValidUser = await ethElection.methods
          .voters(user.id)
          .call();
        return isValidUser;
      });

      const tempCandidates = election.Candidates;

      const candidates = generateCandidates(ethCandidates, tempCandidates);

      const communityUsers = community.Users.filter(user => {
        return !voters.some(voter => voter.id === user.id);
      });

      dispatch(setElection(election));
      dispatch(setCommunity(community));
      dispatch(setCandidates(candidates));
      dispatch(setVoters(voters));
      dispatch(setCommunityUsers(communityUsers));
    } catch (err) {
      console.log(err.response || err);
    }
  };
};

export const addVoter = (userId, userBlockchainAddress) => {
  return async (dispatch, getState) => {
    // await setTimeout(async () => {
    //   console.log('hi');
    //   dispatch(showErrorMessages(['Successfully added voter to voters list']));
    //   const electionId = getState().election.election.id;
    //   const communityId = getState().election.community.id;
    //   await dispatch(fetchElection({ electionId, communityId }));
    //   dispatch(stopLoading());
    // }, 2000);

    try {
      dispatch(startLoading());
      const {
        id: electionId,
        blockchainAddress: electionBlockchainAddress
      } = getState().election.election;
      const communityId = getState().election.community.id;
      const { data } = await axios.post('/api/conjunctionElections', {
        UserId: userId,
        ElectionId: electionId
      });

      const accounts = await web3.eth.getAccounts();

      const ethElection = await Election(electionBlockchainAddress);

      await ethElection.methods.addVoter(userId).send({
        from: accounts[0]
      });

      await dispatch(fetchElection({ electionId, communityId }));
      dispatch(showSuccessMessage('Successfully add voter to voters list'));
      dispatch(stopLoading());
    } catch (err) {
      dispatch(stopLoading());
      console.log(err);
      if (err.response) {
        console.log(err.response);
      }
      dispatch(showErrorMessages(['Failed to add voter']));
    }
  };
};
