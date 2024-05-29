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
        window.analytics.track("Clicked landing page popover")
    };
    const closeTooltip = () => {
        setPopoverShow(false);
    };
    return (
        <>
            <div className="mt-2 text-sm text-white rubik-font bg-gray-700 px-2 py-4 shadow-lg" style={{ borderRadius: "4px" }}
                onMouseEnter={openTooltip}
                onMouseLeave={closeTooltip}
                ref={btnRef}
            >
                <div>
                    {props.question}
                    <i className="pl-2 fas fa-arrow-right text-sm text-white"></i>
                    <div
                        className={
                            (popoverShow ? "" : "hidden ") +
                            "bg-blueGray-100 border-0 m-2  block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg"
                        }
                        ref={popoverRef}
                    >
                        <div>
                            {props.answer_type === "study notes" && (
                                <div className="p-2 m-2">
                                    <p className="text-black opacity-75 font-semibold p-3 mb-0 border-b border-solid border-blueGray-100 uppercase rounded-t-lg text-center text-2xl">
                                        Study Notes on {props.question}
                                    </p>
                                    {
                                        props.answer.map((item, index) => {
                                            return (
                                                <div className="text-black p-3" key={index}>
                                                    <p className="text-black rubik-font">
                                                        {index + 1}. {item}
                                                    </p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )}
                            {props.answer_type === "essay" && (
                                <div className="p-2 m-2">
                                    <p className="text-black opacity-75 font-semibold p-3 mb-0 border-b border-solid border-blueGray-100 uppercase rounded-t-lg text-center text-2xl">
                                        {props.question}
                                    </p>
                                    <div className="text-black text-2xl text-center">
                                        Essay Introduction
                                    </div>
                                    <div className="text-black p-3">
                                        The Internet has been one of the most revolutionary inventions of modern times. It has changed the way people communicate, access information, conduct business, and even entertain themselves. It has revolutionized the way we learn, shop, and even play. The history of the internet is a fascinating story of how technology has changed the way we live and interact. The internet was first developed in the 1960s by the United States military to facilitate communication between two computers. This was known as the ARPANET or Advanced Research Projects Agency Network. After the ARPANET was developed, the internet began to spread around the world, and the World Wide Web was developed in 1989. This allowed for the sharing of information and data across networks. Since then, the internet has grown exponentially and is now used by millions of people around the world. It has become an integral part of our lives, and its effects have been seen in almost every aspect of life. From shopping and banking to education and entertainment, the internet has changed the way we interact with each other and the world around us. In this essay, we will explore the history of the internet and its development over the years.
                                    </div>
                                    <div className="text-black text-2xl text-center">
                                        Essay Body
                                    </div>
                                    <div className="text-black p-3">
                                        <p className="p-3">
                                            1. Pre-Internet Computing and Telecommunications
                                            Before the Internet, computers were used mainly for scientific and military purposes. The first computers were large, expensive and required a team of specialists to operate. Telecommunications, on the other hand, dated back to the 19th century. The telephone and telegraph were used for personal and business communication, and radio and television for broadcasting news and entertainment. In the late 1950s, the United States Department of Defense created the Advanced Research Projects Agency (ARPA) to develop and test new technologies. ARPA began to develop the first computer networks, which allowed computers to communicate directly with each other. These networks, known as “ARPANET”, were the first steps towards the development of the Internet. In the 1970s, the development of email and the first “bulletin board systems” (BBS) allowed people to communicate with each other over the telephone network. These systems were primitive compared to today’s standards, but they were the first steps towards a global communication network. In the late 1980s, the development of the World Wide Web (WWW) allowed users to access and exchange information over the Internet.
                                        </p>
                                        <p className="p-3">
                                            2. The Birth of the Internet
                                            The Internet as we know it today was born in the early 1990s, but the development of the technology that would eventually become the Internet began in the late 1960s. The Advanced Research Projects Agency (ARPA) was established in the United States in 1958, with the purpose of funding research projects that would have a long-term impact on the nation’s defense capabilities. It was ARPA that undertook the project that would eventually become the Internet. The idea behind ARPA’s work was to create a network of computers that could communicate with one another and share information across vast distances. This was a major undertaking, as the only computers that existed at the time were very large and expensive mainframes. The first step was to create a network of computers that could communicate with each other. This was accomplished in 1969 with the launch of ARPANET, the first computer network designed for the purpose of exchanging information. Once the network was in place, the next step was to create a set of tools and protocols to allow users to access and share data. This was accomplished through the development of the Transmission Control Protocol (TCP) and the Internet Protocol (IP).
                                        </p>
                                    </div>
                                </div>
                            )}
                            {props.answer_type === "explanation" && (
                                <div className="p-2 m-2">
                                    <p className="text-black opacity-75 font-semibold p-3 mb-0 border-b border-solid border-blueGray-100 uppercase rounded-t-lg text-center text-2xl">
                                        Explanation of {props.question}
                                    </p>
                                    <div className="text-black p-3">
                                        {props.answer}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Popover;