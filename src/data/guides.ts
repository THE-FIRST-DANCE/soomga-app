export type GuideType = {
  id: number;
  photo: string;
  name: string;
  region: string;
  birthDate: string;
  gender: string;
  description: string;
  stars: number;
  temp: number;
  guideCount: number;
  language: string[];
  tags: {
    id: number;
    name: string;
  }[];
};

export const guides = [
  {
    id: 1,
    photo:
      "https://i.namu.wiki/i/QmbIdfT-NHnIb3KUMDX_oktsghL6h53bkOE2ug_acbotkWOIFSNmr5MsG6yW-sskffl_ExjPcygA2bAphb2IoD0bytOvp-HX0HE1gWWsNoLH3F02W61y27LbKwbvOYw1wU8ZhP4UiXY7ATdqGT3C9g.webp",
    name: "민지",
    region: "강원도",
    birthDate: new Date("2004-05-07T00:00:00.000Z").toISOString(),
    gender: "여자",
    description: "I'm Minji!",
    stars: 4.8,
    temp: 92,
    guideCount: 80,
    language: ["한국어", "English"],
    tags: [
      { id: 1, name: "#ESTJ" },
      { id: 2, name: "#Kpop" },
      { id: 3, name: "#영화감상" },
      { id: 4, name: "#드라마" },
      { id: 5, name: "#노래불러주기" },
      { id: 6, name: "#유머러스" },
      { id: 7, name: "#해리포터" },
      { id: 8, name: "#여행" },
      { id: 9, name: "#독서" },
    ],
  },
  {
    id: 2,
    photo:
      "https://i.namu.wiki/i/Pij2oJ3Ktf7BX5sBHeWROiieSUgkS1a5Tpzt8kY3zUXm0S_-uCZFFEXaimbYTW_UxkYdGinfdyx2duJEKYSQb7-XnGKtj0Bi_B8QMT3FsGjpZ0xd_buHk_5QmNuuCV3-2STZ5kdvKTuUTDgg-6IYNw.webp",
    name: "하니",
    region: "서울특별시",
    birthDate: new Date("2004-10-06T00:00:00.000Z").toISOString(),
    gender: "남자",
    description: "I'm Hanni!",
    stars: 4.3,
    temp: 60,
    guideCount: 40,
    language: ["한국어", "English", "Vietnamese"],
    tags: [
      { id: 1, name: "#INFP" },
      { id: 2, name: "#Kpop" },
      { id: 3, name: "#유튜브" },
      { id: 4, name: "#공연관람" },
      { id: 5, name: "#노래불러주기" },
      { id: 6, name: "#언어교환" },
      { id: 7, name: "#드라이브" },
      { id: 8, name: "#패션" },
      { id: 9, name: "#산책" },
    ],
  },
  {
    id: 3,
    photo:
      "https://i.namu.wiki/i/jLt6JzGh5ubLdwp7XZNB_Ju8KdOrN9rgyByfY9xgpy0oZOcYLKUTF0afGlW3Gxw99brC4yphS8btlym5u1VTlnFDrrQWaaULysb_Yh8gtP6YjrijrvNIYTbDGNquUaS-qdYsECtTPdNdR8-qZD1KVg.webp",
    name: "다니엘",
    region: "경기도",
    birthDate: new Date("2005-04-11T00:00:00.000Z").toISOString(),
    gender: "여자",
    description: "I'm Danielle!",
    stars: 4.6,
    temp: 77,
    guideCount: 77,
    language: ["한국어", "English"],
    tags: [
      { id: 1, name: "#ENFP" },
      { id: 2, name: "#Kpop" },
      { id: 3, name: "#영화감상" },
      { id: 4, name: "#넷플릭스" },
      { id: 5, name: "#노래불러주기" },
      { id: 6, name: "#디즈니" },
      { id: 7, name: "#대인관계" },
      { id: 8, name: "#친구사귀기" },
      { id: 9, name: "#파스타" },
    ],
  },
  {
    id: 4,
    photo:
      "https://i.namu.wiki/i/C-V89EwsWR3gF76iKVr67Ed6pGfUWskALPcDXQoGZ1pGJn9vAQLhE90p4A7j4liFa8QBVS81Xy_codemBGOtcOm-S6_c7m336h5uGcQsHT1rEgDS3c_e9fN6VlEzjrJkNUnlxekbEjyjeCVzlZib-Q.webp",
    name: "해린",
    region: "경기도",
    birthDate: new Date("2006-05-15T00:00:00.000Z").toISOString(),
    gender: "남자",
    description: "I'm Haerin!",
    stars: 4.1,
    temp: 65,
    guideCount: 40,
    language: ["한국어", "English"],
    tags: [
      { id: 1, name: "#INTJ" },
      { id: 2, name: "#Kpop" },
      { id: 3, name: "#영화감상" },
      { id: 4, name: "#드라마" },
      { id: 5, name: "#넷플릭스" },
      { id: 6, name: "#애니메이션" },
      { id: 7, name: "#집콕" },
      { id: 8, name: "#음악" },
      { id: 9, name: "#햄버거" },
    ],
  },
  {
    id: 5,
    photo:
      "https://i.namu.wiki/i/vuyQGsxqEQKS6fzhE7psuDrup0T2cN5frkg_Dnai9606xKDoKuEm6GSXbH4GpfGufHSC3plqaCQG9LEXzsI20zMhkztS7hQTmaGBdVCFCL_zuyMgGBB4c96ivf0L3yrr2yhqAbdKrlor-lTAk4P6Tg.webp",
    name: "혜인",
    region: "인천광역시",
    birthDate: new Date("2008-04-21T00:00:00.000Z").toISOString(),
    gender: "여자",
    description: "I'm Hyein!",
    stars: 4.8,
    temp: 75,
    guideCount: 80,
    language: ["한국어", "English"],
    tags: [
      { id: 1, name: "#INFP" },
      { id: 2, name: "#Kpop" },
      { id: 3, name: "#외향적" },
      { id: 4, name: "#패션" },
      { id: 5, name: "#노래불러주기" },
      { id: 6, name: "#사진" },
      { id: 7, name: "#디자인" },
      { id: 8, name: "#필름카메라" },
      { id: 9, name: "#베이킹" },
    ],
  },
  {
    id: 6,
    photo:
      "https://i.namu.wiki/i/QmeaTW3wq13-8CWl-vwJ1Vo8PmlbS1FSITLvnywB-HmwRfRl3qh7-62nSKxLC3kjlDayMIwrCTi6mj_RXtCTkTchNDpp2bnjgeFFAgN0lcbJPpHYex2dkMykR1zJ92lLKg1wW0jgKdWD-XQ71YyIUA.webp",
    name: "가을",
    region: "인천광역시",
    birthDate: new Date("2002-09-24T00:00:00.000Z").toISOString(),
    gender: "여자",
    description: "I'm Gaeul!",
    stars: 4.6,
    temp: 45,
    guideCount: 20,
    language: ["한국어", "English"],
    tags: [
      { id: 1, name: "#ISTJ" },
      { id: 2, name: "#Kpop" },
      { id: 3, name: "#게임" },
      { id: 4, name: "#유튜브" },
      { id: 5, name: "#노래불러주기" },
      { id: 6, name: "#드라마" },
      { id: 7, name: "#넷플릭스" },
      { id: 8, name: "#디저트" },
      { id: 9, name: "#유머러스" },
    ],
  },
  {
    id: 7,
    photo:
      "https://i.namu.wiki/i/u0gMjUqIAnuuAPNMsUYRn6RH3Amq5uH866oV6vnOo6CyWNUMgXUlWoX8Hc8jJkf_00-9-Lgs6cdJ4s7bzIHwBlY861MAA5BVNGCN_KS7PQwhIAFXWN6o2jAuKobGIBkXPCpk3fiohd_6Ng1ziavBDg.webp",
    name: "안유진",
    region: "대전광역시",
    birthDate: new Date("2003-09-01T00:00:00.000Z").toISOString(),
    gender: "남자",
    description: "I'm Yujin!",
    stars: 4.3,
    temp: 50,
    guideCount: 50,
    language: ["한국어", "English"],
    tags: [
      { id: 1, name: "#ESTP" },
      { id: 2, name: "#ISTP" },
      { id: 3, name: "#Kpop" },
      { id: 4, name: "#애니메이션" },
      { id: 5, name: "#노래불러주기" },
      { id: 6, name: "#쇼핑" },
      { id: 7, name: "#낙천적" },
      { id: 8, name: "#뷰티" },
      { id: 9, name: "#영화감상" },
    ],
  },
  {
    id: 8,
    photo:
      "https://i.namu.wiki/i/0loxrECDHdD_JISekO7nNFF2k2_uq627YTFaOkYVI57hdNaRdsnP2hst2034-rXfWzDh7STEF1jCyWFb2Ebr1jOPmxeApraQbJA_0APutze5d1tYB5TEuexiAfWCSiEKQetEzYxFTRFqVgf1ucKcdg.webp",
    name: "레이",
    region: "서울특별시",
    birthDate: new Date("2004-02-03T00:00:00.000Z").toISOString(),
    gender: "남자",
    description: "I'm Rei!",
    stars: 4.1,
    temp: 34,
    guideCount: 30,
    language: ["한국어", "日本語", "English"],
    tags: [
      { id: 1, name: "#INFJ" },
      { id: 2, name: "#Kpop" },
      { id: 3, name: "#가벼운수다" },
      { id: 4, name: "#지브리" },
      { id: 5, name: "#노래불러주기" },
      { id: 6, name: "#여행" },
      { id: 7, name: "#독서" },
      { id: 8, name: "#뷰티" },
      { id: 9, name: "#유머러스" },
    ],
  },
  {
    id: 9,
    photo:
      "https://i.namu.wiki/i/9yNnY4ujxgwAO_j0Gt1aXCFm6O4bXKvpUzMF_rSYeHCZF6r9tNJCZ350bhhEkbblEIX_o7EM4G6-OAHVF7dR1uqMxQSn-VQM2KImq_uZCC9vRXBp5B6T3QKnBOGAabDN1N4dKc4sVKofPnzpxJegrg.webp",
    name: "리즈",
    region: "제주특별자치도",
    birthDate: new Date("2004-11-21T00:00:00.000Z").toISOString(),
    gender: "남자",
    description: "I'm Liz!",
    stars: 4.3,
    temp: 45,
    guideCount: 40,
    language: ["한국어", "English"],
    tags: [
      { id: 1, name: "#INFJ" },
      { id: 2, name: "#Kpop" },
      { id: 3, name: "#가벼운수다" },
      { id: 4, name: "#지브리" },
      { id: 5, name: "#노래불러주기" },
      { id: 6, name: "#여행" },
      { id: 7, name: "#독서" },
      { id: 8, name: "#뷰티" },
      { id: 9, name: "#유머러스" },
    ],
  },
  {
    id: 10,
    photo:
      "https://i.namu.wiki/i/vWnlonT4HJr6W3qNlPwyxH1WwGZk-7U0qp8WTNx_UHdBhkz7LmgS6nourfuLagblRjqTFQHoR0GIiKz7Y5hV_Vmn8G31LMAUhdh7ID0jGl249ys68DCfvgOUMLeKpxZt-QVdDpRyWWm9nxC_sLcE8A.webp",
    name: "이서",
    region: "서울특별시",
    birthDate: new Date("2007-02-21T00:00:00.000Z").toISOString(),
    gender: "여자",
    description: "I'm Leeseo!",
    stars: 4.6,
    temp: 88,
    guideCount: 50,
    language: ["한국어", "English"],
    tags: [
      { id: 1, name: "#INFJ" },
      { id: 2, name: "#Kpop" },
      { id: 3, name: "#가벼운수다" },
      { id: 4, name: "#지브리" },
      { id: 5, name: "#노래불러주기" },
      { id: 6, name: "#여행" },
      { id: 7, name: "#독서" },
      { id: 8, name: "#뷰티" },
      { id: 9, name: "#유머러스" },
    ],
  },
];
