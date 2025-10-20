import { useState, useMemo } from "react";

export function EventCalendar({ events, selectedDate, onDateSelect, className = "" }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // イベントがある日付を取得
  const eventDates = useMemo(() => {
    const dates = new Set();
    events.forEach(event => {
      const eventDate = new Date(event.date);
      dates.add(eventDate.toDateString());
    });
    return dates;
  }, [events]);

  // カレンダーの日付配列を生成
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  }, [currentMonth]);

  const monthNames = [
    "1月", "2月", "3月", "4月", "5月", "6月",
    "7月", "8月", "9月", "10月", "11月", "12月"
  ];

  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const hasEvent = (date) => {
    return eventDates.has(date.toDateString());
  };

  const isSelected = (date) => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const handleDateClick = (date) => {
    onDateSelect(date);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    onDateSelect(today);
  };

  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {currentMonth.getFullYear()}年{monthNames[currentMonth.getMonth()]}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={goToPreviousMonth}
            className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-100"
          >
            ←
          </button>
          <button
            onClick={goToToday}
            className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-100"
          >
            今日
          </button>
          <button
            onClick={goToNextMonth}
            className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-100"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {dayNames.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
        
        {calendarDays.map((date, index) => {
          const hasEventOnDate = hasEvent(date);
          const isSelectedDate = isSelected(date);
          const isTodayDate = isToday(date);
          const isCurrentMonthDate = isCurrentMonth(date);
          
          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              className={`
                relative h-10 w-full rounded-lg text-sm transition-colors
                ${!isCurrentMonthDate ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'}
                ${isTodayDate ? 'bg-blue-100 font-semibold' : ''}
                ${isSelectedDate ? 'bg-gray-900 text-white' : ''}
                ${hasEventOnDate && !isSelectedDate ? 'bg-yellow-100' : ''}
              `}
            >
              {date.getDate()}
              {hasEventOnDate && (
                <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-yellow-500"></div>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
          <span>イベントあり</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-gray-900"></div>
          <span>選択中</span>
        </div>
      </div>
    </div>
  );
}
