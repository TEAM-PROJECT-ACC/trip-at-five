import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import './AccomCalendar.style.scss';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const AccomCalendar = ({ ...props }) => {
  const [calendarFlag, setCalendarFlag] = useState(false);
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [tripDay, setTripDay] = useState(1);

  const [state, setState] = useState([
    {
      checkInDate: new Date(),
      checkOutDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);

  const getCheckDate = (start, end) => {
    setCheckIn(start.getMonth() + '.' + start.getDate());
    setCheckOut(end.getMonth() + '.' + end.getDate());
  };

  const calculatorDay = (start, end) => {
    setTripDay(end.getDate() - start.getDate());
  };

  useEffect(() => {
    getCheckDate(state[0].checkInDate, state[0].checkOutDate);
    calculatorDay(state[0].checkInDate, state[0].checkOutDate);
  }, [state]);

  return (
    <div {...props}>
      <div className='calendar-text' onClick={() => setCalendarFlag(!calendarFlag)}>
        <FaCalendarIcon className='calendar-icon' />
        <span>
          {checkIn} {state[0].checkInDate.getDay()} - {checkOut} ({tripDay}박)
        </span>
      </div>
      <div className={`calendar-container ${calendarFlag ? 'visible' : ''}`}>
        {calendarFlag && (
          <DateRange
            editableDateInputs={true}
            onChange={(item) => MdSettingsInputAntenna([item.selection])}
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
