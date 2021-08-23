/*
라우터 메뉴 관리
- componentPath: src/view 하위 파일 path 정보
- meta: 라우터 부가정보
  - auth: 메뉴별 권한 리스트(A-운영진/U-회원)
  - title: navigation.json text
*/

const routes = [
  {
    path: "/home",
    name: "home",
    componentPath: "Home",
    meta: {
      title: "홈",
      auth: ["A", "U"]
    }
  },
  {
    path: "/team",
    name: "team-admin",
    componentPath: "nav/team/TeamAdmin",
    meta: {
      icon: "fsnnnn_emblem_official2.png",
      title: "팀",
      auth: ["A", "U"]
    }
  },
  {
    path: "/team/add",
    name: "teamAdd",
    componentPath: "nav/team/TeamDetails",
    meta: {
      title: "팀 추가",
      auth: ["A", "U"]
    }
  },
  {
    path: "/team/:teamId",
    name: "teamDetails",
    componentPath: "nav/team/TeamAdd",
    meta: {
      title: "팀 상세정보",
      auth: ["A", "U"]
    }
  },
  {
    path: "/unitTeam/:teamId",
    name: "unitTeamDetails",
    componentPath: "nav/team/UnitDetails",
    meta: {
      title: "유닛 팀 상세정보",
      auth: ["A", "U"]
    }
  },
  {
    path: "/adminMember",
    name: "adminMember",
    componentPath: "nav/member/MemberAdmin",
    meta: {
      icon: "team.png",
      title: "회원관리",
      auth: ["A"]
    }
  },
  {
    path: "/member/add",
    name: "memberAdd",
    componentPath: "nav/member/MemberAdd",
    meta: {
      title: "회원추가",
      auth: ["A"]
    }
  },
  {
    path: "/member/:memberId",
    name: "memberUpdatePage",
    componentPath: "nav/member/Profile",
    meta: {
      title: "회원정보 수정 ",
      auth: ["A"]
    }
  },
  {
    path: "/attend",
    name: "attend",
    componentPath: "nav/Attend",
    meta: {
      icon: "046-calendar.png",
      title: "참석현황",
      auth: ["A", "U"]
    }
  },
  {
    path: "/stadium",
    name: "stadium",
    componentPath: "nav/stadium/Stadium",
    meta: {
      icon: "stadium.png",
      title: "경기장",
      auth: ["A", "U"]
    }
  },
  {
    path: "/stadium/add",
    name: "stadiumAdd",
    componentPath: "nav/stadium/StadiumAdd",
    meta: {
      title: "경기장 추가",
      auth: ["A", "U"]
    }
  },
  {
    path: "/stadium/:stadiumId",
    name: "stadiumUpdate",
    componentPath: "nav/stadium/StadiumUpdate",
    meta: {
      title: "경기장 수정",
      auth: ["A", "U"]
    }
  },
  {
    path: "/calendar",
    name: "calendar",
    componentPath: "nav/Schedule",
    meta: {
      icon: "deadline.png",
      title: "일정",
      auth: ["A", "U"]
    }
  },
  {
    path: "/squad",
    name: "squad",
    componentPath: "nav/squad/Squad",
    meta: {
      icon: "003-tshirt.png",
      title: "스쿼드",
      auth: ["A", "U"]
    }
  },
  {
    path: "/matchPrepare",
    name: "matchPrepareBasic",
    componentPath: "nav/squad/MatchPrepare",
    meta: {
      icon: "soccer.png",
      title: "매치 준비",
      auth: ["A", "U"]
    }
  },
  {
    path: "/matchPrepare/schedule/:schedule_id/quarter/:quarter",
    name: "matchPrepare",
    componentPath: "nav/squad/MatchPrepare",
    meta: {
      title: "매치 준비",
      auth: ["A", "U"]
    }
  },
  {
    path: "/matchInput/schedule/:schedule_id/quarter/:quarter",
    name: "matchInput",
    componentPath: "nav/match/MatchInput",
    meta: {
      title: "경기 기록 입력",
      auth: ["A", "U"]
    }
  },
  {
    path: "/member",
    name: "member",
    componentPath: "footer/Member",
    meta: {
      icon: "team.png",
      title: "회원",
      auth: ["A", "U"]
    }
  },
  {
    path: "/squadView",
    name: "squadView",
    componentPath: "footer/Squad",
    meta: {
      icon: "003-tshirt.png",
      title: "SQUAD",
      auth: ["A", "U"]
    }
  },
  {
    path: "/member/details",
    name: "myPageDetails",
    componentPath: "footer/MemberDetails",
    meta: {
      icon: "player.png",
      title: "내 기록",
      auth: ["A", "U"]
    }
  },
  {
    path: "/gameReport",
    name: "gameReport",
    componentPath: "footer/GameReport",
    meta: {
      icon: "037-scoreboard.png",
      title: "리포트",
      auth: ["A", "U"]
    }
  },
  {
    path: "/gameReport/:schedule_id/details/:game_id",
    name: "gameReportDetail",
    componentPath: "footer/GameReportDetail",
    meta: {
      title: "경기 상세",
      auth: ["A", "U"]
    }
  },
  {
    path: "/leagueReport",
    name: "leagueReport",
    componentPath: "footer/LeagueReport",
    meta: {
      title: "리그 리포트",
      auth: ["A", "U"]
    }
  },
  {
    path: "/ranking",
    name: "ranking",
    componentPath: "footer/Ranking",
    meta: {
      icon: "006-podium.png",
      title: "랭킹",
      auth: ["A", "U"]
    }
  },
  {
    path: "/",
    name: "notFound",
    componentPath: "notFound",
    meta: {
      auth: ["A", "U"]
    }
  }
];

const leftMenus = ["team-admin", "adminMember", "team", "attend", "stadium", "calendar", "squad", "matchPrepareBasic"];

const footerMenus = ["member", "squadView", "myPageDetails", "gameReport", "ranking"];

export { routes, leftMenus, footerMenus };
