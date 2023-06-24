import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import BG from "./components/BG/BG";
import {Button, createTheme, TextField, ThemeProvider} from '@mui/material';
import {icoArrowBlue, icons} from "./icons/icons";
import {blueImg, commandImg} from "./images/images";
import LoadInfo from "./components/LoadInfo/LoadInfo";
import MainInfo from "./components/MainInfo/MainInfo";

function App() {
    const mainElement = useRef<HTMLDivElement>(null)
    const bgElement = useRef<HTMLDivElement>(null)
    const circleElement = useRef<HTMLDivElement>(null)

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

    const [isAnimation, setIsAnimation] = useState<boolean>(false);
    const [isReadyArticle, setIsReadyArticle] = useState<boolean>(true);

    // useEffect(() => {
    //     if (mainElement.current) {
    //         mainElement.current.style.display = 'none';
    //     }
    //     if (bgElement.current) {
    //         bgElement.current.style.transform  = 'scale(0.7) translateX(-50%)';
    //     }
    // }, [])

    return (
        <div className="App">
            <BG bgElement={bgElement} isAnimation={isAnimation} circleElement={circleElement}>
                {isAnimation ?
                    isReadyArticle ?
                            (
                                <LoadInfo title="Обработка видео завершена">
                                    <ThemeProvider theme={theme}>
                                        <Button variant="contained"
                                                sx={{
                                                    backgroundColor: "#668FFA",
                                                    borderRadius: "15px",
                                                    height: '40px',
                                                    text: "white",
                                                    fontFamily: 'Montserrat-Bold',
                                                }}
                                                onClick={() => console.log('CHECK')}
                                        >
                                            Перейти к статье
                                        </Button>
                                    </ThemeProvider>
                                </LoadInfo>
                            )
                            :
                            <LoadInfo title="Видео обрабатывается, это может занять какое-то время" body="А пока вы можете познакомиться с нашей командой:"/>
                    :
                    null
                }
                <MainInfo mainElement={mainElement} bgElement={bgElement} circleElement={circleElement} setIsAnimation={setIsAnimation}/>
            </BG>
        </div>
    );
}

export default App;
