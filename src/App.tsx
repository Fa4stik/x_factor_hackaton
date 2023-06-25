import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import BG from "./components/BG/BG";
import {Button, createTheme, TextField, ThemeProvider} from '@mui/material';
import LoadInfo from "./components/LoadInfo/LoadInfo";
import MainInfo from "./components/MainInfo/MainInfo";

function App() {
    const mainElement = useRef<HTMLDivElement>(null);
    const bgElement = useRef<HTMLDivElement>(null);
    const bgColorElement = useRef<HTMLDivElement>(null);
    const circleElement1 = useRef<HTMLDivElement>(null);
    const circleElement2 = useRef<HTMLDivElement>(null);
    const circleBorderElement1 = useRef<HTMLDivElement>(null);
    const circleBorderElement2 = useRef<HTMLDivElement>(null);
    const circleBorderChildElement = useRef<HTMLDivElement>(null);
    const colorButton = useRef<HTMLButtonElement>(null)

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
    const [isReadyArticle, setIsReadyArticle] = useState<boolean>(false);

    const [linkArticle, setLinkArticle] = useState<string>('')

    const [title, setTitle] = useState<string>('Видео обрабатывается, это может занять какое-то время')
    const [body, setBody] = useState<string>('А пока вы можете познакомиться с нашей командой:')

    const handleOpenTitle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        window.location.href = linkArticle;
    }

    return (
        <div className="App">
            <BG bgElement={bgElement}
                bgColorElement={bgColorElement}
                isAnimation={isAnimation}
                circleElement1={circleElement1}
                circleElement2={circleElement2}
                circleBorderElement1={circleBorderElement1}
                circleBorderElement2={circleBorderElement2}
                circleBorderChildElement={circleBorderChildElement}
            >
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
                                                onClick={handleOpenTitle}
                                        >
                                            Перейти к статье
                                        </Button>
                                    </ThemeProvider>
                                </LoadInfo>
                            )
                            :
                            <LoadInfo title={title} body={body}/>
                    :
                    null
                }
                <MainInfo mainElement={mainElement}
                          bgElement={bgElement}
                          bgColorElement={bgColorElement}
                          circleElement1={circleElement1}
                          circleElement2={circleElement2}
                          circleBorderElement1={circleBorderElement1}
                          circleBorderElement2={circleBorderElement2}
                          circleBorderChildElement={circleBorderChildElement}
                          colorButton={colorButton}
                          setIsAnimation={setIsAnimation}
                          setIsReadyArticle={setIsReadyArticle}
                          setLinkArticle={setLinkArticle}
                />
            </BG>
        </div>
    );
}

export default App;
