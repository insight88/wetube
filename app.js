import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";

const app = express();
// express 실행, 서버 역할을 할 수 있도록 선언

app.set("view engine", "pug")
// pug와 express에는 view 파일들의 위치에 관한 기본 설정이 있음
// html 파일들의 위치에 관한 default 디렉토리는 '/views' 디렉토리

app.use("/uploads", express.static("uploads"));
// express.static("폴더명") : 정적 파일을 제공하는 익스프레스 내장 미들웨어
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(localsMiddleware)
// middlewares.js에 정의되어 있는 localsMiddleare를 사용
// localsMiddleware는 모든 루트에 접근할 때 실행되는 함수, locals로 전역변수 유통

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
// routes.~ 로 접속하면 routes.js에 있는 페이지 리스트에서 해당 오브젝트에 대응하는 주소를 사용

export default app;
// app.js를 default로 전부 export -> init.js에서 호출

// M : data (model)
// V : how does the data look (view)
// C : function that looks for the data (control)
// URL, 함수를 분리