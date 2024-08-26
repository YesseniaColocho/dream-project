<template>
  <main class="background-one-section">
    <audio ref="ping" src="/sound/215415__unfa__ping.flac"></audio>
    <div class="display">
      <p>{{ displayText }}</p>
      <input
        class="input"
        type="text"
        v-model="respuesta"
        @keypress.enter="darNombre"
      />
    </div>

    <section class="questionary-wrapper">
      <h3>Titulo</h3>
      <div class="questionary">
        <button @click="quizUser(1, 0)">sewerhyeryhrew</button>
        <button @click="quizUser(1, 1)">sryeryre</button>
        <button @click="quizUser(1, -1)">sfryreyeryer</button>
        <button @click="quizUser(1, -2)">sfryeryreyre</button>
        <button @click="quizUser(1, 2)">afryeryres</button>
        <button @click="quizUser(1, 0)">aswfryreyre</button>
        <button @click="quizUser(1, 0)">afryeryres</button>
        <button @click="quizUser(1, 0)">aswfryreyre</button>
      </div>
    </section>
  </main>
</template>

<script setup>
const { $gsap } = useNuxtApp();
const displayText = ref("");
const respuesta = ref("");
const ping = ref(null);

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
  localStorage.setItem("name", respuesta.value);
  ping.value.play();
  tl.to(".display", {
    opacity: 0,
  });

  tl.to(".questionary-wrapper", {
    opacity: 1,
    display: "block",
  });
}

function quizUser(quizNumber, points) {
  localStorage.setItem(`question-${quizNumber}`, points);
  if (quizNumber === 1) {
    //introducción a fondo negro y titulo
    //enviar a ruta seleccionada
    //cargar ruta del jSon
  }
  //cambiar el cuestionario al acabar de selecionar la opción deseada.
  //
}
</script>

<style scoped lang="scss">
.background-one-section {
  background: url(/meteoro1.gif);
  background-size: cover;
  background-position: center;
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
  .questionary {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
