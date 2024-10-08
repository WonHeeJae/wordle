const answer = "APPLE";

let attempt = 0;
let index = 0;

function app_start() {
  function handleKeydown(e) {
    const input_key = e.key.toUpperCase();
    const input_keyCode = e.keyCode;

    const input_block = document.querySelector(
      `.board-block[data-index='${attempt}${index}']`
    );
    function exit_game() {
      window.removeEventListener("keydown", handleKeydown);
    }

    function check_Answer() {
      let count_정답 = 0;
      for (let i = 0; i < 5; i++) {
        const 정답_글자 = answer[i];
        const block = document.querySelector(
          `.board-block[data-index='${attempt}${i}']`
        );
        const block_글자 = block.innerText;

        if (정답_글자 === block_글자) {
          count_정답++;
          block.style.backgroundColor = "#6AAA64";
          block.style.borderColor = "#6AAA64";
        } else if (answer.includes(block_글자)) {
          //불일치할때 위치는 다르나 포함은 됐는지 안됐는지 확인
          block.style.backgroundColor = "#C9B458";
          block.style.borderColor = "#C9B458";
        } else {
          //위치, 글자 모두 불일치
          block.style.backgroundColor = "#787C7E";
          block.style.borderColor = "#787C7E";
        }
      }

      console.log("c1");
      if (count_정답 === 5) {
        //종류 루틴
        console.log("c1");
        exit_game();
      } else if (attempt === 5) {
        //종료루틴
        console.log("c2");
        exit_game();
      } else {
        console.log("c3");
        attempt++;
        index = 0;
      }
    }

    if (index === 5) {
      if (e.key === "Enter") {
        //정답체크
        check_Answer();
      }
    } else if (input_keyCode >= 65 && input_keyCode <= 90) {
      input_block.innerText = input_key;
      index++;
    }
  }
  window.addEventListener("keydown", handleKeydown);
}

app_start();
