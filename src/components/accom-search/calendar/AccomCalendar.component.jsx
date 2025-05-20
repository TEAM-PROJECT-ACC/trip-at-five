import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import './AccomCalendar.style.scss';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { FaCalendar } from '../../../assets/icons/index';
import { useAccomSearchStore } from '../../../states';

const AccomCalendar = ({ ...props }) => {
  const { keyword, checkIn, checkOut, tripDay, numberOfPeople } = useAccomSearchStore((state) => state);
  const { setKeywordState, setCheckInState, setCheckOutState, setTripDayState, setNumberOfPeople } = useAccomSearchStore((state) => state.actions);

  const [calendarFlag, setCalendarFlag] = useState(false);
  // const [checkInDate, setCheckInDate] = useState();
  // const [checkOutDate, setCheckOutDate] = useState();
  // const [tripDay, setTripDay] = useState(1);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);

  const getCheckDate = (start, end) => {
    setCheckInState(start.getMonth() + '.' + start.getDate());
    setCheckOutState(end.getMonth() + '.' + end.getDate());
  };

  const calculatorDay = (start, end) => {
    setTripDayState(end.getDate() - start.getDate());
  };

  useEffect(() => {
    // console.log('keyword : ' + keyword);
    // console.log('checkIn : ' + checkIn);
    // console.log('checkOut : ' + checkOut);
    // console.log('numberOfPeople : ' + numberOfPeople);

    // console.log(state);
    getCheckDate(state[0].startDate, state[0].endDate);
    calculatorDay(state[0].startDate, state[0].endDate);
  }, [state]);

  return (
    <div {...props}>
      <div className='calendar-text' onClick={() => setCalendarFlag(!calendarFlag)}>
        <FaCalendar className='calendar-icon' />
        <span>
          {checkIn} {state[0].startDate.getDay()} ~ {checkOut} ({tripDay}박)
        </span>
      </div>
      <div className={`calendar-container ${calendarFlag ? 'visible' : ''}`}>
        {calendarFlag && (
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setState([item.selection])}
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
