import { currentUser } from "@clerk/nextjs";
import { fetchUser, fetchUsers, getActivity } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function Page() {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding');

    // Get activities
    const activities = await getActivity(userInfo._id);
    
    return (
        <section>
            <h1 className="head-text mb-10">Activity</h1>
            <section className="mt-10 flex flex-col gap-5">
                {activities.length === 0 ? (
                    <p className="no-result">No activity</p>
                ) : (
                    <>
                        {activities.map((activity) => (
                            <Link href={`/thread/${activity.parentId}`} key={activity._id}>
                                <article className="activity-card">
                                    <Image 
                                        src={activity.author.image}
                                        alt="Profile picture"
                                        width={48}
                                        height={48}
                                        className="rounded-full object-cover"
                                    />
                                    <div>
                                    <p className="text-gray-300 text-base-medium"><span className="mr-1 text-light-1">{activity.author.name}</span>
                                    {" "} replied to your thread</p>
                                    <p className="text-light-3 text-small-regular mt-1">{activity.text}</p>
                                    </div>
                                    <button className="ml-auto px-3 py-2 user-card_btn text-base-medium">View</button>
                                </article>
                            </Link>
                        ))}
                    </>
                )}
            </section>
        </section>
    )
}