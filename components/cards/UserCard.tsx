"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface Props {
    id: string,
    name: string,
    username: string,
    imgUrl: string,
    personType: string,
    isSearchPage: boolean
}

export default function UserCard({
    id,
    name,
    username,
    imgUrl,
    personType,
    isSearchPage
}: Props) {
    const router = useRouter();

    return (
        <article className={`${ isSearchPage && 'px-7 py-4 ' } user-card`}>
            <div className="user-card_avatar">
                <Image 
                    src={imgUrl}
                    alt="logo"
                    width={48}
                    height={48}
                    className="rounded-full object-cover h-12 w-12"
                />
                <div className="flex-1 text-ellipsis">
                    <h4 className="text-base-semibold text-light-1">{name}</h4>
                    <p className="text-small-medium text-gray-1">@{username}</p>
                </div>
            </div>
            <Button className="user-card_btn" onClick={() => router.push(`/profile/${id}`)}>View</Button>
        </article>
    )
}