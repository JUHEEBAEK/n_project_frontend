
export const signIn = async data => {
  return await this.post(`/api/user/login`, data);
};

// export async function verify(data) {
//   console.log(data);
//   return await this.get(`/auth/verify`, {
//     headers: {
//       common: {
//         Authorization: data
//       }
//     }
//   });
// }

// join 기능

