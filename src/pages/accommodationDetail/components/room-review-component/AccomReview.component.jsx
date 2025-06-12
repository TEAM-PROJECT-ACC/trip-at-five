import React, { useState } from 'react';
import {
  ButtonPrimary,
  Modal,
  Pagination,
  StarRating,
  Textarea,
} from '../../../../components';
import { Star } from '../../../../components/star-rating/components/star/Star.component';
import { MdAddPhotoAlternate } from '../../../../assets/icons/ys/index';
import '../../accommodationDetail.style.scss';

export const AccomReview = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [starRateScore, setStarRateScore] = useState(() => 2.6);

  const modalHandler = () => {
    setModalOpen(true);
  };

  const handleRatingStar = (score) => {
    setStarRateScore(() => score);
  };

  return (
    <section className='review-section'>
      <div className='review-section__header'>
        <div className='acc-detail-section__title'>이용 후기</div>
        <div className='review-star'>
          <Star className='review-star-style' />
          3.0
        </div>
        <button
          onClick={modalHandler}
          className='accom-modal-btn'
        >
          후기 등록
        </button>
        {isModalOpen && (
          <Modal
            className='accom-modal__inner'
            useCloseIcon={true}
            modalHandler={() => {
              setModalOpen(false);
            }}
          >
            <div className='accom-modal-container'>
              <div className='accom-modal-title'>
                이번 여행은 어떠쎴나요?
                <br />
                여행에 대한 짫은 후기를 편하게 남겨주세요
              </div>
              <StarRating
                score={starRateScore}
                onClick={handleRatingStar}
                className='accom-modal-stars'
              />
              <div className='accom-modal-body'>
                <Textarea
                  placeholder={'후기를 작성해주세요'}
                  className='accom-modal-textbox'
                />
                <div
                  type='file'
                  className='accom-modal-img'
                >
                  <MdAddPhotoAlternate className='accom-modal-img-icon' />
                </div>
              </div>
              <ButtonPrimary
                className='accom-modal-btn-inner'
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                등록하기
              </ButtonPrimary>
            </div>
          </Modal>
        )}
      </div>
      <div className='review-card'>
        <div className='images'>
          <div className='img'></div>
          <div className='img'></div>
          <div className='img'></div>
          <div className='img'></div>
          <div className='img'></div>
        </div>
        <br />
        <div className='review-text-box'>
          <span className='nickname'>코알라잉</span>
          <span className='stars'>⭐⭐⭐⭐⭐</span>
          <div className='inner-card-comment'>
            리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
            있었습니다. 직원도 매우 친절했어요!리조트는 멋진 산책로와 수영장이
            있었고 매우 조용해서 힐링할 수 있었습니다. 직원도 매우 친절했어요!
            리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
            있었습니다. 직원도 매우 친절했어요!
          </div>
          <div className='see-more-comment'>더보기</div>
        </div>
      </div>
      <div className='review-card'>
        <div className='images'>
          <div className='img'></div>
          <div className='img'></div>
          <div className='img'></div>
          <div className='img'></div>
          <div className='img'></div>
        </div>
        <br />
        <div className='review-text-box'>
          <span className='nickname'>코알라잉</span>
          <span className='stars'>⭐⭐⭐⭐⭐</span>
          <div className='inner-card-comment'>
            리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
            있었습니다. 직원도 매우 친절했어요!리조트는 멋진 산책로와 수영장이
            있었고 매우 조용해서 힐링할 수 있었습니다. 직원도 매우 친절했어요!
            리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
            있었습니다. 직원도 매우 친절했어요!
          </div>
          <div className='see-more-comment'>더보기</div>
        </div>
      </div>
      <div className='review-card'>
        <div className='images'>
          <div className='img'></div>
          <div className='img'></div>
          <div className='img'></div>
          <div className='img'></div>
          <div className='img'></div>
        </div>
        <br />
        <div className='review-text-box'>
          <span className='nickname'>코알라잉</span>
          <span className='stars'>⭐⭐⭐⭐⭐</span>
          <div className='inner-card-comment'>
            리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
            있었습니다. 직원도 매우 친절했어요!리조트는 멋진 산책로와 수영장이
            있었고 매우 조용해서 힐링할 수 있었습니다. 직원도 매우 친절했어요!
            리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
            있었습니다. 직원도 매우 친절했어요!
          </div>
          <div className='see-more-comment'>더보기</div>
        </div>
      </div>
      <div className='review-card'>
        <div className='images'>
          <div className='img'></div>
          <div className='img'></div>
          <div className='img'></div>
          <div className='img'></div>
          <div className='img'></div>
        </div>
        <br />
        <div className='review-text-box'>
          <span className='nickname'>코알라잉</span>
          <span className='stars'>⭐⭐⭐⭐⭐</span>
          <div className='inner-card-comment'>
            리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
            있었습니다. 직원도 매우 친절했어요!리조트는 멋진 산책로와 수영장이
            있었고 매우 조용해서 힐링할 수 있었습니다. 직원도 매우 친절했어요!
            리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
            있었습니다. 직원도 매우 친절했어요!
          </div>
          <div className='see-more-comment'>더보기</div>
        </div>
      </div>
      <div className='review-card'>
        <div className='images'>
          <div className='img'></div>
          <div className='img'></div>
          <div className='img'></div>
          <div className='img'></div>
          <div className='img'></div>
        </div>
        <br />
        <div className='review-text-box'>
          <span className='nickname'>코알라잉</span>
          <span className='stars'>⭐⭐⭐⭐⭐</span>
          <div className='inner-card-comment'>
            리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
            있었습니다. 직원도 매우 친절했어요!리조트는 멋진 산책로와 수영장이
            있었고 매우 조용해서 힐링할 수 있었습니다. 직원도 매우 친절했어요!
            리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
            있었습니다. 직원도 매우 친절했어요!
          </div>
          <div className='see-more-comment'>더보기</div>
        </div>
      </div>
      <Pagination
        className='accom-review-pagination'
        totalCount={100}
        pageLength={5}
        currentPage={1}
        numOfRows={10}
        useMoveToEnd={true}
      />
    </section>
  );
};
