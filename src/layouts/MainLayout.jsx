import React from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

function MainLayout({ children }) {
    const location = useLocation();
    const isResultPage = location.pathname === "/result";

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
                flexDirection: "column", // 위아래 배치를 위해 column 추가
                justifyContent: "space-between", // 콘텐츠와 하단 광고 간 간격 유지
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
                    flex: 1, // 콘텐츠 영역이 가능한 공간을 차지하도록 설정
                }}
            >
                {/* 왼쪽 광고 영역 */}
                <Box
                    sx={{
                        width: "100px",
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
                        height: { xs: "calc(100vh - 20px - 60px)", md: 815 }, // 하단 광고 높이만큼 차감
                        maxWidth: 815,
                        maxHeight: 815,
                        backgroundColor: "#f8f8f8",
                        borderRadius: { xs: "15px", md: "15px" },
                        // border: "1px solid #fceeec",
                        //boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        boxSizing: "border-box",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    {/* ResultPage의 경우 별도 레이아웃 적용 */}
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
                        width: "100px",
                        height: "600px",
                        display: { xs: "none", md: "flex" },
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "10px",
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
            </Box>

            {/* 하단 고정 광고 영역 (모바일에서만 표시) */}
            <Box
                sx={{
                    width: "100%",
                    height: "60px",
                    display: { xs: "flex", md: "none" }, // 모바일에서만 표시
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f8f8f8",
                    borderTop: "0px solid #2C2F34",
                    position: "fixed", // 고정된 위치
                    bottom: 0,
                    left: 0,
                }}
            >
                <iframe
                    src="https://ads-partners.coupang.com/widgets.html?id=832578&template=carousel&trackingCode=AF9925383&subId=&width=320&height=60&tsource="
                    width="320"
                    height="60"
                    frameBorder="0"
                    scrolling="no"
                    referrerPolicy="unsafe-url"
                    browsingtopics
                ></iframe>
            </Box>
        </Box>
    );
}

export default MainLayout;
