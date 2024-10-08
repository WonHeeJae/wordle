const 정답 = "APPLE";

let index = 0;
let attempts = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div"); //추가할 div 변수 선언
    div.innerText = "게임이 종료됐습니다."; //추가할 div에 들어갈 문구
    div.style =
      "display:flex;justify-content:center;align-items:center;position:absolute;top:40vh;left:45vw;background-Color:white;width:200px;height:100px;"; //스타일적용
    document.body.appendChild(div); //body안에 div항목 추가
  };

  const handleKeydown = (event) => {
    /*const erase = () => {
      if (attempts >= 0 && index > 0) {
        const erase_Block = document.querySelector(
          `.board-block[data-index="${attempts}${index - 1}"]`
        );
        erase_Block.innerText = "";
        index = index - 1;
      }
    };*/
    const nextLine = () => {
      if (attempts === 5) {
        return gameover();
      }
      attempts++;
      index = 0;
    };

    const gameover = () => {
      window.removeEventListener("keydown", handleKeydown);
      displayGameover();
      clearInterval(timer);
    };

    const handleEnterKey = () => {
      let 맞은_개수 = 0;
      //정답확인
      let inputWord = "";
      for (let i = 0; i < 5; i++) {
        const block = document.querySelector(
          `.board-block[data-index='${attempts}${i}']`
        );

        const 입력한_글자 = block.innerText;
        const 정답_글자 = 정답[i];
        if (정답_글자 === 입력한_글자) {
          //글자와 일치할때
          맞은_개수++;
          block.style.backgroundColor = "#6AAA64";
          block.style.borderColor = "#6AAA64";
          block.style.color = "white";
        } else if (정답.includes(입력한_글자)) {
          //불일치할때 위치는 다르나 포함은 됐는지 안됐는지 확인
          block.style.backgroundColor = "#C9B458";
          block.style.borderColor = "#C9B458";
        } else {
          //위치, 글자 모두 불일치
          block.style.backgroundColor = "#787C7E";
          block.style.borderColor = "#787C7E";
        }
      }

      if (맞은_개수 === 5) {
        gameover();
      } else {
        nextLine();
      }
    };

    const handleBackSpace = () => {
      if (index !== 0) {
        const preBlock = document.querySelector(
          `.board-block[data-index='${attempts}${index - 1}']`
        );
        preBlock.innerText = "";
        index -= 1;
      }
    };

    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;

    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    ); //가져오려는 클래스의 속성값을 가져오는 방법

    if (index === 5) {
      if (event.key === "Enter") {
        handleEnterKey();
      } else {
        return;
      }
    } else if (event.key === "Backspace") {
      //erase();
      handleBackSpace();
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }

    /*
    if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      //1을 더하는 표현 3가지
      //index = index + 1;
      //index += 1;
      index++;
      
      if (index === 5) {
        attempts++;
        index = 0;
      }
        
    }*/
    //로직들
  };
  const startTimer = () => {
    const 시작_시간 = new Date();
    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);

      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "00");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "00");

      const timerDiv = document.querySelector(".timer");
      timerDiv.innerText = `time : ${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
  };
  startTimer();

  window.addEventListener("keydown", handleKeydown);
}

appStart();
