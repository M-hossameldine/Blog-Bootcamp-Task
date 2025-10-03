/* eslint-disable */

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  title: z.string().min(1, 'Post title is required').trim(),
  body: z.string().min(1, 'Post body is required').trim(),
  author: z.string().min(1, 'Please select an author for this post'),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function AddPost() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      body: '',
      author: '',
    } satisfies FormSchemaType,
  });

  function onSubmit(values: FormSchemaType) {
    // send data to the API
  }

  return (
    <Card className="bg-white/60 backdrop-blur-lg p-0 gap-0 text-start overflow-hidden">
      <CardHeader className="px-4 py-4.5 bg-white">
        <CardTitle className="text-xl font-semibold ">
          Create a New Post
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 text-start"
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black!">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Body */}
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black!">Body</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter post body"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Author */}
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black!">Author</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Author" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Leanne Graham</SelectItem>
                      <SelectItem value="2">Ervin Howell</SelectItem>
                      <SelectItem value="3">Clementine Bauch</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button type="submit" className="w-full bg-black text-white">
              Create Post
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default AddPost;
