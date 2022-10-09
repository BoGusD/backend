function solution(s) {
  let answer = s;
  let numbers = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  for (let i = 0; i < numbers.length; i++) {
    let arr = answer.split(numbers[i]);

    answer = arr.join(i);
    console.log(arr);
    console.log(answer);
  }
  return Number(answer);
}
console.log(solution("one4seveneight"));
