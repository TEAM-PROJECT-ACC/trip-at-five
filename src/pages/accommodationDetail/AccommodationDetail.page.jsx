import React from 'react';
import { PageContainer } from '../../components/page-container/PageContainer.component';
import AccommodationHeader from './components/AccommodationHeader.component';
import "./AccommodationDetail.style.scss";

const AccommodationDetail = () => {
  return (
    <PageContainer>
        <section className="accom-header">
        <img
          className="accom-header__image"
        />
        <div className="accom-header__text">
          <h1>서울신라호텔</h1>
          
          <div className="accom-header__price">150,000원 / <p>1박</p></div>
        </div>
        <p className='accom-location'>서울 중구 장충동2가 202</p>
      </section>

      {/* 숙소 정보 카드 */}
      <section className="accom-info">
        <div className="accom-info__map">지도 들어갈 자리</div>
        <div className="accom-info__review">
          <p className="nickname">닉네임</p>
          <div className="stars">⭐⭐⭐⭐⭐</div>
          <p className="comment">
            편안한 분위기와 친절한 직원들 덕분에 즐거운 여행이었습니다. 위치도 좋고 청결해서 다시 방문하고 싶어요.
          </p>
        </div>
        <div className="accom-info__facility">
          <h4>기본 제공 시설</h4>
          <ul>
            <li>WiFi</li>
            <li>욕조</li>
            <li>조식</li>
            <li>헬스장</li>
          </ul>
        </div>
      </section>

      {/* 객실 목록 */}
      <section className="room-list">
        <h2>객실 목록</h2>

        <div className="room-card">
          <div className="room-img"></div>
          <div className="room-info">
            <h3>디럭스 트윈룸</h3>
            <p className="room-price">150,000원</p>
            <p>기준 2인 · 최대 2인 / 객실 2개</p>
            <p>체크인 13:00 · 체크아웃 11:00</p>
            <button className="btn-reserve">객실 예약</button>
          </div>
        </div>

        <div className="room-line"></div>

        <div className="room-card">
          <div className="room-img"></div>
          <div className="room-info">
            <h3>비즈니스 디럭스</h3>
            <p className="room-price">560,000원</p>
            <p>기준 2인 · 최대 4인 / 객실 1개</p>
            <p>체크인 13:00 · 체크아웃 11:00</p>
            <button className="btn-reserve">객실 예약</button>
          </div>
        </div>

        <div className="room-line"></div>

        <div className="room-card">
          <div className="room-img"></div>
          <div className="room-info">
            <h3>비즈니스 디럭스</h3>
            <p className="room-price">560,000원</p>
            <p>기준 2인 · 최대 4인 / 객실 1개</p>
            <p>체크인 13:00 · 체크아웃 11:00</p>
            <button className="btn-reserve">객실 예약</button>
          </div>
        </div>

        <div className="room-line"></div>

        <div className="room-card">
          <div className="room-img"></div>
          <div className="room-info">
            <h3>비즈니스 디럭스</h3>
            <p className="room-price">560,000원</p>
            <p>기준 2인 · 최대 4인 / 객실 1개</p>
            <p>체크인 13:00 · 체크아웃 11:00</p>
            <button className="btn-reserve">객실 예약</button>
          </div>
        </div>
      </section>

      {/* 후기 섹션 */}
      <section className="review-section">
        <h2>이용 후기</h2>

        <div className="review-card">
          <div className="images">
            <div className="img"></div>
            <div className="img"></div>
            <div className="img"></div>
            <div className="img"></div>
            <div className="img"></div>
          </div>
          <br />
          <p className="nickname">코알라잉</p>
          <div className="stars">⭐⭐⭐⭐⭐</div>
          <p className="comment">
            리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수 있었습니다. 직원도 매우 친절했어요!
          </p>
        </div>

        <div className="review-card">
          <div className="images">
            <div className="img"></div>
            <div className="img"></div>
            <div className="img"></div>
            <div className="img"></div>
            <div className="img"></div>
          </div>
          <br />
          <p className="nickname">코알라잉</p>
          <div className="stars">⭐⭐⭐⭐⭐</div>
          <p className="comment">
            리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수 있었습니다. 직원도 매우 친절했어요!
          </p>
        </div>

        <div className="review-card">
          <div className="images">
            <div className="img"></div>
            <div className="img"></div>
            <div className="img"></div>
            <div className="img"></div>
            <div className="img"></div>
          </div>
          <br />
          <p className="nickname">코알라잉</p>
          <div className="stars">⭐⭐⭐⭐⭐</div>
          <p className="comment">
            리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수 있었습니다. 직원도 매우 친절했어요!
          </p>
        </div>

        
      </section>

      {/* 상세 정보 */}
      <section className="detail-info">
        <h2>상세정보</h2>
        <p>
        [사계절 온수풀 해온 HE:ON 정기 점검 안내]<br />
        항상 롯데호텔 제주에 보내주시는 고객님의 성원에 진심으로 감사드립니다<br />
        고객님께 쾌적하고 안락한 여가 공간을 제공해 드리기 위해 해온 수질 관리 및 정기 점검을 시행합니다<br />
        이로 인해 아래 기간 동안 사계절 온수풀 해온 이용이 제한되오니, 이 점 고객님들의 깊은 양해 부탁드립니다<br />
        언제나 최상의 환경에서 고객님을 모실 수 있도록 최선의 노력을 다하겠습니다<br />
        해온 정기 점검 일자 : 2025년 7월 12<br /><br />

        패밀리트윈 (더블+싱글) 마감 시 트윈(싱글+싱글)+엑스트라베드로 제공 될 수 있습니다<br />
        더블 혹은 트윈 객실은 체크인 시 배정되며, 지정이 불가합니다<br />
        자세한 내용은 호텔로 문의바랍니다<br />
        </p>
      </section>
    </PageContainer>
  )
};

export default AccommodationDetail;
