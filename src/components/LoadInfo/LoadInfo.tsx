import React, {FC} from 'react';
import {isNativeError} from "util/types";
import {commandImg} from "../../images/images";

interface LoadInfoProps {
    title: string,
    body?: string,
    children?: React.ReactNode;
}

export const LoadInfo: FC<LoadInfoProps> = ({children, title, body}) => {
    return (
        <div className="absolute h-screen w-screen">
            <div className="h-full w-full relative">
                <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
                    <h1 className="font-montserratBold text-4xl text-center w-[700px] mb-4">{title}</h1>
                    {body ?
                        <p className="text-2xl text-center w-[700px]">{body}</p>
                        :
                        <div className="flex justify-center items-center z-100">
                            {children}
                        </div>
                    }
                </div>
                <div className="absolute -bottom-2 right-1/2 translate-x-1/2 -translate-y-1/2">
                    <div className="flex items-center justify-center">
                        <div className="flex flex-col items-center justify-center w-[130px]">
                            <img src={commandImg.sofia} alt="" className="mb-2 h-[70px]"/>
                            <h3 className="font-montserratBold">София</h3>
                            <p className="text-[#717171]">team leader</p>
                        </div>
                        <div className="flex flex-col items-center justify-center w-[130px]">
                            <img src={commandImg.stepan} alt="" className="mb-2 h-[70px]"/>
                            <h3 className="font-montserratBold">Степан</h3>
                            <p className="text-[#717171]">frontend</p>
                        </div>
                        <div className="flex flex-col items-center justify-center w-[130px]">
                            <img src={commandImg.denis} alt="" className="mb-2 h-[70px]"/>
                            <h3 className="font-montserratBold">Денис</h3>
                            <p className="text-[#717171]">backend</p>
                        </div>
                        <div className="flex flex-col items-center justify-center w-[130px]">
                            <img src={commandImg.julia} alt="" className="mb-2 h-[70px]"/>
                            <h3 className="font-montserratBold">Юлия</h3>
                            <p className="text-[#717171]">ux/ui</p>
                        </div>
                        <div className="flex flex-col items-center justify-center w-[130px]">
                            <img src={commandImg.aleks} alt="" className="mb-2 h-[70px]"/>
                            <h3 className="font-montserratBold">Александр</h3>
                            <p className="text-[#717171]">ux/ui</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadInfo;