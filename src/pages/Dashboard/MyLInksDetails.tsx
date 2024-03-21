import React from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { Link, useParams } from "react-router-dom";
import { ILink } from "../../../types";
import Spinner from "../../components/Spinner";
import { apiHandler, parseShortenedLink } from "../../../function";
import InfoCard from "../../components/InfoCard";
import QRcode from "../../components/QRcode";

export function MyLinksDetails() {
    const { id } = useParams();
    const [link, setLink] = React.useState<ILink>();
    const [aggregate, setAggregate] = React.useState<{
        _id: string,
        count: string
    }[]>([]);
    const [isLoading, setIsLoading] = React.useState(false)


    React.useEffect(
        () => {
            setIsLoading(true)
            apiHandler({
                path: "link/aggregate/" + id,
            })
                .then(res => {
                    if (res.data) {
                        setLink(res.data.data.link)
                        setAggregate(res.data.data.historyAggregated)
                    }
                })
                .finally(() => setIsLoading(false))

        }, []
    )
    return <DashboardLayout>
        <div className="flex justify-between items-center">
            <h1 className="text-3xl">My Links</h1>
            <Link to={`/dashboard`} className="border-[#144ee3] border-2  py-2 px-3 rounded-md text-[#144ee3] hover:bg-[#144ee3]
                 hover:text-white transition-all duration-700 text-lg">
          Go Back
        </Link>
        </div>
        <h2 className="text-3xl mt-5">Shortened Link: <a className="underline text-blue-500" target="_blank" rel="noreferrer" href={parseShortenedLink(link?.shortenedLink || "")}>{parseShortenedLink(link?.shortenedLink || "")}</a></h2>
        <h2 className="text-3xl mt-5">Actual Link: <a className="underline text-blue-500" target="_blank" rel="noreferrer" href={link?.fullLink}>{link?.fullLink}</a></h2>

        <h2 className="text-3xl mt-5">Clicks: {link?.clickCount}</h2>
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-center">
            <div className="qr-code-container align-middle">
                <QRcode qrUrl={parseShortenedLink(link?.shortenedLink || "")} />
            </div>
        </div>
        <h1 className="text-2xl mt-8">Referrers Breakdown</h1>
        <div className="flex flex-wrap">
            {
                aggregate.map(
                    agg => <InfoCard title={agg._id} value={agg.count} />
                )
            }
        </div>
        <Spinner isLoading={isLoading} />
    </DashboardLayout>;
}