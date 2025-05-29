import { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import { useAccomSearchStore } from '../../../states';
import { formatDate } from '../../../utils/formatDate/formatDate';
import { FaCalendar } from '../../../assets/icons/index';
import './AccomCalendar.style.scss';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const AccomCalendar = ({ ...props }) => {
  const { checkIn, checkOut, tripDay } = useAccomSearchStore((state) => state);
  const { setCheckInState, setCheckOutState, setTripDayState, resetState } =
    useAccomSearchStore((state) => state);

  const [calendarFlag, setCalendarFlag] = useState(false);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);

  const dateHandler = (item) => {
    setState(item);
  };

  useEffect(() => {
    const start = state[0].startDate;
    const end = state[0].endDate;

    if (end && start && end.getTime() !== start.getTime()) {
      setCheckInState(formatDate(start));
      setCheckOutState(formatDate(end));

      const diffTime = end.getTime() - start.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      if (diffDays <= 0) {
        resetState();
      } else {
        setTripDayState(diffDays);
      }
    }
  }, [state[0].endDate]);

  return (
    <div {...props}>
      <div
        className='calendar-text'
        onClick={() => setCalendarFlag(!calendarFlag)}
      >
        <FaCalendar className='calendar-icon' />
        <span>
          {checkIn?.substring(5)} ~ {checkOut?.substring(5)} ({tripDay}박)
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
