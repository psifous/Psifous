export default (ethCandidates, tempCandidates) => {
  const candidatesInfo = ethCandidates.reduce((acc, candidate, index) => {
    acc[candidate.id] = {
      name: candidate.communityUsersname,
      voteCount: candidate.voteCount,
      index
    };

    return acc;
  }, {});

  const candidates = tempCandidates.reduce((acc, candidate) => {
    const candidateInfo = candidatesInfo[candidate.id];
    if (candidateInfo) {
      acc.push({
        ...candidate,
        voteCount: candidateInfo.voteCount,
        index: candidateInfo.index
      });
    }
    return acc;
  }, []);

  return candidates;
};
