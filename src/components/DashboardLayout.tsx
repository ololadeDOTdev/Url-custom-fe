import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

export function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="w-full h-screen flex">
      <div className="h-sccreen flex-shrink-0 w-80 bg-[#144ee3] shadow-lg p-5">
        <h2 className="text-white text-2xl flex items-center gap-3">
          <Link to="/" className="text-white"><IoMdArrowRoundBack className="text-white w-5 h-5"/></Link>
          Dashboard</h2>

        <ul className="grid gap-3 mt-5 w-full">
          <li className="w-full">
            <Link
              className="text-white block font-semibold w-full p-2 hover:bg-white hover:text-[#144ee3] transition-all duration-700 rounded-md"
              to="/dashboard"
            >
              Overview
            </Link>
          </li>
          <li className="w-full">
            <Link
              className="text-white block font-semibold w-full p-2 hover:bg-white hover:text-[#144ee3] transition-all duration-700 rounded-md"
              to="/dashboard/links"
            >
              My Links
            </Link>
          </li>
        </ul>
      </div>
      <main className="w-full h-screen p-5">{children}</main>
    </div>
  );
}
