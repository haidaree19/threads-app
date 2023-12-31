import Image from "next/image";
import { profileTabs } from "@/constants";
import ThreadsTab from "@/components/shared/ThreadsTab";
import SearchBar from "@/components/shared/SearchBar";
import { currentUser } from "@clerk/nextjs";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import UserCard from "@/components/cards/UserCard";

export default async function Page() {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding');

    // Fetch users
    const result = await fetchUsers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 25
    });
    
    return (
        <section>
            <h1 className="head-text mb-10">Search</h1>
            <SearchBar routeType='search' />
            <div className="mt-10 flex flex-col gap-5">
                {result.users.length > 0 ? (
                    result.users.map((person) => (
                        <>
                            <UserCard 
                                key={person.id}
                                id={person.id}
                                name={person.name}
                                username={person.username}
                                imgUrl={person.image}
                                personType='User'
                                isSearchPage={true}
                            />
                        </>
                    ))
                ) : (
                    <p className="no-result">No users</p>
                )}
            </div>
        </section>
    )
}