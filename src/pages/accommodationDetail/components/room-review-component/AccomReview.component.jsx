import React, { useState, useRef, useEffect } from 'react';
import {
  ButtonPrimary,
  Modal,
  Pagination,
  StarRating,
  Textarea,
} from '../../../../components';
import { Star } from '../../../../components/star-rating/components/star/Star.component';
import { MdAddPhotoAlternate } from '../../../../assets/icons/ys/index';
import { useDeleteImageInfoStore } from '../../../../states/image-info/imageInfoStore';
import { insertReviewAPI } from '../../../../services/review/reviewService.api';
import '../../accommodationDetail.style.scss';

const MAX_IMAGES = 5;

export const AccomReview = ({ resCd, memNo, accomSq }) => {
  // 이미지

  const imageState = useDeleteImageInfoStore((state) => state);
  const imageInputRef = useRef();

  const [isModalOpen, setModalOpen] = useState(false);
  const [starRateScore, setStarRateScore] = useState(0);

  const [content, setContent] = useState('');

  const canWriteReview = !!memNo && !!resCd;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, MAX_IMAGES);
    imageState.setImages(files);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('revSco', starRateScore);
    formData.append('ckRevSt', 'PUBLIC');
    formData.append('revCont', content);
    formData.append('resCd', resCd);
    formData.append('memNo', memNo);
    formData.append('accomSq', accomSq);

    imageState.images.forEach((img) => formData.append('images', img));
    try {
      const response = await insertReviewAPI(formData);
      if (response.status === 200) {
        alert('리뷰가 등록되었습니다!');
        imageState.resetImageInfoStore();
        setModalOpen(false);
      }
    } catch {
      alert('리뷰 등록 실패');
    }
  };

  useEffect(() => {
    console.log('memNo : ' + memNo);
    console.log('resCd : ' + resCd);
  }, []);
  return (
    <section className='review-section'>
      <div className='review-section__header'>
        <div className='acc-detail-section__title'>이용 후기</div>
        <div className='review-star'>
          <Star className='review-star-style' />
          3.0
        </div>
        <button
          onClick={() => setModalOpen(true)}
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
              imageState.resetImageInfoStore();
              setContent('');
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
                onClick={setStarRateScore}
                className='accom-modal-stars'
              />
              <div className='accom-modal-body'>
                <Textarea
                  placeholder={'후기를 작성해주세요'}
                  className='accom-modal-textbox'
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                />
                <div className='accom-modal-img'>
                  <input
                    type='file'
                    accept='image/*'
                    multiple
                    style={{ display: 'none' }}
                    ref={imageInputRef}
                    onChange={handleImageChange}
                  />
                  <MdAddPhotoAlternate
                    className='accom-modal-img-icon'
                    onClick={() => imageInputRef.current.click()}
                  />
                  {imageState.images.map((img, idx) => (
                    <div
                      key={idx}
                      style={{ position: 'relative' }}
                    >
                      <img
                        src={URL.createObjectURL(img)}
                        alt='preview'
                        width={48}
                        height={48}
                        style={{ objectFit: 'cover', borderRadius: 8 }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <ButtonPrimary
                className='accom-modal-btn-inner'
                onClick={handleSubmit}
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
