import { useState } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import './copy.css'

export default function InteractCopyUserInfo({ label, value }) {
    const [showPopup, setShowPopup] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 2000); // hide after 2s
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    return (
        <div className="interact-copy-wrapper">
            {/* Clickable info box */}
            <div 
                onClick={handleCopy}
                className=" copy-wrapper cursor-pointer bg-gray-100 hover:bg-gray-200 p-3 rounded-xl w-fit transition"
            >
                <span className="copy-btn font-medium">
                    <ContentCopyIcon sx={{fontSize: '16px', marginRight: '5px'}}/>
                    Copy payment email
                    </span>
            </div>

            {/* Popup feedback */}
            {showPopup && (
                <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-sm px-3 py-1 rounded-lg shadow-lg animate-fade">
                    Copied!
                </div>
            )}

            {/* Add keyframe animation */}
            <style>
                {`
          @keyframes fade {
            0% { opacity: 0; transform: translate(-50%, -5px); }
            20% { opacity: 1; transform: translate(-50%, 0); }
            80% { opacity: 1; transform: translate(-50%, 0); }
            100% { opacity: 0; transform: translate(-50%, -5px); }
          }
          .animate-fade {
            animation: fade 2s ease-in-out forwards;
          }
        `}
            </style>
        </div>
    );
}
