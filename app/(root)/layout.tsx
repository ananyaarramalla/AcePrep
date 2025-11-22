import { ReactNode } from 'react'
import Link from "next/link";
import Image from "next/image";
import {isAuthenticated} from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import { logout } from "@/lib/actions/auth.action";

const RootLayout= async ({ children } : { children: ReactNode })=>  {
    const isUserAuthenticated = await isAuthenticated();

    if(!isUserAuthenticated) redirect('/sign-in');
    return (
        <div className="root-layout">
            <nav className="flex items-center justify-between w-full">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="logo" width={38} height={32} />
                    <h2 className="text-primary-100">AcePrep</h2>
                </Link>

                {/* Logout Button */}
                <form action={logout}>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-full bg-primary-200 text-dark-100 font-semibold hover:bg-primary-200/80 transition"
                    >
                        Logout
                    </button>
                </form>
            </nav>
            {children}
        </div>
    )
}

export default RootLayout