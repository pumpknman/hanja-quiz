import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

function MainLayout({ children }) {
    const location = useLocation();
    const isResultPage = location.pathname === "/result";

    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.type = "text/javascript";
        script.src = "//t1.daumcdn.net/kas/static/ba.min.js";
        script.onload = () => {
            if (window.kakao && window.kakao.adfit) {
                window.kakao.adfit.load();
            }
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <Box
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(#fff, #f1f2f3)",
                display: "flex",
                flexDirection: "column", // 위아래 배치
                justifyContent: "space-between",
                alignItems: "center",
                padding: { xs: 1, md: 0 },
                boxSizing: "border-box",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            {/* 메인 콘텐츠 영역 */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    maxWidth: "1200px",
                    flex: 1, // 메인 콘텐츠가 가능한 공간을 차지
                    overflow: "hidden",
                    paddingBottom: { xs: "60px", md: 0 }, // 모바일에서 하단 광고 높이만큼 여백 추가
                }}
            >
                {/* 왼쪽 광고 영역 */}
                <Box
                    sx={{
                        width: "160px",
                        height: "600px",
                        display: { xs: "none", md: "flex" },
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "10px",
                    }}
                >
                    <iframe
                        src="https://ads-partners.coupang.com/widgets.html?id=832578&template=carousel&trackingCode=AF9925383&subId=&width=100&height=600&tsource="
                        width="100"
                        height="600"
                        frameBorder="0"
                        scrolling="no"
                        referrerPolicy="unsafe-url"
                        browsingtopics
                    ></iframe>
                </Box>

                {/* 메인 콘텐츠 박스 */}
                <Box
                    sx={{
                        width: { xs: "95%", md: 815 },
                        height: { xs: "calc(100vh - 20px - 60px)", md: 815 }, // 하단 광고 높이(60px) 차감
                        maxWidth: 815,
                        maxHeight: 815,
                        backgroundColor: "#f8f8f8",
                        borderRadius: "15px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        boxSizing: "border-box",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    {/* ResultPage 레이아웃 적용 */}
                    {isResultPage ? (
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {children}
                        </Box>
                    ) : (
                        children
                    )}
                </Box>

                {/* 오른쪽 광고 영역 */}
                <Box
                    sx={{
                        width: "160px",
                        height: "600px",
                        display: { xs: "none", md: "flex" },
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "10px",
                    }}
                >
                    <ins
                        className="kakao_ad_area"
                        style={{ display: "none" }}
                        data-ad-unit="DAN-45TcKPAG1vUw9vWd"
                        data-ad-width="160"
                        data-ad-height="600"
                    />
                </Box>
            </Box>

            {/* 하단 고정 광고 영역 */}
            <Box
                sx={{
                    width: "100%",
                    height: "60px",
                    display: { xs: "flex", md: "none" },
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f8f8f8",
                    borderTop: "1px solid #e0e0e0",
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    zIndex: 10,
                }}
            >
                <ins
                    className="kakao_ad_area"
                    style={{ display: "none" }}
                    data-ad-unit="DAN-LsZLmTI6Wbnm3w5R"
                    data-ad-width="320"
                    data-ad-height="50"
                />
            </Box>
        </Box>
    );
}

export default MainLayout;
