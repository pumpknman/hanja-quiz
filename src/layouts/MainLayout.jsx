import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

function MainLayout({ children }) {
    const location = useLocation();

    useEffect(() => {
        if (window.adsbygoogle) {
            window.adsbygoogle.push({});
        }
    }, []);

    const isResultPage = location.pathname === "/result";

    return (
        <Box
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(#0F1214, #0C1A27)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: { xs: 1, md: 0 },
                boxSizing: "border-box",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    maxWidth: "1200px",
                }}
            >
                {/* 왼쪽 광고 영역 */}
                <Box
                    sx={{
                        width: "100px",
                        height: "600px",
                        backgroundColor: "#FBE8DC",
                        display: { xs: "none", md: "flex" },
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ins
                        className="adsbygoogle"
                        style={{ display: "block", width: "100px", height: "600px" }}
                        data-ad-client="ca-pub-3940256099942544"
                        data-ad-slot="1234567890"
                    ></ins>
                </Box>

                {/* 메인 콘텐츠 박스 */}
                {!isResultPage && (
                    <Box
                        sx={{
                            width: { xs: "95%", md: 815 },
                            height: { xs: "calc(100vh - 20px)", md: 815 },
                            maxWidth: 815,
                            maxHeight: 815,
                            backgroundColor: "#0F1214",
                            borderRadius: { xs: "15px", md: "15px" },
                            border: "1px solid #1B1F24",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            boxSizing: "border-box",
                            overflow: "hidden",
                            position: "relative",
                        }}
                    >
                        {children}
                    </Box>
                )}

                {/* 오른쪽 광고 영역 */}
                <Box
                    sx={{
                        width: "100px",
                        height: "600px",
                        backgroundColor: "#FBE8DC",
                        display: { xs: "none", md: "flex" },
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ins
                        className="adsbygoogle"
                        style={{ display: "block", width: "100px", height: "600px" }}
                        data-ad-client="ca-pub-3940256099942544"
                        data-ad-slot="1234567890"
                    ></ins>
                </Box>
            </Box>

            {/* ResultPage Children Direct Rendering */}
            {isResultPage && children}
        </Box>
    );
}

export default MainLayout;
