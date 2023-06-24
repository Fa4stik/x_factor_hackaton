import React, {FC, useEffect, useRef} from 'react';
import {setGeneral} from "../../store/action-creator/general";
import {useActions} from "../../hooks/useActions/useActions";
import './BG.scss';

interface BgProps {
    children: React.ReactNode;
    bgElement: React.RefObject<HTMLDivElement>
    isAnimation: boolean
}

const Bg: FC<BgProps> = ({children, bgElement, isAnimation}) => {

    return (
        <div className="h-screen w-screen bg-[#F4F4FE] flex overflow-hidden relative">
            <div className="top-[40px] left-[120px] text-[#7E7E7E] text-left absolute">
                <p className="text-[25px]">X-Factor team</p>
                <p>PROFBUH HACKATHON | JUNE</p>
            </div>
            <div className="absolute w-full h-full"
                 ref={bgElement}
            >
                <div className="flex w-full h-full relative z-0">
                    <div className="h-[60vh] w-[60vh] bg-[#0045F880] absolute top-1/2 right-24
                    translate-x-1/2 -translate-y-1/2 z-10 rounded-full"/>
                    {isAnimation ?
                        <div>
                            <div className="h-[80vh] w-[80vh] bg-[#2867F333] absolute top-[70px] -right-[190px]
                        z-0 rounded-full animate-scaleAndFade ease-in-out"/>
                            <div className="h-[110vh] w-[110vh] absolute -top-[30px] -right-[290px] border-[2px] border-solid border-[#668FFA]
                        z-0 rounded-full animate-scaleAndFade ease-in-out"/>
                        </div>
                        :
                        <div>
                            <div className="h-[80vh] w-[80vh] bg-[#2867F333] absolute top-1/2 right-24
                                        translate-x-1/2 -translate-y-1/2 z-0 rounded-full"/>
                            <div className="h-[110vh] w-[110vh] absolute top-1/2 right-24 border-[2px] border-solid border-[#668FFA]
                                            translate-x-1/2 -translate-y-1/2 z-0 rounded-full "/>
                        </div>
                    }
                    <div className="h-[140vh] w-[140vh] absolute border-[2px] border-solid border-[#CBD8FC]
                                    -right-[400px] -top-[140px] z-0 rounded-full animate-spin">
                        <div className="h-[10vh] w-[10vh] bg-[#668FFA] rounded-full absolute
                                        -translate-y-1/2 -translate-x-[-50%] top-1/2 right-0"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full h-full z-10 flex flex-col justify-start items-start">
                {children}
            </div>
        </div>
    );
};

export default Bg;