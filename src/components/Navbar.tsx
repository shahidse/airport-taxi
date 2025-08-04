"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Menu as MenuIcon,
    Close as CloseIcon,
    Person as PersonIcon,
    DirectionsCarFilled,
    FormatListBulleted,
    Description,
    Login,
    Logout,
    AccountCircle,
    ArrowDropUp,
    ArrowDropDown,
    LocalLibrary,
    Engineering,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const router = useRouter();
    const { token } = useAppSelector((state) => state.users);
    const [accessToken, setToken] = useState<any>('');
    // 🔁 Check token when component mounts
    useEffect(() => {
        setToken(localStorage.getItem("accessToken"));
    }, [token]);

    const handleLogout = () => {
        const promptAns = confirm("Are you sure you want to logout?");
        if (!promptAns) return;
        setUserMenuOpen(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
        document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; samesite=strict";
        setToken(null);
        router.push("/login");
    };

    return (
        <nav className="fixed shadow-md w-full z-20 opacity-90">
            <div className="absolute inset-0 bg-white/60 backdrop-blur-md dark:bg-black/40 -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <Link href="/" className="text-xl font-bold text-primary">
                    AirportTaxi
                </Link>

                <button
                    className="md:hidden text-gray-900 dark:text-white"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <CloseIcon /> : <MenuIcon />}
                </button>

                <ul className="hidden md:flex space-x-6 text-sm text-primary-light font-semibold items-center">
                    <li>
                        <Link href="/guide" className="flex items-center gap-1 text-primary hover:underline">
                            <LocalLibrary fontSize="small" />
                            Guide
                        </Link>
                    </li>
                    <li>
                        <Link href="/services" className="flex items-center gap-2 ">
                            <Engineering fontSize="small" />
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link href="/get-quote" className="flex items-center gap-1 text-accent hover:underline">
                            <Description fontSize="small" />
                            Get Quote
                        </Link>
                    </li>
                    <li>
                        <Link href="/quotes" className="flex items-center gap-1 hover:underline">
                            <FormatListBulleted fontSize="small" />
                            Quotes
                        </Link>
                    </li>
                    <li>
                        <Link href="/bookings" className="flex items-center gap-1 hover:underline">
                            <DirectionsCarFilled fontSize="small" />
                            Bookings
                        </Link>
                    </li>
                    {!accessToken && (
                        <li className="">
                            <Link href="/login" className=" flex items-center gap-1 hover:underline p-[50px]">
                                <Login fontSize="small" />
                                Login
                            </Link>
                        </li>
                    )}
                    {accessToken && (
                        <li className="relative group p-[50px]">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-1 hover:text-accent"
                            >
                                <AccountCircle fontSize="small" />
                                Account
                                {userMenuOpen ? <ArrowDropUp /> : <ArrowDropDown />}
                            </button>
                            {userMenuOpen && (
                                <ul className="absolute right-0 mt-2 bg-white text-sm shadow-md rounded-lg overflow-hidden z-50 min-w-[140px]">
                                    <li>
                                        <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100 text-primary">
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            className="hover:cursor-pointer block px-4 py-2 hover:bg-gray-100 text-red-500"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>
                    )}
                </ul>
            </div>

            {open && (
                <ul className="md:hidden text-gray-800 px-4 pb-4 space-y-2 bg-white/60 backdrop-blur-md dark:bg-black/40">
                    <li>
                        <Link href="/services" className="flex items-center gap-2 text-accent">
                            <Engineering fontSize="small" />
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link href="/get-quote" className="flex items-center gap-2 text-accent">
                            <Description fontSize="small" />
                            Get Quote
                        </Link>
                    </li>
                    <li>
                        <Link href="/quotes" className="flex items-center gap-2">
                            <FormatListBulleted fontSize="small" />
                            Quotes
                        </Link>
                    </li>
                    <li>
                        <Link href="/bookings" className="flex items-center gap-2">
                            <DirectionsCarFilled fontSize="small" />
                            Bookings
                        </Link>
                    </li>
                    {!accessToken && (
                        <li>
                            <Link href="/login" className="flex items-center gap-2">
                                <Login fontSize="small" />
                                Login
                            </Link>
                        </li>
                    )}
                    {accessToken && (
                        <>
                            <li>
                                <Link href="/profile" className="flex items-center gap-2">
                                    <PersonIcon fontSize="small" />
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="flex items-center gap-2 text-red-600">
                                    <Logout fontSize="small" />
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            )}
        </nav>
    );
}
