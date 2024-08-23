<template>
  <main class="background-one-section">
    <audio ref="start" src="/sound/215415__unfa__ping.flac"></audio>
    <div class="display">
      <p>{{ displayText }}</p>
      <input type="text" v-model="respuesta" @keypress.enter="darNombre" />
    </div>
  </main>
</template>

<script setup>
const { $gsap } = useNuxtApp();
const displayText = ref("");
const respuesta = ref("");
const start = ref(null);

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
  changesText("Hello", true);
  changesText("Lorem Ipsum ad quatea in terminum ad centratis");
  changesText("¿Cómo te llamas?");
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
  start.value.play();
  tl.to(".display", {
    opacity: 0,
  });
}
</script>

<style scoped lang="scss">
.background-one-section {
  background: url(/meteor.webp);
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
  input {
    opacity: 0;
  }
}
</style>
