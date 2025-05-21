import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import './AccomCalendar.style.scss';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { FaCalendar } from '../../../assets/icons/index';
import { useAccomSearchStore } from '../../../states';

let startDateText = '';
let endDateText = '';

const AccomCalendar = ({ ...props }) => {
  const { checkIn, checkOut, tripDay } = useAccomSearchStore((state) => state);
  const { setCheckInState, setCheckOutState, setTripDayState, resetState } = useAccomSearchStore((state) => state.actions);

  const [calendarFlag, setCalendarFlag] = useState(false);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);

  useEffect(() => {
    const start = state[0].startDate;
    const end = state[0].endDate;

    if (end && start && end.getTime() !== start.getTime()) {
      startDateText = `${start.getMonth() + 1}.${start.getDate()}`;
      endDateText = `${end.getMonth() + 1}.${end.getDate()}`;

      let checkInDate = start.getFullYear() + '.' + startDateText;
      let checkOutDate = end.getFullYear() + '.' + endDateText;

      setCheckInState(checkInDate);
      setCheckOutState(checkOutDate);

      const diffTime = end.getTime() - start.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      if (diffDays <= 0) {
        resetState();
      } else {
        setTripDayState(diffDays);
      }
    }
  }, [state[0].endDate]);

  const dateHandler = (item) => {
    setState(item);
  };

  const dayHandler = (day) => {
    switch (day) {
      case 0:
        return '일';
      case 1:
        return '월';
      case 2:
        return '화';
      case 3:
        return '수';
      case 4:
        return '목';
      case 5:
        return '금';
      case 6:
        return '토';
      default:
        return '';
    }
  };

  return (
    <div {...props}>
      <div className='calendar-text' onClick={() => setCalendarFlag(!calendarFlag)}>
        <FaCalendar className='calendar-icon' />
        <span>
          {startDateText} {dayHandler(state[0].startDate.getDay())} ~ {endDateText} {dayHandler(state[0].endDate.getDay())} ({tripDay}박)
        </span>
      </div>
      <div className={`calendar__container ${calendarFlag ? 'visible' : ''}`}>
        {calendarFlag && (
          <DateRange
            editableDateInputs={true}
            minDate={new Date()}
            onChange={(item) => dateHandler([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
            months={2}
            direction='horizontal'
          />
        )}
      </div>
    </div>
  );
};

export default AccomCalendar;
