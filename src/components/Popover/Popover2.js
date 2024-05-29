import React from "react";
import { createPopper } from "@popperjs/core";

const Popover = (props) => {
    const [popoverShow, setPopoverShow] = React.useState(false);
    const btnRef = React.createRef();
    const popoverRef = React.createRef();
    const openTooltip = () => {
        createPopper(btnRef.current, popoverRef.current, {
            placement: "bottom"
        });
        setPopoverShow(true);
        window.analytics.track("Instruct page popover clicked")
    };
    const closeTooltip = () => {
        setPopoverShow(false);
    };
    return (
        <>
            <div className="text-lg leading-relaxed mt-4 mb-2" style={{ borderRadius: "0px" }}
                onClick={
                    () => {
                        // if popover is open, close it
                        if (popoverShow) {
                            closeTooltip()
                        } else {
                            // if popover is closed, open it
                            openTooltip()
                        }
                    }
                }
                // onMouseLeave={closeTooltip}
                ref={btnRef}
            >
                <div>
                    <p
                        className="font-bold opacity-75 font-semibold px-3 mb-0 rounded-t-lg text-center text-xsm"
                    >
                        {/* Examples, Capabilites & Limitations
                        <br /> */}
                        <i className="pl-2 fas fa-info-circle text-sm"></i>
                    </p>
                    <div
                        className={
                            (popoverShow ? "" : "hidden ") +
                            "bg-blueGray-100 border-0 m-2  block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg"
                        }
                        ref={popoverRef}
                    >
                        <div className="text-black opacity-75 p-3 mb-0 rounded-t-lg text-center text-xsm">
                            <p className="text-black font-bold opacity-75 font-semibold px-3 mb-0 border-b border-solid border-blueGray-100 rounded-t-lg text-center text-xsm">
                                Thank you to arXiv for use of its open access interoperability
                            </p>
                            <ul style={{ textAlign: "left" }} hidden>
                                <li className="px-3">
                                    <p className="rubik-font">
                                        Constantly check for updates!
                                    </p>
                                </li>
                                {/* <li className="text-black px-3">
                                    <p className="text-black rubik-font">
                                        Writing Emails
                                    </p>
                                </li>
                                <li className="text-black px-3">
                                    <p className="text-black rubik-font">
                                        Answering Complex Questions
                                    </p>
                                </li>
                                <li className="text-black px-3">
                                    <p className="text-black rubik-font">
                                        Telling Stories
                                    </p>
                                </li> */}
                            </ul>
                            {/* <p className="text-black font-bold opacity-75 font-semibold px-6 mt-3 mb-0 rounded-t-lg text-center text-xsm">
                                However, it is not perfect. It may:
                            </p>
                            <ul style={{ textAlign: "left" }}>
                                <li className="text-black px-3">
                                    <p className="text-black rubik-font">
                                        Make mistakes
                                    </p>
                                </li>
                                <li className="text-black px-3">
                                    <p className="text-black rubik-font">
                                        Not understand what you are saying
                                    </p>
                                </li>
                                <li className="text-black px-3">
                                    <p className="text-black rubik-font">
                                        Not be able to answer your question
                                    </p>
                                </li>
                                <li className="text-black px-3">
                                    <p className="text-black rubik-font">
                                        Give Inaccurate Responses
                                    </p>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Popover;