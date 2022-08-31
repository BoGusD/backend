// /* /* /* //@ts-check
let userId = '';

const promise = new Promise((resolve, reject) =>{
    console.log('프로미스 내부의 코드는 바로 실행 됩니다');
    setTimeout(()=>{
        
       
        if(userId === 'bogus'){
            resolve(userId);
        }else{
            reject(new Error('서버 통신이 원할하지 않습니다.'));
        }
    }, 2000);
});

promise
    .then((value) =>{
    console.log(`요청하신 id는 ${value}입니다.`);
    })
    .catch((err) => {
    console.log(err);
    })
    .finally(() => {
    console.log('프로미스 시퀀스가 끝났습니다.');
    });
    
// console.log('1');
// setTimeout(()=> {
//     console.log('callback');
// }, 1000);
// console.log('2');
//  */
// //disable esint


// //callback 코드가 없으면 id를 정확하게 입력해도 로그인실패로 응답됨
// let id = prompt ('아이디를 입력하세요!');
// let userId = '';

// console.log('로그인 시도');
// setTimeout(function cb1(){
//     userId='bogus';
//     console.log('아이디 정보 획득 완료!');


// if(id ===userId) {
//     console.log('로그인 성공');  
// } else{
//     console.log('로그인 실패');
// }
// }, 2000);  