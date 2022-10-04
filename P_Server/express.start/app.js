const express = require("express");
// 파일과 폴더의 경로 작업을 위한 기능을 제공하는 Node.js 기본 모듈, html를 사용하기 위하여 path 사용
const path = require("path");

// morgan: http 요청과 응답이 있을때마다, 명령창에 로그로 보여주는 Node.js 패키지
const morgan = require("morgan");

// cookieParser: 요청과 함께 들어온 쿠키를 해석하여 곧바로 req.cookies객체로 만든다
const cookieParser = require("cookie-parser");

// express-session: Node.js의 프레임워크인 Express를 사용할 때 세션을 관리할 수 있도록 하는 미들웨어
const session = require("express-session");

// dotenv: Node.js 서버의 포트, DB 관련정보등 다양한 정보를, .env 파일로 관리할 수 있게 해주는 Node.js 패키지
const dotenv = require("dotenv");

// multer : 비디오,이미지 같은 여러자기 형식 파일들을 멀티파트 형식으로 업로드 할떄 사용하는 미들웨어
const multer = require("multer");

// FileSystem의 약자로, 파일 처리와 관련된 여러가지 기능을 하는 js라이브러리
const fs = require("fs");

dotenv.config();
const app = express();
app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));

//body-parser 미들웨어 사용 << 요청의 본문 데이터를 해석하여 req.body 객체로 만들어주는 미들웨어, 4.16버전부터 익스프레스에 내장되어있어서 따로 설치할 필요없음
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);
try {
  fs.readdirSync("uploads");
} catch (error) {
  console.log("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdir("uploads");
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "multipart.html"));
});
app.post(
  "/upload",
  upload.fields([{ name: "image1" }, { name: "image2" }]),
  (req, res) => {
    console.log(req.files, req.body);
    res.send("ok");
  }
);

app.use((req, res, next) => {
  console.log("모든 요청에 다 실행됩니다.");
  next();
});
app.get(
  "/",
  (req, res, next) => {
    console.log("GET / 요청에 의해서만 실행됩니다.");
    next();
  },
  (req, res) => {
    throw new Error("에러는 에러처리 미들웨어로 갑니다.");
  }
);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message);
});
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
