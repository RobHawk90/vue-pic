export default {
  bind(el, binding) {
    let value = binding.value || 0;
    let proporcao = 0;
    let modifiers = binding.modifiers;
    let arg = binding.arg;
    let efeito = "";

    el.addEventListener("dblclick", () => {
      if (arg === "scale") {
        efeito = `scale(${value})`;
      } else {
        if (modifiers.reverso) proporcao -= value;
        else proporcao += value;
        efeito = `rotate(${proporcao}deg)`;
      }
      el.style.transform = efeito;
      el.style.transition = modifiers.animar ? "transform 300ms" : "";
    });
  }
};
