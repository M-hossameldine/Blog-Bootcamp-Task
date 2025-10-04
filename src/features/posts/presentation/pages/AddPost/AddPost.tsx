/* eslint-disable */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  useAddPostMutation,
  useGetAuthorsQuery,
} from '@/features/posts/data/remote/PostsApis';

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
import { toast } from 'sonner';

import { postsConfig } from '@/core/AppRoutes/PostsRoutes';
import { NotebookPen, AlertCircle, Check } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(1, 'Post title is required').trim(),
  body: z.string().min(1, 'Post body is required').trim(),
  author: z.string().min(1, 'Please select an author for this post'),
});

type FormSchemaType = z.infer<typeof formSchema>;

export const AddPost = () => {
  const [addPost] = useAddPostMutation();
  const { data: authors } = useGetAuthorsQuery(undefined);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      body: '',
      author: '',
    } satisfies FormSchemaType,
  });

  const onSubmit = async (values: FormSchemaType) => {
    setHasError(false);

    const result = await addPost({
      title: values.title,
      body: values.body,
      userId: values.author,
    });

    if (result && !result.error) {
      toast(
        <p className="flex items-center gap-2.5">
          <Check className="size-4 text-green-600" /> A new post has been
          successfully created!
        </p>
      );

      setTimeout(() => {
        void navigate(postsConfig.postsList.path());
      }, 500);
    } else {
      setHasError(true);
    }
  };

  return (
    <Card className="bg-white/60 backdrop-blur-lg p-0 gap-0 text-start overflow-hidden">
      <CardHeader className="px-4 py-4.5 bg-white">
        <CardTitle className="flex items-center gap-2.5 text-xl font-semibold ">
          <NotebookPen className="size-5.5" />
          Create a New Post
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="p-6 bg-white rounded-xl">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-11.5 text-start"
            >
              <div className="flex flex-col gap-6">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black!">Title</FormLabel>
                      <FormControl className="p-4 h-12 border-none bg-black/10">
                        <Input placeholder="Enter post title" {...field} />
                      </FormControl>
                      {form.formState.errors.title && (
                        <div className="flex items-center gap-1 text-destructive text-sm">
                          <AlertCircle className="size-4" />
                          <FormMessage />
                        </div>
                      )}
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
                          className="resize-none p-4 h-32 border-none bg-black/10"
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.body && (
                        <div className="flex items-center gap-1 text-destructive text-sm">
                          <AlertCircle className="size-4" />
                          <FormMessage />
                        </div>
                      )}
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="p-4 h-12! border-none bg-black/10 w-full text-base">
                            <SelectValue placeholder="Select Author" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {authors?.map(author => (
                            <SelectItem
                              key={author.id}
                              value={author.id.toString()}
                            >
                              {author.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.author && (
                        <div className="flex items-center gap-1 text-destructive text-sm">
                          <AlertCircle className="size-4" />
                          <FormMessage />
                        </div>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              {hasError && (
                <div className="flex items-center justify-center gap-1 px-2.5 py-4 text-destructive text-sm border rounded-sm text-center border-[#D00000] bg-[#FFEEEE]">
                  <AlertCircle className="size-4" />
                  <p> Internal Server Error</p>
                </div>
              )}
              {/* Submit */}
              <Button
                type="submit"
                className="ml-auto max-w-[400px] w-full bg-black text-white cursor-pointer"
              >
                Create Post
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddPost;
