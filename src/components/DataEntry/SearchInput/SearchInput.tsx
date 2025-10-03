import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type SearchInputProps = {
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export const SearchInput = ({
  onChange,
  placeholder,
  className = '',
}: SearchInputProps) => {
  return (
    <div
      className={`relative w-full bg-white rounded-3xl overflow-hidden ${className}`}
    >
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="pl-10 text-base h-full"
        placeholder={placeholder}
        onChange={e => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
};
