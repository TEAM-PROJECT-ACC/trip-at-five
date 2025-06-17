import React from 'react';
import './RoomDetailText.style.scss';

const defaultDesc = `[비대면 체크인/아웃]

예약 후 호텔 대표번호로 예약자 성함을 문자 발송하셔야 상세 호실과 비밀번호를 받으실 수 있습니다 (호텔 대표번호: 010-4615-3660)

이용 전 문의 사항 또는 예약 후 문의 사항은 비대면으로 운영되기 때문에 호텔 대표번호로 문자로 남겨주시면 답변 순차적으로 드리고 있습니다

이용에 원할하게끔 숙소 공지사항을 예약 후 보내드리니 참고해주시면 더욱 편하게 이용하실 수 있습니다

[어메니티 안내]

샴푸, 린스, 바디워시, 수건, 조리 가능 식기류 제공

칫솔, 치약, 바디타월, 생수 미제공

[연박 예약 시 유의사항]

2박 이상 예약 시, 객실 상황에 따라 체크아웃 후 재입실 하셔야 하는 경우가 있습니다

이점 유의하시어 예약 부탁드리며, 객실 정비 시간이 필요하여 체크인,체크아웃 시간을 지켜주시기 바랍니다`;

export const RoomDetailText = ({accom}) => {
  return (
    <section className='detail-info'>
      <div className='acc-detail-section__title'>상세정보</div>
      <div className='detail-info__text'>
        {accom && accom.accomDesc
          ? accom.accomDesc
          : defaultDesc}
      </div>
    </section>
  );
};
