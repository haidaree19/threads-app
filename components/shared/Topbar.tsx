import { SignedIn, SignOutButton, OrganizationSwitcher } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { dark } from "@clerk/themes";

const Header = () => {
    return (
        <nav className="topbar">
            <Link href="/" className="flex items-center gap-2">
                <Image src="/assets/at-symbol.svg" alt="logo" width={32} height={32} className="bg-amber-500 rounded-full p-1" />
                <Image src="/assets/flowww-logo-light.svg" alt="logo" width={90} height={20} />
                {/* <p className="text-heading3-bold text-light-1 max-xs:hidden">Flowww</p> */}
            </Link>
            <div className="flex flex-row items-center gap-2">
                <div className="block md:hidden">
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer items-center justify-center">
                                <Image 
                                    src="/assets/logout.svg"
                                    alt="logout"
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                    {/* <UserButton afterSignOutUrl='/' /> */}
                </div>

                <OrganizationSwitcher 
                    appearance={{
                        baseTheme: dark,
                        elements: {
                            organizationSwitcherTrigger: "py-2 px-4 color-white"
                        }
                    }}
                />
            </div>
        </nav>
    )
}

export default Header;