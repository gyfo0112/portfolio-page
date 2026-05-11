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
  blog: 'https://www.notion.so/32f7290dbe06808da5a1cd775d2b6852?source=copy_link',
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
    category: '[카테고리 입력칸]',
    name: 'Haru-Piece(하루조각.)',
    description: '사진을 업로드해서 하루를 마무리하는 포토 일기장',
    languages: ['JavaScript'],
    frameworks: ['React / Vite', 'MySql / AWS S3'],
    tools: ['Docker / Nginx / Git'],
    github: 'https://github.com/gyfo0112',
    live: 'https://example.com',
    image: project1,
  },
  {
    id: 2,
    category: '[카테고리 입력칸]',
    name: 'TOCOBO : Re-edit by ADER',
    description: '토코보 페이지를 아더에러의 느낌을 살려 새로 디자인한 작업',
    languages: ['JavaScript'],
    frameworks: ['React / Vite'],
    tools: ['Git / Vercel / VS Code'],
    github: 'https://github.com/gyfo0112',
    live: 'https://example.com',
    image: project2,
  },
  {
    id: 3,
    category: '[카테고리 입력칸]',
    name: 'EmotionDiary',
    description: '하루의 감정을 기록하고 돌아볼수있는 일기장',
    languages: ['JavaScript'],
    frameworks: ['React / Vite'],
    tools: ['Git / Vercel / VS Code'],
    github: 'https://github.com/gyfo0112',
    live: 'https://example.com',
    image: project3,
  },
];

export const miniProjects = [
  { id: 1, name: 'Weather-App', description: 'OpenWeather의 Api를 통해 만든 날씨앱', tags: ['Api', 'Json'], github: 'https://github.com/gyfo0112', live: '#' },
  { id: 2, name: 'Emotion-Diary', description: '그날의 감정을 이모티콘으로 표현하는 일기장', tags: ['[기술 입력칸]', '[기술 입력칸]'], github: 'https://github.com/gyfo0112', live: '#' },
  { id: 3, name: 'FreePark-Spot', description: '카카오맵 Api와 서울시 공영주차장 json을 활용한 공영주차장 지도', tags: ['[기술 입력칸]', '[기술 입력칸]'], github: 'https://github.com/gyfo0112', live: '#' },
  { id: 4, name: 'Timer-App', description: '간단하게 만든 타이머', tags: ['[기술 입력칸]', '[기술 입력칸]'], github: 'https://github.com/gyfo0112', live: '#' },
  { id: 5, name: 'EndWordGame', description: '간단하게 즐길 수 있는 끝말잇기 게임', tags: ['[기술 입력칸]', '[기술 입력칸]'], github: 'https://github.com/gyfo0112', live: '#' },
  { id: 6, name: 'Router', description: '간단한 웹페이지 레이아웃 페이지', tags: ['[기술 입력칸]', '[기술 입력칸]'], github: 'https://github.com/gyfo0112', live: '#' },
];
