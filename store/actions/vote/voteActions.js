import { CANDIDATE_CHECKED } from './actionTypes';

export const checkCandidateSuccess = index => {
  return {
    type: CANDIDATE_CHECKED,
    index
  };
};

export const selectCandidate = index => {
  return dispatch => {
    dispatch(checkCandidateSuccess(index));
  };
};
