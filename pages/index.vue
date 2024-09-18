<template>
  <main>
    <div class="background-one-section"></div>
    <div class="route-background neutral-background"></div>
    <div class="route-background good-background" style="opacity: 0"></div>
    <div class="route-background bad-background" style="opacity: 0"></div>

    <audio
      ref="ping"
      src="/dream-project/sound/215415__unfa__ping.flac"
    ></audio>
    <audio ref="sadMusic" src="/dream-project/sound/sadMusic.wav" loop></audio>

    <div class="display">
      <p>{{ displayText }}</p>
      <input
        class="input"
        type="text"
        v-model="nombreJugador"
        @keypress.enter="darNombre"
      />
    </div>

    <section class="questionary-wrapper question-one">
      <h3>{{ questionOne.quiz }}</h3>
      <div class="questionary">
        <button
          v-for="answer in questionOne.answers"
          @click="answerFirstQuestion(answer.points)"
        >
          {{ answer.text }} {{ answer.points }}
        </button>
      </div>
    </section>

    <h1 class="title-game">
      <span>Dream Project</span>
    </h1>

    <section class="black-element">
      <div class="story-text">{{ storyText }}</div>
      <button class="false-button" @click="nextText">==></button>
    </section>

    <section class="questionary-wrapper all-questions">
      <div class="question" v-for="(question, index) in questionary">
        <h3>{{ question.quiz }}</h3>
        <div class="questionary">
          <button
            v-for="answer in question.answers"
            @click="saveAnswer(index, answer.points)"
          >
            {{ answer.text }} ({{ answer.points }})
          </button>
        </div>
      </div>
      <button @click="finishQuestionary()">Enviar</button>
    </section>
  </main>
</template>

<script setup>
import { questionaries } from "~/utils/routes";
import { Texts } from "~/utils/text";
import { fadeTextLetters } from "~/utils/helpers";
const { $gsap } = useNuxtApp();

//Elements
const displayText = ref("");
const nombreJugador = ref(localStorage.getItem("name"));

//Audio
const ping = ref(null);
const sadMusic = ref(null);

//Respuestas
const answers = [[]];

//Ruta actual
const actualRoute = ref("neutral");

watch(actualRoute, (newVal, oldVal) => {
  tl.to(
    `.${oldVal}-background`,
    {
      opacity: 0,
    },
    "<"
  );
  tl.to(
    `.${newVal}-background`,
    {
      opacity: 1,
    },
    "<"
  );
});

//Textos
const textNumber = ref(1);
const storyText = computed(() => {
  return Texts[`text${textNumber.value}`][actualRoute.value].replaceAll(
    "$U",
    nombreJugador.value
  );
});

//Cuestionarios
const questionaryNumber = ref(1); //"Nivel"
const questionary = computed(() => {
  return questionaries[questionaryNumber.value - 1][actualRoute.value]; //questionaries[1]['neutral']
});

let tl;

onMounted(() => {
  tl = $gsap.timeline({
    pasued: true,
    defaults: {
      duration: 2,
    },
    // other callbacks:
    // onStart, onUpdate, onRepeat, onReverseComplete
  });
  changesText("En cuanto la oscuridad llega y el ruido se desvanece...", true);
  changesText(
    "me sumerjo nuevamentre entre las nubes, recorriendo el camino hacía aquel extaño lugar..."
  );
  changesText("Aún a veces me preguto ... ¿Quién soy?");
  tl.to(".display input", {
    opacity: 1,
    display: "inline",
    onUpdate: () => {
      document.querySelector(".display input").focus();
    },
  });
  tl.play;
});

function changesText(text, first = false) {
  tl.to(".display", {
    opacity: 0,
    delay: first ? 2 : 0,
    duration: first ? 1 : 2,
    onComplete: () => (displayText.value = text),
  });
  tl.to(".display", {
    opacity: 1,
  });
}

function darNombre() {
  localStorage.setItem("name", nombreJugador.value);
  ping.value.play();
  tl.to(".display", {
    opacity: 0,
    display: "none",
  });

  tl.to(".question-one", {
    opacity: 1,
    display: "block",
  });
}

function answerFirstQuestion(points) {
  answers[0][0] = points;
  localStorage.setItem(`answers`, answers);
  tl.to(".question-one", {
    opacity: 0,
    display: "none",
    pointerEvents: "none",
  });

  checkForRouteChange(points);

  sadMusic.value.play();
  //introducción a fondo negro y titulo
  tl.to(".background-one-section", {
    top: "-100vh",
    duration: 6,
  }).to(
    ".background-one-section",
    {
      backgroundPosition: "left 50% top 140vh",
      duration: 6,
    },
    "<"
  );

  tl.to(".title-game", {
    duration: 4,
    bottom: "50%",
  });
  tl.to(".title-game", {
    duration: 4,
    delay: 6,
    bottom: "100%",
  });
  startRoute();
}

function startRoute() {
  tl.to(".route-background", {
    top: 0,
    duration: 6,
  });
  tl.to(
    ".route-background",
    {
      backgroundPosition: "left 50% top 100vh",
      duration: 6,
      onComplete: () => {
        fadeTextLetters(".story-text");
      },
    },
    "<"
  );

  tl.to(".black-element", {
    opacity: 1,
    display: "block",
  });

  tl.to(".false-button", {
    opacity: 1,
    display: "block",
    delay: 7,
  });
}

function nextText() {
  if (Texts[`text${textNumber.value}`].toQuestionary) {
    questionaryNumber.value = Texts[`text${textNumber.value}`].toQuestionary;
    //Quitar texto y poner formnulario
    tl.to(".black-element", {
      opacity: 0,
      display: "none",
    });
    tl.to(".all-questions", {
      opacity: 1,
      display: "block",
      onComplete: () => {
        textNumber.value++;
      },
    });
  } else {
    textNumber.value++;
    setTimeout(() => fadeTextLetters(".story-text"), 5);
  }
}

function saveAnswer(answerIndex, points) {
  if (!answers[questionaryNumber.value]) {
    answers[questionaryNumber.value] = [];
  }
  answers[questionaryNumber.value][answerIndex] = points;
  localStorage.setItem(`answers`, answers);
}

function finishQuestionary() {
  calculateRoute(questionaryNumber.value);
  tl.to(".all-questions", {
    opacity: 0,
    display: "none",
  });
  tl.to(".black-element", {
    opacity: 1,
    display: "block",
  });
}

function calculateRoute() {
  let points = 0;
  let answersLength = 0;
  answers.forEach((level) => {
    answersLength += level.length;
    level.forEach((answerPoints) => (points += answerPoints));
  });
  const median = points / answersLength;

  checkForRouteChange(median);
}

function checkForRouteChange(value) {
  if (value <= -1) {
    actualRoute.value = "bad";
  } else if (value > -1 && value < 1) {
    actualRoute.value = "neutral";
  } else {
    actualRoute.value = "good";
  }
}
</script>

<style scoped lang="scss">
.background-one-section {
  background: url("/dream-project/meteoro1.gif");
  background-position: left 50% top 100vh;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  box-shadow: inset 0 0 3em 2em #000;
  width: 100vw;
  height: 100vh;
}

.neutral-background {
  background: url("/dream-project/moon.jpg");
}
.good-background {
  background: url("/dream-project/universo.jpg");
}
.bad-background {
  background: url("/dream-project/bosque.jpg");
}
.route-background {
  background-position: left 50% top 60vh;
  background-size: cover;
  position: absolute;
  top: 100vh;
  left: 0;
  overflow: hidden;
  box-shadow: inset 0 0 3em 2em #000;
  width: 100vw;
  height: 100vh;
}

.display {
  color: white;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .input {
    text-align: center;
    opacity: 0;
    padding: 5px;
    background-color: rgb(221, 220, 220);
    font-style: italic;
    font-family: "Edu";
    font-size: medium;
    border-radius: 7px;
    outline: none;
    border: none;
    display: none;
  }
}
.questionary-wrapper {
  opacity: 0;
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  max-height: calc(100vh - 50px);
  min-width: 30%;
  padding: 30px;
  overflow-y: auto;
  .questionary {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
.title-game {
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: -20%;
  transform: translate(0, 0);
  color: white;
  animation: bobbling infinite 4s ease-in-out;
  span {
    display: block;
    animation: rotation infinite 4s linear;
  }
}
.black-element {
  opacity: 0;
  display: none;
  position: absolute;
  color: white;
  background: black;
  width: 70%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px;
  border-radius: 10px;

  .false-button {
    opacity: 0;
    display: none;
    position: absolute;
    right: 0;
    bottom: -40px;
    border-radius: 5px;
  }
}

@keyframes bobbling {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, -15px);
  }
  100% {
    transform: translate(0, 0);
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  33% {
    transform: rotate(1deg);
  }
  66% {
    transform: rotate(-1deg);
  }
  100% {
    transform: rotate(-0deg);
  }
}
</style>
