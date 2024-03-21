import React from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { apiHandler, parseShortenedLink } from "../../../function";
import Table from "../../components/Table";
import ShortenUrl from "../../components/ShortenUrl";
import { ILink } from "../../../types";
import InfoCard from "../../components/InfoCard";
import { Link } from "react-router-dom";

export function MyLinks() {
  const [links, setLinks] = React.useState<ILink[]>([]);
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    apiHandler({
      path: "link/all",
    }).then((res): void => {
      if (res.data) {
        setLinks(res.data.data);
      }
    });
  }, []);


  const tableData = React.useMemo(
    () => {
      return links.map((link, index) => ({
        sn: index + 1,
        "Full Link": link.fullLink,
        "Shortened Link": parseShortenedLink(link.shortenedLink),
        "Clicks": link.clickCount,
        "Action": <Link to={`/dashboard/links/${link._id}`} className="border-[#144ee3] border-2  py-2 px-3 rounded-md text-[#144ee3] hover:bg-[#144ee3]
                 hover:text-white transition-all duration-700 text-lg">
          View
        </Link>
      }))
    }, [links]
  )
  return <DashboardLayout>
    <div className="flex justify-between items-center">
      <h1 className="text-3xl">My Links</h1>
      <button className="border-[#144ee3] border-2  py-3 px-4 rounded-md text-[#144ee3] hover:bg-[#144ee3]
           hover:text-white transition-all duration-700 text-lg" onClick={() => setShowModal(true)} >
        Create Link</button>
    </div>

    <div className="flex flex-wrap gap-10 my-10">
      <InfoCard value="10" title="Total Links" />
      <InfoCard value="10" title="Total Clicks" />
    </div>

    <Table columns={[
      "sn", "Full Link", "Shortened Link", "Clicks", "Action"
    ]} data={tableData} />

    <ShortenUrl show={showModal} onClose={() => setShowModal(false)} />
  </DashboardLayout>;
}
