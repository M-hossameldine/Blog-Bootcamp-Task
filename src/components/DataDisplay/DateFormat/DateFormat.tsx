import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

export const DateFormat = ({ dateString }: { dateString: string }) => {
  const formatted = dayjs(dateString).format('ddd, MMMM Do, YYYY'); // Sun, August 24th, 2025
  const iso = dayjs(dateString).toISOString(); // for screen readers & machines

  return (
    <time dateTime={iso} className="text-sm">
      {formatted}
    </time>
  );
};
