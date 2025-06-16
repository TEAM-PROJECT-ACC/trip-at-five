import React, { useEffect, useState, useRef, useMemo } from 'react';
import {
  ButtonPrimary,
  Modal,
  Pagination,
  StarRating,
  Textarea,
} from '../../../../components';
import { StarList } from '../../../../components/star-rating/components/star-list/StarList.component';
import { MdAddPhotoAlternate } from '../../../../assets/icons/ys/index';
import { useDeleteImageInfoStore } from '../../../../states/image-info/imageInfoStore';
import { insertReviewAPI } from '../../../../services/review/reviewService.api';
import {
  getAccomReviewListAPI,
  getAccomReviewAverageScoreAPI,
} from '../../../../services/review/reviewService.api';
import '../../accommodationDetail.style.scss';
import './AccomReview.style.scss';
import { Star } from '../../../../components/star-rating/components/star/Star.component';
import { VITE_SERVER_BASE_URL } from '../../../../../env.config';

const MAX_IMAGES = 5;

export const AccomReview = ({ resCd, memNo, accomSq, onReviewSubmitted }) => {
  const imageState = useDeleteImageInfoStore((state) => state);
  const imageInputRef = useRef();

  const [reviewList, setReviewList] = useState({ list: [], count: 0 });
  const [isModalOpen, setModalOpen] = useState(false);
  const [starRateScore, setStarRateScore] = useState(0);
  const [content, setContent] = useState('');

  const reviewArr = Array.isArray(reviewList.list) ? reviewList.list : [];

  const [currentPage, setCurrentPage] = useState(1);
  // 별점 평균
  const averageScore = useMemo(() => {
    if (!reviewArr.length) return 0;
    const sum = reviewArr.reduce((acc, cur) => acc + (cur.revSco || 0), 0);
    return sum / reviewArr.length;
  }, [reviewArr]);

  useEffect(() => {
    if (accomSq) {
      getAccomReviewListAPI(accomSq).then((res) => setReviewList(res));
      getAccomReviewAverageScoreAPI(accomSq);
    }
  }, [accomSq]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // 현재 이미지 목록
    const current = imageState.images || [];
    // 누적해서 최대 5개만
    const next = [...current, ...files].slice(0, MAX_IMAGES);
    imageState.setImages(next);
    // 같은 파일
    imageInputRef.current.value = '';
  };

  const handleOpenModal = () => {
    if (!resCd) {
      alert('예약 이력이 있는 회원만 후기 작성 가능합니다.');
      return;
    }
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!starRateScore || !content.trim()) {
      alert('별점과 후기를 모두 입력해주세요.');
      return;
    }
    const formData = new FormData();
    formData.append('revSco', starRateScore);
    formData.append('ckRevSt', 'PUBLIC');
    formData.append('revCont', content);
    formData.append('resCd', resCd);
    formData.append('memNo', memNo);
    formData.append('accomSq', accomSq);

    if (imageState.images && imageState.images.length > 0) {
      imageState.images.forEach((img) => formData.append('images', img));
    }

    try {
      const response = await insertReviewAPI(formData);
      if (response.status === 200) {
        alert('리뷰 등록 성공!');
        setModalOpen(false);
        setContent('');
        setStarRateScore(0);
        imageState.resetImageInfoStore();
        getAccomReviewListAPI(accomSq).then((res) => setReviewList(res));
        if (typeof onReviewSubmitted === 'function') {
          onReviewSubmitted();
        }
      } else {
        alert('리뷰 등록 실패!');
      }
    } catch (err) {
      alert('리뷰 등록 실패!');
    }
  };

  const reviewCount = reviewList.count || 0;

  const onClickReviewHandler = (pageNo) => {
    setCurrentPage(pageNo);
  };
  return (
    <section className='review-section'>
      <div className='review-section__header'>
        <span className='acc-detail-section__title'>
          이용 후기{' '}
          <span className='review-start-one'>
            <Star className='star-size-one' />
          </span>
          <span className='star-number-text'>
            {averageScore ? averageScore.toFixed(1) : '0.0'}
          </span>
        </span>
        <button
          onClick={handleOpenModal}
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
              setStarRateScore(0);
            }}
          >
            <div className='accom-modal-container'>
              <div className='accom-modal-title'>
                이번 여행은 어떠셨습니까?
                <br />
                여행에 대한 짧은 후기를 남겨주세요.
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
                <div className='accom-modal-img-list'>
                  {imageState.images &&
                    imageState.images.slice(0, MAX_IMAGES).map((img, idx) => (
                      <div
                        key={idx}
                        className='accom-modal-img-thumb'
                      >
                        <img
                          src={URL.createObjectURL(img)}
                          alt='preview'
                          className='accom-modal-thumb-img'
                        />
                        <button
                          type='button'
                          className='remove-thumb-btn'
                          onClick={() => {
                            imageState.setImages([
                              ...imageState.images.slice(0, idx),
                              ...imageState.images.slice(idx + 1),
                            ]);
                          }}
                          aria-label='이미지 삭제'
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  {imageState.images.length < MAX_IMAGES && (
                    <>
                      <MdAddPhotoAlternate
                        className='accom-modal-img-icon'
                        onClick={() => imageInputRef.current.click()}
                      />
                      <input
                        type='file'
                        accept='image/*'
                        multiple
                        style={{ display: 'none' }}
                        ref={imageInputRef}
                        onChange={handleImageChange}
                      />
                    </>
                  )}
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
      <div>
        {reviewArr.length === 0 ? (
          <div className='noReviewYet'>아직 등록된 후기가 없습니다.</div>
        ) : (
          reviewArr.map((review, idx) => (
            <div
              key={review.revSq || idx}
              className='review-card'
            >
              <div className='review-item-row'>
                <div className='review-img-list'>
                  {[
                    ...(review.imageList?.slice(0, 5) || []),
                    ...Array(5 - (review.imageList?.length || 0)).fill(null),
                  ].map((img, imgIdx) => (
                    <img
                      key={img ? img.revImgSq || imgIdx : `alt-img-${imgIdx}`}
                      src={
                        img && img.revImgPathName
                          ? `${VITE_SERVER_BASE_URL}${img.revImgPathName}`
                          : '/assets/images/alternative-images/alternative-image.png'
                      }
                      alt='리뷰이미지'
                      className='review-thumb-img'
                    />
                  ))}
                </div>
                <div className='review-content-area'>
                  <div className='review-row'>
                    <span className='nickname'>{review.memNick}</span>
                    <StarRating
                      RateStar
                      className='review-stars'
                      score={review.revSco}
                      starList={Array(5).fill(0)}
                      starCount={5}
                      isDisabled={true}
                    />
                  </div>
                  <div className='review-desc'>{review.revCont}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Pagination
        className='review-pagination'
        totalCount={reviewArr.length}
        pageLength={5}
        currentPage={currentPage}
        numOfRows={5}
        useMoveToEnd={true}
        onClick={onClickReviewHandler}
      />
    </section>
  );
};
