import React, { useEffect } from "react";
import { Box } from "@mui/material";

function MainLayout({ children }) {
    useEffect(() => {
        if (window.adsbygoogle) {
            window.adsbygoogle.push({});
        }
    }, []);

    return (
        <Box
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(#0F1214, #0C1A27)",
                backgroundAttachment: "fixed",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: { xs: 1, md: 0 },
                boxSizing: "border-box",
            }}
        >
            {/* 전체 레이아웃 컨테이너 */}
            <Box
                sx={{
                    display: "flex", // 좌우 배너와 메인 콘텐츠 박스 배치
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%", // 화면 전체 너비
                    maxWidth: "1200px", // 전체 레이아웃 최대 너비
                }}
            >
                {/* 왼쪽 광고 영역 */}
                <Box
                    sx={{
                        width: "100px",
                        height: "600px",
                        backgroundColor: "#FBE8DC",
                        display: { xs: "none", md: "flex" }, // 모바일에서는 숨김
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
                <Box
                    sx={{
                        width: { xs: "95%", md: 815 },
                        minHeight: { xs: "calc(100vh - 20px)", md: 815 }, // 모바일에서 화면에 맞추기
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

                {/* 오른쪽 광고 영역 */}
                <Box
                    sx={{
                        width: "100px",
                        height: "600px",
                        backgroundColor: "#FBE8DC",
                        display: { xs: "none", md: "flex" }, // 모바일에서는 숨김
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
        </Box>
    );
}

export default MainLayout;
