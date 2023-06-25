import React, {FC, useEffect, useRef, useState} from 'react';
import {Button, createTheme, TextField, ThemeProvider} from "@mui/material";
import {iconsBlue, iconsGreen, iconsOrange} from "../../icons/icons";
import {blueImg, orangeImg, greenImg} from "../../images/images";
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import Article from "../../api/service/Article";
import {deflateRaw} from "zlib";
import {IArticle, IErrorArticle} from "../../api/service/types";

interface MainInfoProps {
    mainElement: React.RefObject<HTMLDivElement>
    bgElement: React.RefObject<HTMLDivElement>
    bgColorElement: React.RefObject<HTMLDivElement>
    circleElement1: React.RefObject<HTMLDivElement>
    circleElement2: React.RefObject<HTMLDivElement>
    circleBorderElement1: React.RefObject<HTMLDivElement>
    circleBorderElement2: React.RefObject<HTMLDivElement>
    circleBorderChildElement: React.RefObject<HTMLDivElement>
    colorButton: React.RefObject<HTMLButtonElement>
    setIsAnimation: (value: boolean) => void
    setIsReadyArticle: (value: boolean) => void
    setLinkArticle: (value: string) => void
}

const MainInfo: FC<MainInfoProps> = (
    {
        mainElement,
        bgElement,
        bgColorElement,
        circleElement1,
        circleElement2,
        circleBorderElement1,
        circleBorderElement2,
        circleBorderChildElement,
        colorButton,
        setIsAnimation,
        setIsReadyArticle,
        setLinkArticle
    }) => {
    const theme = createTheme({
        typography: {
            fontFamily: 'Montserrat-Regular,Montserrat-Bold',
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: `
        @font-face {
        font-family: 'Montserrat-Regular';
        src: url('./fonts/Montserrat/Montserrat-Regular.ttf') format('truetype');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
        }
        @font-face {
            font-family: 'Montserrat-Bold';
            src: url('Montserrat/Montserrat-Bold.ttf') format('truetype');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
        }
      `,
            },
        },
    });

    const [open, setOpen] = useState<boolean>(false); // #F8AD03  #50AEDC
    const [currentTheme, setCurrentTheme] = useState<string>('#50AEDC');
    const [allTheme, setAllTheme] = useState<string[]>(['#50AEDC', '#72D68F', '#F8AD03']);

    const delimiterEl1 = useRef<HTMLDivElement>(null);
    const delimiterEl2 = useRef<HTMLDivElement>(null);
    const watchRef = useRef<HTMLImageElement>(null);
    const reloadRef = useRef<HTMLImageElement>(null);
    const cardRef = useRef<HTMLImageElement>(null);
    const arrowUpRef = useRef<HTMLImageElement>(null);
    const arrowDownRef = useRef<HTMLImageElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const footerRef = useRef<HTMLDivElement>(null)

    const [youtubeURL, setYoutubeURL] = useState<string>('');
    const [isValidURL, setIsValidURL] = useState<boolean>(true);

    const [textError, setTextError] = useState<string>('Некорректное URL для YouTube видео');

    const handleGetArticle = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const regex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
        if (regex.test(youtubeURL)) {
            if (mainElement.current && bgElement.current && circleElement1.current) {
                mainElement.current.style.transition = 'opacity 1.5s';
                mainElement.current.style.opacity = '0';
                bgElement.current.style.transition = 'transform 3s';
                bgElement.current.style.transform = 'scale(0.7) translateX(-43.5%)';
                circleElement1.current.style.transition = 'background-color 3s';
                circleElement1.current.style.backgroundColor = '#F4F4FE'

                setTimeout(() => {
                    if (mainElement.current) {
                        mainElement.current.style.display = 'none';
                    }
                }, 3000)
            }

            setIsAnimation(true);

            setTimeout(async () => {
                const {data, isError} = await Article.getArticle(youtubeURL);
                if (!isError) {
                    const article = data as IArticle
                    setLinkArticle(article.url[0]);
                    setIsReadyArticle(true);
                } else {
                    const err = data as IErrorArticle;
                    if (mainElement.current
                        && bgElement.current
                        && circleElement1.current
                        && footerRef.current
                    ) {
                        mainElement.current.style.opacity = '1';
                        bgElement.current.style.transform = 'scale(1.1) translateX(3.5%)';
                        circleElement1.current.style.backgroundColor = '#0045F880'
                        setIsAnimation(false);
                        setIsValidURL(false);
                        if (err.detail) {
                            setTextError(err.detail);
                            footerRef.current.style.marginBottom = '44px';
                        }
                        else {
                            setTextError("Неизвестная ошибка");
                            footerRef.current.style.marginBottom = '64px';
                        }
                        setTimeout(() => {
                            if (mainElement.current) {
                                mainElement.current.style.display = 'block';
                            }
                        }, 1000)
                    }
                }
            }, 3000)

        } else {
            setIsValidURL(false)
        }
    };

    const handleSetColor = async (e: React.MouseEvent<HTMLDivElement>, color: string) => {
        setCurrentTheme(color);
        if (circleElement1.current
            && circleElement2.current
            && circleBorderElement1.current
            && circleBorderElement2.current
            && circleBorderChildElement.current
            && bgColorElement.current
            && colorButton.current
            && delimiterEl1.current
            && delimiterEl2.current
            && reloadRef.current
            && watchRef.current
            && cardRef.current
            && imgRef.current
            && arrowUpRef.current
            && arrowDownRef.current
        ) {
            bgColorElement.current.style.transition = "background-color 3s";
            circleElement1.current.style.transition = "background-color 3s";
            circleElement2.current.style.transition = "background-color 3s";
            circleBorderElement1.current.style.transition = "background-color 3s";
            circleBorderElement2.current.style.transition = "background-color 3s";
            circleBorderChildElement.current.style.transition = "background-color 3s";
            colorButton.current.style.transition = "background-color 3s";
            delimiterEl1.current.style.transition = "background-color 3s";
            delimiterEl2.current.style.transition = "background-color 3s";
            watchRef.current.style.transition = 'opacity 1s';
            watchRef.current.style.opacity = '0';
            reloadRef.current.style.transition = 'opacity 1s';
            reloadRef.current.style.opacity = '0';
            cardRef.current.style.transition = 'opacity 1s';
            cardRef.current.style.opacity = '0';
            imgRef.current.style.transition = 'opacity 1s';
            imgRef.current.style.opacity = '0';
            arrowUpRef.current.style.transition = 'opacity 1s';
            arrowUpRef.current.style.opacity = '0';
            arrowDownRef.current.style.transition = 'opacity 1s';
            arrowDownRef.current.style.opacity = '0';

            if (color === '#F8AD03') {
                bgColorElement.current.style.backgroundColor = '#ECE9E4'
                circleElement1.current.style.backgroundColor = '#F8AD03';
                circleElement2.current.style.backgroundColor = 'rgba(248, 173, 3, 0.50)'
                circleBorderElement1.current.style.borderColor = '#F07D2C';
                circleBorderElement2.current.style.borderColor = 'rgba(240, 125, 44, 0.50)';
                circleBorderChildElement.current.style.backgroundColor = '#F8AD03';
                colorButton.current.style.backgroundColor = '#E7A204';
                delimiterEl1.current.style.backgroundColor = '#F8AD03';
                delimiterEl2.current.style.backgroundColor = '#F8AD03';
                setTimeout(() => {
                    if (watchRef.current
                        && reloadRef.current
                        && cardRef.current
                        && imgRef.current
                        && arrowUpRef.current
                        && arrowDownRef.current
                    ) {
                        watchRef.current.src = iconsOrange.watchOrange;
                        watchRef.current.style.opacity = '1';
                        reloadRef.current.src = iconsOrange.reloadOrange;
                        reloadRef.current.style.opacity = '1';
                        cardRef.current.src = iconsOrange.cardOrange;
                        cardRef.current.style.opacity = '1';
                        arrowDownRef.current.src = iconsOrange.arrowOrangeDown;
                        arrowDownRef.current.style.opacity = '1';
                        arrowUpRef.current.src = iconsOrange.arrowOrangeUp;
                        arrowUpRef.current.style.opacity = '1';
                        imgRef.current.src = orangeImg.orange_01;
                        imgRef.current.style.opacity = '1';
                    }
                }, 1000)
            }
            if (color === '#72D68F') {
                bgColorElement.current.style.backgroundColor = '#F9FFFA'
                circleElement1.current.style.backgroundColor = 'rgba(40, 158, 110, 0.50)';
                circleElement2.current.style.backgroundColor = '#289E6E80'
                circleBorderElement1.current.style.borderColor = '#289E6E';
                circleBorderElement2.current.style.borderColor = '#72D68F';
                circleBorderChildElement.current.style.backgroundColor = '#289D6E';
                colorButton.current.style.backgroundColor = '#289E6E';
                delimiterEl1.current.style.backgroundColor = '#289E6E';
                delimiterEl2.current.style.backgroundColor = '#289E6E';
                setTimeout(() => {
                    if (watchRef.current
                        && reloadRef.current
                        && cardRef.current
                        && imgRef.current
                        && arrowUpRef.current
                        && arrowDownRef.current
                    ) {
                        watchRef.current.src = iconsGreen.watchGreen;
                        watchRef.current.style.opacity = '1';
                        reloadRef.current.src = iconsGreen.reloadGreen;
                        reloadRef.current.style.opacity = '1';
                        cardRef.current.src = iconsGreen.cardGreen;
                        cardRef.current.style.opacity = '1';
                        arrowUpRef.current.src = iconsGreen.arrowGreenUp;
                        arrowUpRef.current.style.opacity = '1';
                        arrowDownRef.current.src = iconsGreen.arrowGreenDown;
                        arrowDownRef.current.style.opacity = '1';
                        imgRef.current.src = greenImg.green_01;
                        imgRef.current.style.opacity = '1';
                    }
                }, 1000)
            }
            if (color === '#50AEDC') {
                bgColorElement.current.style.backgroundColor = '#F4F4FE'
                circleElement1.current.style.backgroundColor = '#0045F880';
                circleElement2.current.style.backgroundColor = '#2867F333'
                circleBorderElement1.current.style.borderColor = '#668FFA';
                circleBorderElement2.current.style.borderColor = '#CBD8FC';
                circleBorderChildElement.current.style.backgroundColor = '#668FFA';
                colorButton.current.style.backgroundColor = '#668FFA';
                delimiterEl1.current.style.backgroundColor = '#668FFA';
                delimiterEl2.current.style.backgroundColor = '#668FFA';
                setTimeout(() => {
                    if (watchRef.current
                        && reloadRef.current
                        && cardRef.current
                        && imgRef.current
                        && arrowUpRef.current
                        && arrowDownRef.current
                    ) {
                        watchRef.current.src = iconsBlue.watchBlue;
                        watchRef.current.style.opacity = '1';
                        reloadRef.current.src = iconsBlue.reloadBlue;
                        reloadRef.current.style.opacity = '1';
                        cardRef.current.src = iconsBlue.cardBlue;
                        cardRef.current.style.opacity = '1';
                        arrowUpRef.current.src = iconsBlue.arrowBlueUp;
                        arrowUpRef.current.style.opacity = '1';
                        arrowDownRef.current.src = iconsBlue.arrowBlueDown;
                        arrowDownRef.current.style.opacity = '1';
                        imgRef.current.src = blueImg.blue_01;
                        imgRef.current.style.opacity = '1';
                    }
                }, 1000)
            }
        }
    }

    return (
        <div className="text-left font-montserratReg ml-[120px] mt-40"
             ref={mainElement}
        >
            <div className="absolute top-6 right-0">
                <div className="flex items-center">
                    <div className="mr-6 text-[#7E7E7E]">Тема</div>
                    <div className="mr-6">
                        <div className="h-5 w-5 rounded-full"
                             style={{backgroundColor: currentTheme}}
                        />
                    </div>
                    <div className="mr-10 rounded-t-2xl">
                        <ListItem button onClick={() => setOpen(!open)}>
                            {open ? <ExpandLessOutlinedIcon/> : <ExpandMoreOutlinedIcon/>}
                        </ListItem>
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <div className="mr-10">
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding className="bg-[#EEEEEE] rounded-2xl">
                                {allTheme.map((thm) => {
                                    if (thm !== currentTheme) {
                                        return (
                                            <ListItem button>
                                                <div className="h-6 w-6 rounded-full"
                                                     style={{backgroundColor: thm}}
                                                     onClick={(e: React.MouseEvent<HTMLDivElement>) => handleSetColor(e, thm)}
                                                />
                                            </ListItem>
                                        )
                                    }
                                })}
                            </List>
                        </Collapse>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="flex flex-col w-[450px] mb-6">
                    <h1 className="font-montserratBold text-4xl mb-5">Конвертировать видео в статью</h1>
                    <p>Создать полноценную статью с иллюстрациями и заголовками просто.</p>
                </div>
                <div className="flex items-center mb-24 font-montserratReg"
                     ref={footerRef}
                >
                    <ThemeProvider theme={theme}>
                        <TextField
                            size="small"
                            label="Введите URL видео Youtube"
                            sx={{
                                width: '350px',
                                marginRight: '20px',
                                fontFamily: "Montserrat-Regular",
                            }}
                            value={youtubeURL}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYoutubeURL(e.target.value)}
                            error={!isValidURL}
                            helperText={!isValidURL ? textError : ""}
                        />
                        <Button variant="contained"
                                sx={{
                                    backgroundColor: "#668FFA",
                                    borderRadius: "15px",
                                    height: '40px',
                                    text: "white",
                                    fontFamily: 'Montserrat-Bold',
                                }}
                                ref={colorButton}
                                onClick={handleGetArticle}
                        >
                            Получить статью
                        </Button>
                    </ThemeProvider>
                </div>
            </div>
            <div className="flex bg-white px-[40px] py-[30px] rounded-[20px] items-center shadow-2xl">
                <div className="w-[330px]">
                    <img src={iconsBlue.watchBlue} alt="Watch"
                         ref={watchRef}
                    />
                    <h2 className="my-3 font-montserratBold">Не трать время на копирайтинг</h2>
                    <p>Достаточно просто ввести url видео и конвертировать его в статью!</p>
                </div>
                <div className="w-[2px] h-[115px] bg-[#668FFA] rounded-full mx-[40px]"
                     ref={delimiterEl1}
                />
                <div className="w-[330px]">
                    <img src={iconsBlue.reloadBlue} alt="Reload"
                         ref={reloadRef}
                    />
                    <h2 className="my-3 font-montserratBold">Читай и смотри</h2>
                    <p>Переключайся между текстом и видео в один клик!</p>
                </div>
                <div className="w-[2px] h-[115px] bg-[#668FFA] rounded-full mx-[40px]"
                     ref={delimiterEl2}
                />
                <div className="w-[330px]">
                    <img src={iconsBlue.cardBlue} alt="Card"
                         ref={cardRef}
                    />
                    <h2 className="my-3 font-montserratBold">Сохраняй заметки</h2>
                    <p>Ты всегда сможешь вернуться к интересным и важним моментам.</p>
                </div>
            </div>
            <img src={blueImg.blue_01}
                 alt="1c"
                 className="h-[240px] absolute right-[364px] top-[40px] z-10"
                 ref={imgRef}
            />
            <img src={iconsBlue.arrowBlueUp}
                 alt="Arrow up"
                 className="h-[80px] absolute right-[284px] top-[76px] z-100"
                 ref={arrowUpRef}
            />
            <img src={blueImg.img_02}
                 alt="1c"
                 className="h-[320px] absolute right-[126px] top-[150px] z-10"
            />
            <img src={iconsBlue.arrowBlueDown}
                 alt="Arrow down"
                 className="h-[80px] absolute right-[400px] top-[282px] z-10"
                 ref={arrowDownRef}
            />
        </div>
    );
};

export default MainInfo;