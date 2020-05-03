
const state = {
    rankingData: {
        'GOAL': [
          {
            name: 'Frozen Yogurt',
            score: 159,
          },
          {
            name: 'Ice cream sandwich',
            score: 237,
          },
          {
            name: 'Eclair',
            score: 262,
          },
        ], 
        'ASSIST': [
          {
            name: '탕수육',
            score: 45,
          },
          {
            name: '치킨',
            score: 22,
          },
          {
            name: '피자',
            score: 11,
          },
        ], 
        'CLEAN SHEET': [
          {
            name: '상추',
            score: 11159,
          },
          {
            name: '배추',
            score: 3237,
          },
          {
            name: '김치',
            score: 1262,
          },
        ],
        
      }

}
const mutations = {
}
const actions = {
    //받아오기
    // 사람이름 기록 
    // 쿼리 game report태이블의 event column이 goal일 경우
    // assist과 goal을 기록해보자

    // 그러면 어떻게 clean을 기록하는가
    // game에서 0대 0을 기록한 게임을 제외하고 
    // 먹은 점수가 0인 골키퍼 포지션 선수들을 모은다음에
    // 누적값을 구한다

}

export default {
    state,
    mutations,
    actions
};