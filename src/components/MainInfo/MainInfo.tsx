import React, {FC, useEffect} from 'react';
import {Button, createTheme, TextField, ThemeProvider} from "@mui/material";
import {icoArrowBlue, icons} from "../../icons/icons";
import {blueImg} from "../../images/images";

interface MainInfoProps {
    mainElement: React.RefObject<HTMLDivElement>
    bgElement: React.RefObject<HTMLDivElement>
    circleElement: React.RefObject<HTMLDivElement>
    setIsAnimation: (value: boolean) => void
}

const MainInfo: FC<MainInfoProps> = ({mainElement, bgElement, circleElement, setIsAnimation}) => {

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

    const handleGetArticle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (mainElement.current && bgElement.current && circleElement.current) {
            mainElement.current.style.transition = 'opacity 1.5s';
            mainElement.current.style.opacity = '0';
            bgElement.current.style.transition = 'transform 3s';
            bgElement.current.style.transform  = 'scale(0.7) translateX(-43.5%)';
            circleElement.current.style.transition = 'background-color 3s';
            circleElement.current.style.backgroundColor = '#F4F4FE'

            setTimeout(() => {
                if (mainElement.current) {
                    mainElement.current.style.display = 'none';
                }
            }, 3000)
        }
        setIsAnimation(true);
    };

    return (
        <div className="text-left font-montserratReg ml-[120px] mt-40"
             ref={mainElement}
        >
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