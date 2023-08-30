"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { CommentValidation } from "@/lib/validations/thread";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";

interface Props {
    threadId: string,
    currentUserImg: string,
    currentUserId: string
}

export default function Comment({ threadId, currentUserImg, currentUserId }: Props) {
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm<z.infer<typeof CommentValidation>>({
        defaultValues: {
            thread: ''
        }
    });

    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        await addCommentToThread(
            threadId,
            values.thread,
            JSON.parse(currentUserId),
            pathname
        );

        form.reset();
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="comment-form"
            >
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className="flex w-full items-center flex-row gap-3">
                            <FormLabel className="text-base-semibold text-light-2">
                                <Image 
                                    src={currentUserImg} 
                                    alt="Profile image"
                                    width={48}
                                    height={48}
                                    className="block rounded-full object-cover" 
                                />
                            </FormLabel>
                            <FormControl className="border-none bg-transparent mt-0">
                                <Input
                                    type="text"
                                    placeholder="Comment..."
                                    className="no-focus text-light-1 outline-none mt-0"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-primary-500">Reply</Button>
            </form>
        </Form>
    )
}