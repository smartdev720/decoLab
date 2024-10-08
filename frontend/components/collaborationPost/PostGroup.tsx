import React from "react";
import Image, { StaticImageData } from "next/image";
import {MdShare} from "react-icons/md";
import { TagBadge } from "../common";

export type PostItem = {
    companyName: string;
    companyAvatar: StaticImageData;
    followers: string;
    views: string;
    content: string;
    tags: string[];
    timeframe: string;
    isClosed: boolean;
}

interface PostGroupProps {
    items: PostItem[];
}

export const PostGroup: React.FC<PostGroupProps> = ({items}) => {
    return (
        <div className="flex flex-col gap-10">
            {items.map((item, index) => (
                <div className="flex flex-col border-dashboard rounded-md p-4" key={index}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-between">
                            <span className="flex flex-col items-center justify-center w-16 h-16 bg-[#0A0B1A] rounded-full">
                                <Image src={item.companyAvatar} alt="logo" />
                            </span>
                            <div className="flex flex-col ml-4">
                                <h1 className="font-poppins font-light text-2xl">{item.companyName}</h1>
                                <p className="font-poppins font-light text-lg">{item.followers} followers</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <h1 className="font-poppins font-thin text-xl text-gray-500 mr-4">{item.views} views</h1>
                            <MdShare size={50} className="text-green-700 cursor-pointer hover:text-green-900 transition-colors duration-200" />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center p-2 mt-4">
                        <p className="font-poppins font-light text-xl leading-8">{item.content}</p>
                    </div>
                    <div className="flex mt-2 p-2">
                        {item.tags.map((tag, index) => (
                            <span className="mr-2"><TagBadge key={index.toString()} name={tag} /></span>
                        ))}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <span className="font-poppins font-light text-lg text-gray-500">Time Frame - {item.timeframe}</span>
                        <span className="font-poppins font-light text-lg text-gray-500">Companies Reached Out - 20</span>
                    </div>
                    <button 
                        className={`flex flex-col items-center justify-center w-full py-4 font-poppins font-light rounded-md mt-4 
                            ${item.isClosed ? 'bg-[#D8D8D8] text-gray-500' : 'bg-green-700 text-white hover:bg-green-900'}`}
                        disabled={item.isClosed}
                    >
                        {item.isClosed ? "Successfully Closed by PrimeXBT" : "Send Collaboration Request"}
                    </button>
                </div>
            ))}
        </div>
    );
}