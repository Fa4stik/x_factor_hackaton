import React, {FC, useEffect, useState} from 'react';
import {Button, createTheme, TextField, ThemeProvider} from "@mui/material";
import {icoArrowBlue, icons} from "../../icons/icons";
import {blueImg} from "../../images/images";
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

interface MainInfoProps {
    mainElement: React.RefObject<HTMLDivElement>
    bgElement: React.RefObject<HTMLDivElement>
    circleElement1: React.RefObject<HTMLDivElement>
    circleElement2: React.RefObject<HTMLDivElement>
    circleBorderElement1: React.RefObject<HTMLDivElement>
    circleBorderElement2: React.RefObject<HTMLDivElement>
    circleBorderChildElement: React.RefObject<HTMLDivElement>
    setIsAnimation: (value: boolean) => void
    setIsReadyArticle: (value: boolean) => void
}

const MainInfo: FC<MainInfoProps> = (
    {
        mainElement,
        bgElement,
        circleElement1,
        circleElement2,
        circleBorderElement1,
        circleBorderElement2,
        circleBorderChildElement,
        setIsAnimation,
        setIsReadyArticle
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

    const [youtubeURL, setYoutubeURL] = useState<string>('');
    const [isValidURL, setIsValidURL] = useState<boolean>(true);

    const handleGetArticle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const regex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
        if (regex.test(youtubeURL)) {
            if (mainElement.current && bgElement.current && circleElement1.current) {
                mainElement.current.style.transition = 'opacity 1.5s';
                mainElement.current.style.opacity = '0';
                bgElement.current.style.transition = 'transform 3s';
                bgElement.current.style.transform  = 'scale(0.7) translateX(-43.5%)';
                circleElement1.current.style.transition = 'background-color 3s';
                circleElement1.current.style.backgroundColor = '#F4F4FE'

                setTimeout(() => {
                    if (mainElement.current) {
                        mainElement.current.style.display = 'none';
                    }
                }, 3000)
            }
            setIsAnimation(true);
        } else {
            setIsValidURL(false)
        }
    };

    const handleSetColor = (e: React.MouseEvent<HTMLDivElement>, color: string) => {
        console.log(color);
    }

    useEffect(() => {
        setTimeout(() => {
            setTimeout(() => {
                setIsReadyArticle(true)
            }, 15000)
        }, 15000)
    }, [])

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
                        <ListItem button onClick={() => setOpen(!open)} >
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
                <div className="flex items-center mb-24 font-montserratReg">
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
                            helperText={!isValidURL ? "Некорректное URL для YouTube видео" : ""}
                        />
                        <Button variant="contained"
                                sx={{
                                    backgroundColor: "#668FFA",
                                    borderRadius: "15px",
                                    height: '40px',
                                    text: "white",
                                    fontFamily: 'Montserrat-Bold',
                                }}
                                onClick={handleGetArticle}
                        >
                            Получить статью
                        </Button>
                    </ThemeProvider>
                </div>
            </div>
            <div className="flex bg-white px-[40px] py-[30px] rounded-[20px] items-center shadow-2xl">
                <div className="w-[330px]">
                    <img src={icons.watch} alt="Watch"/>
                    <h2 className="my-3 font-montserratBold">Не трать время на копирайтинг</h2>
                    <p>Достаточно просто ввести url видео и конвертировать его в статью!</p>
                </div>
                <div className="w-[2px] h-[115px] bg-[#668FFA] rounded-full mx-[40px]"/>
                <div className="w-[330px]">
                    <img src={icons.reload} alt="Reload"/>
                    <h2 className="my-3 font-montserratBold">Читай и смотри</h2>
                    <p>Переключайся между текстом и видео в один клик!</p>
                </div>
                <div className="w-[2px] h-[115px] bg-[#668FFA] rounded-full mx-[40px]"/>
                <div className="w-[330px]">
                    <img src={icons.card} alt="Card"/>
                    <h2 className="my-3 font-montserratBold">Сохраняй заметки</h2>
                    <p>Ты всегда сможешь вернуться к интересным и важним моментам.</p>
                </div>
            </div>
            <img src={blueImg.blue_01}
                 alt="1c"
                 className="h-[240px] absolute right-[364px] top-[40px] z-10"
            />
            <img src={icoArrowBlue.arrowBlueUp}
                 alt="Arrow up"
                 className="h-[80px] absolute right-[284px] top-[76px] z-100"
            />
            <img src={blueImg.blue_02}
                 alt="1c"
                 className="h-[320px] absolute right-[126px] top-[150px] z-10"
            />
            <img src={icoArrowBlue.arrowBlueDown}
                 alt="Arrow down"
                 className="h-[80px] absolute right-[400px] top-[282px] z-10"
            />
        </div>
    );
};

export default MainInfo;