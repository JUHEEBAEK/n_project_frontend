/*
  1. 목적
    mutation 에 set 용도로 쓰이는 반복되는 패턴의 함수들을 쉽게 만들어 주기 위함.

  2. 설명
    2-(1) set('drawer') set 으로 넘기는 값을 변하게 해준다.
    2-(2) set 으로 색을 바꿀 수 도 있고 이미지를 변경해 줄 수 도 있다.
*/

export const set = property => (state, payload) => {
  state[property] = payload;
};
