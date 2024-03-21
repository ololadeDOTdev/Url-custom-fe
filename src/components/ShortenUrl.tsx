import React from 'react';
import Modal from './Modal';
import { toast } from 'react-toastify';
import { apiHandler, parseShortenedLink } from '../../function';
import { ILink } from '../../types';
import QRcode from './QRcode';
import ToggleSwitch from './ToogleSwitch';


export default function ShortenUrl({
    show,
    onClose
} : {
    show : boolean,
    onClose : () => void
}) {
    const [shortenUrlData, setShortenUrlDate] = React.useState({
        fullLink: "",
        shortenedLink: ""
    })
    const [modalState, setModalState] = React.useState<"form" | "success">("form");
    const [link, setLink] = React.useState<ILink>()

    const [copied, setCopied] = React.useState(false);
  
    const copyToClipboard = (url : string) => {
      navigator.clipboard.writeText(url)
        .finally(() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        })
    };

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const field = e.target.name;
        const value = e.target.value;

        setShortenUrlDate({
            ...shortenUrlData,
            [field]: value
        })
    }

    async function handleShortenUrl() {
        if (!shortenUrlData.fullLink) {
            toast.error("Pleas fill all the fields");
            return
        }
        const res = await apiHandler({
            path: "link/create",
            body: { ...shortenUrlData },
            method: "POST"
        })

        if (res.error) {
            toast.error("Something wrong happened")
            return
        }

        toast.success("Link Created Successfully")
        setModalState("success")
        setLink(res.data.data)
    }

    return <Modal isOpen={show} onClose={onClose}>
        {
            modalState === "form" && link == undefined ? <div className="flex flex-col gap-5">
                <h1 className="text-2xl">Shorten URL</h1>
                <input onChange={handleChange} type="text"
                    name="fullLink"
                    placeholder="Enter URL"
                    className="border-2 border-[#144ee3] p-2 rounded-md" />
                <input onChange={handleChange}
                    name='shortenedLink'
                    type="text" placeholder="Enter Custom Name"
                    className="border-2 border-[#144ee3] p-2 rounded-md" />
                <button className="bg-[#144ee3] text-white p-2 rounded-md" onClick={handleShortenUrl}>Shorten</button>
            </div> :
                <div className="flex flex-col items-center justify-center gap-6 py-5">
                    <div className="flex flex-col items-center">
                        <p className="text-xl text-black mb-2">Shortened URL:</p>
                        <div className="flex items-center">
                            <a href={parseShortenedLink(link?.shortenedLink || "")} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-500 underline break-all">{parseShortenedLink(link?.shortenedLink || "")}</a>
                            {copied && <span className="text-green-500 ml-2">Copied!</span>}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <ToggleSwitch onChange={() => {}} url={parseShortenedLink(link?.shortenedLink || "")} /> {/* Pass url prop to ToggleSwitch */}
                        <p className="text-sm text-black" onClick={() => copyToClipboard(parseShortenedLink(link?.shortenedLink || ""))}>Copy to Clipboard</p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-center">
                        <div className="qr-code-container align-middle">
                            <QRcode qrUrl={parseShortenedLink(link?.shortenedLink || "")} />
                        </div>
                    </div>
                </div>
        }
    </Modal>
}