import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { selectContactList } from '../../../../../services/admin-contact/adminContact.api';
import { loginStateStore } from '../../../../../states/login/loginStore';
import { useAdminSearchStore } from '../../../../../states/admin-search/adminSearchStore';

export const useContactData = () => {
  const { loginInfo } = loginStateStore();
  const [isResAdmin] = useState(() => loginInfo.inqCtgCd === 'RESERVE');
  const { keyword } = useAdminSearchStore();
  // searchKeyword - 예약코드 resCd, 예약자명 resName, 전화번호 resPhone
  const [searchParams, setSearchParams] = useState(() => {
    return {
      totalCount: 0,
      currentPage: 1,
      numOfRows: 10,
      keyword: '',
    };
  });

  const { data } = useQuery({
    queryKey: ['adminContactData', searchParams],
    queryFn: async () => {
      const data = await selectContactList({
        adminSq: loginInfo.adminSq,
        loginInfo,
        searchParams,
      });

      setSearchParams((prev) => {
        return {
          ...prev,
          ...data.pageInfo,
          totalCount: data.totalCount,
        };
      });

      return data;
    },
  });

  const onClickPage = (pageNo) => {
    setSearchParams((prev) => {
      return {
        ...prev,
        currentPage: pageNo,
      };
    });
  };

  const onClickSearchKeyword = () => {
    setSearchParams((prev) => {
      return {
        ...prev,
        keyword,
      };
    });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return {
    isResAdmin,
    searchParams,
    contactList: data?.contactList,
    loginInfo,
    onClickPage,
    onClickSearchKeyword,
  };
};
