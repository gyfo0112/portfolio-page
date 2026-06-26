export const personalInfo = {
  name: '김효래',
  title: '풀스택 개발자',
  tagline: '코드와 디자인의 경계를 허무는 개발자',
  bio: '저는 사용자 경험과 코드 품질 모두를 중시하는 풀스택 개발자입니다. 프론트엔드의 섬세한 인터랙션부터 백엔드의 견고한 아키텍처까지, 전체 스택을 아우르는 개발 역량을 갖추고 있습니다.',
  status: '현재 구직 중',
  location: '경기 구리',
  available: '주말 제외 모두 가능',
  education: '경복대 / 소프트웨어 융합과',
  email: 'gyfo6474@naver.com',
  phone: '010-7695-0047',
  github: 'https://github.com/gyfo0112',
  blog: 'https://www.notion.so/3657290dbe06806fa7ddcb8ddb2fa8ab?source=copy_link',
};

export const skills = {
  languages: ['JavaScript', 'Java', 'TypeScript', 'Python'],
  frontend: ['React', 'Next.js', 'HTML / CSS', 'Tailwind'],
  backend: ['Node.js', 'Express', 'MySQL', 'Oracle', 'JSP / Servlet'],
  tools: ['Git', 'Docker', 'AWS', 'Figma', 'VS Code', 'IntelliJ'],
};

export const orbitSkills = [
  { label: 'React', angle: 45 },
  { label: 'Node.js', angle: 135 },
  { label: 'Next.js', angle: 225 },
  { label: 'TypeScript', angle: 315 },
];

import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';

export const mainProjects = [
  {
    id: 1,
    category: 'WEB APP',
    name: 'Haru-Piece(하루조각.)',
    description: '사진을 업로드해서 하루를 마무리하는 포토 일기장',
    languages: ['JavaScript'],
    frameworks: ['React / Vite', 'MySql / AWS S3'],
    tools: ['Docker / Nginx / Git'],
    github: 'https://github.com/gyfo0112/haru-piece',
    live: 'http://www.harupiece.site',
    image: project1,
    mockup: 'browser',
    detail: {
      overview: '사진을 업로드하고 하루를 기록하는 포토 일기 웹 서비스입니다. 회원가입/로그인부터 사진 업로드, 일기 작성, 캘린더 뷰까지 풀스택으로 직접 구현했습니다.',
      features: [
        'JWT 기반 회원가입 / 로그인 인증',
        '사진 업로드 및 AWS S3 스토리지 연동',
        '날짜별 일기 작성 및 캘린더 뷰',
        'Spring Security를 통한 API 보안 처리',
        'Docker + Nginx를 활용한 서버 배포',
        'React 기반 SPA 프론트엔드 구현',
      ],
      role: '기획부터 배포까지 프론트엔드/백엔드 전 과정을 혼자 담당했습니다. React로 UI를 구성하고 Spring Boot로 REST API를 설계, AWS S3로 이미지를 관리하며 Docker로 배포까지 진행했습니다.',
      review: '처음으로 프론트엔드와 백엔드를 모두 혼자 구현한 프로젝트입니다. JWT 인증 흐름과 AWS S3 연동 과정에서 많은 것을 배웠고, Docker를 활용한 배포 경험이 큰 자산이 됐습니다.',
    },
  },
  {
    id: 2,
    category: 'UI REDESIGN',
    name: 'TOCOBO : Re-edit by ADER',
    description: '토코보 페이지를 아더에러의 느낌을 살려 새로 디자인한 작업',
    languages: ['JavaScript'],
    frameworks: ['React / Vite'],
    tools: ['Git / Vercel / VS Code'],
    github: 'https://github.com/gyfo0112/TOCOBO-custom',
    live: 'https://tocobo-custom.vercel.app',
    image: project2,
    mockup: 'browser',
    detail: {
      overview: '화장품 브랜드 TOCOBO의 공식 사이트를 아더에러(ADER ERROR)의 감성으로 재해석한 UI 리디자인 프로젝트입니다. 기존 브랜드 아이덴티티를 유지하면서 새로운 무드를 적용했습니다.',
      features: [
        '아더에러 감성의 타이포그래피와 레이아웃 적용',
        'GSAP 스크롤 애니메이션 구현',
        'React 기반 컴포넌트 설계',
        'SCSS 모듈을 활용한 스타일 관리',
        'Vercel을 통한 빠른 배포 및 CI/CD',
      ],
      role: '디자인 컨셉 기획부터 프론트엔드 구현까지 전 과정을 담당했습니다. 레이아웃 설계, 애니메이션 구현, 반응형 처리를 모두 직접 작업했습니다.',
      review: '실존하는 브랜드를 다른 브랜드의 감성으로 재해석하는 작업이 흥미로웠습니다. 단순 복제가 아닌 창의적인 재구성 과정에서 디자인 감각을 키울 수 있었습니다.',
    },
  },
  {
    id: 3,
    category: 'PERSONAL PROJECT',
    name: 'EmotionDiary',
    description: '하루의 감정을 기록하고 돌아볼수있는 일기장',
    languages: ['JavaScript'],
    frameworks: ['React / Vite'],
    tools: ['Git / Vercel / VS Code'],
    github: 'https://github.com/gyfo0112/emotion-diary',
    live: 'https://emotion-diary-teal-five.vercel.app/',
    image: project3,
    mockup: 'phone',
    detail: {
      overview: '하루의 감정을 이모지로 선택하고 일기를 작성해 돌아볼 수 있는 감정 기록 앱입니다. LocalStorage를 활용해 별도 서버 없이 데이터를 유지합니다.',
      features: [
        '감정 이모지 선택 및 일기 작성',
        'React Router를 활용한 페이지 라우팅',
        'LocalStorage 기반 데이터 영속성',
        '날짜별 감정 기록 조회 및 수정',
        '반응형 모바일 친화적 UI',
      ],
      role: '기획, 디자인, 프론트엔드 구현 전 과정을 담당했습니다. React Hooks와 Context API를 활용한 상태 관리, React Router를 통한 SPA 라우팅을 구현했습니다.',
      review: 'React의 기초를 다지는 프로젝트였습니다. 상태 관리와 라우팅, 컴포넌트 설계에 대해 깊이 이해하게 됐고, 사용자 경험을 고려한 UI를 직접 설계해볼 수 있었습니다.',
    },
  },
];

export const miniProjects = [
  { id: 1, name: 'Naver Shop Search', description: '네이버 쇼핑 API를 활용한 상품 검색 및 즐겨찾기 웹 서비스', tags: ['Python', 'FastAPI', 'MongoDB', 'Naver API'], github: 'https://github.com/gyfo0112/bookbook2', live: 'https://bookbook2.vercel.app' },
  { id: 2, name: 'Soundiary', description: '음악과 함께 하루를 기록하는 뮤직 다이어리 앱', tags: ['React', 'Vite', 'iTunes API', 'Web Audio API', 'html2canvas'], github: 'https://github.com/gyfo0112', live: 'https://soundiary-7tsf.vercel.app/' },
  { id: 3, name: 'FreePark-Spot', description: '카카오맵 Api와 서울시 공영주차장 json을 활용한 공영주차장 지도', tags: ['React', 'Vite', 'Tailwind', 'API'], github: 'https://github.com/gyfo0112', live: 'https://wifi-spot-xi.vercel.app/map' },
  { id: 4, name: 'Emotion-Diary', description: '그날의 감정을 이모티콘으로 표현하는 일기장', tags: ['React', 'Vite', 'React-Router'], github: 'https://github.com/gyfo0112/emotion-diary', live: 'https://emotion-diary-teal-five.vercel.app/' },
  { id: 5, name: 'Weather-App', description: 'OpenWeather의 Api를 통해 만든 날씨앱', tags: ['React', 'Vite', 'Axios', 'API'], github: 'https://github.com/gyfo0112', live: 'https://weather-app-beige-mu-46.vercel.app/' },
  { id: 6, name: 'Router', description: '간단한 웹페이지 레이아웃 페이지', tags: ['React', 'Vite', 'React-Router', 'Swiper'], github: 'https://github.com/gyfo0112', live: 'https://router-exam-od2t.vercel.app/' },
  { id: 7, name: 'EndWordGame', description: '간단하게 즐길 수 있는 끝말잇기 게임', tags: ['React', 'Vite', 'Sass'], github: 'https://github.com/gyfo0112', live: 'https://end-word-game-three.vercel.app' },
  { id: 8, name: 'Timer-App', description: '간단하게 만든 타이머', tags: ['React', 'Vite'], github: 'https://github.com/gyfo0112', live: 'https://timer-app-pi-flame.vercel.app/' },
];
