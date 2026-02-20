const botaoTraduzir = document.querySelector(".controle button");
const textoInput = document.querySelector(".input-texto");
const idiomaSelect = document.querySelector(".idioma");
const resultado = document.querySelector(".traducao");

// Mapeamento dos idiomas para código ISO
const idiomas = {
    "inglês": "en",
    "japonês": "ja",
    "alemão": "de",
    "russo": "ru",
    "coreano": "ko",
    "chines": "zh",
    "francês": "fr"
};

botaoTraduzir.addEventListener("click", () => {

    const texto = textoInput.value.trim();
    const idiomaDestino = idiomas[idiomaSelect.value];

    if (texto === "") {
        resultado.innerText = "Digite um texto para traduzir.";
        return;
    }

    resultado.innerText = "Traduzindo...";

    fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=pt|${idiomaDestino}`)
        .then(response => response.json())
        .then(data => {
            resultado.innerText = data.responseData.translatedText;
        })
        .catch(() => {
            resultado.innerText = "Erro ao traduzir. Tente novamente.";
        });

});