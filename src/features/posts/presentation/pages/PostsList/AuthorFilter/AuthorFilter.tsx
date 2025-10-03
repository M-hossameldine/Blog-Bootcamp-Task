import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

import type { Author } from '@/features/posts/domain/types';

type AuthorFilterProps = {
  authors: Author[];
  onChange: (authorId: string) => void;
};

export const AuthorFilter = ({ authors, onChange }: AuthorFilterProps) => {
  return (
    <div className="flex items-center gap-1.5 rounded-md cursor-pointer h-[50px]">
      <Label htmlFor="author" className="text-base font-normal">
        Author:
      </Label>

      <Select defaultValue="all" onValueChange={onChange}>
        <SelectTrigger
          id="author"
          className="w-40 !h-[50px] text-base bg-white"
        >
          <SelectValue placeholder="Author" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {authors.map(author => (
            <SelectItem key={author.id} value={author.id.toString()}>
              {author.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
