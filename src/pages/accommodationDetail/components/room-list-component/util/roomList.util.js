export const getRoomCnt = (roomSq, roomCntList) => {
  const safeList = (roomCntList || []).filter(Boolean); // null 제거
  const matched = safeList.find((item) => item.roomSq === roomSq);
  return matched?.reservedCnt ?? 0;
};
