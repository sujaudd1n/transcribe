"use client";

import { useState } from "react";

import Microphone from "./Microphone"
import Recording from "./Recording"

export default function Container() {
    const [recordings, setRecordings] = useState([]);
    return (
        <div
            className="mx-[10px] md:flex md:justify-between md:gap-[20px]"
        >
            <Microphone
                setRecordings={setRecordings} recordings={recordings}
            />
            <Recording recordings={recordings} setRecordings={setRecordings}
            />
        </div>
    )

}