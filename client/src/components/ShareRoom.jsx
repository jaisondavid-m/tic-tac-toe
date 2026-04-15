import React from "react"
import {QRCode} from "react-qr-code"

function ShareRoom({ roomLink , copied , showQR , copyRoomLink , setShowQR }) {
    return (
        <div className="mb-4 bg-gray-50 border border-gray-200 rounded-2xl p-4">
            <h2 className="text-lg font-bold text-gray-800 mb-3">
                Share Room
            </h2>
            <div className="flex gap-2">
                <button
                    onClick={copyRoomLink}
                    className="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:scale-[1.02] transition"
                >
                    Copy Link
                </button>
                <button
                    onClick={() => setShowQR(!showQR)}
                    className="w-full bg-violet-600 text-white py-3 rounded-2xl font-semibold hover:scale-[1.02] transition-opacity"
                >
                    {showQR ? "Hide QR" : "QR Code"}
                </button>
            </div>
            {copied && (
                <div className="mt-3 bg-green-100 text-green-700 py-2 rounded-xl text-sm font-semibold">
                    Link Copied Successfully
                </div>
            )}
            {showQR && (
                <div className="mt-4 bg-white p-4 rounded-2xl flex flex-col items-center">
                    <QRCode value={roomLink} size={180} />
                    <p className="text-xs text-gray-500 mt-3 break-all">{roomLink}</p>
                </div>
            )}
        </div>
    )
}

export default ShareRoom