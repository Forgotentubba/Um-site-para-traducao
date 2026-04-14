const botaoTraduzir = document.getElementById("btn-traduzir");
const botaoMicrofone = document.getElementById("btn-microfone");
const textoInput = document.querySelector(".input-texto");
const idiomaSelect = document.querySelector(".idioma");
const resultado = document.querySelector(".traducao");

async function traduzir() {
    const texto = textoInput.value.trim();
    const idiomaDestino = idiomaSelect.value;

    if (texto === "") {
        resultado.innerText = "Digite um texto para traduzir.";
        return;
    }

    resultado.innerText = "Traduzindo...";

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=pt&tl=${idiomaDestino}&dt=t&q=${encodeURIComponent(texto)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const traducao = data[0].map(item => item[0]).join("");
        resultado.innerText = traducao;
    } catch (error) {
        resultado.innerText = "Erro ao traduzir. Verifique sua conexão e tente novamente.";
    }
}

botaoTraduzir.addEventListener("click", traduzir);

textoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        traduzir();
    }
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.continuous = false;
    recognition.interimResults = false;

    botaoMicrofone.addEventListener("click", () => {
        recognition.start();
        botaoMicrofone.style.backgroundColor = "red";
        resultado.innerText = "Ouvindo...";
    });

    recognition.onresult = (event) => {
        const falas = event.results[0][0].transcript;
        textoInput.value = falas;
        botaoMicrofone.style.backgroundColor = "";
        traduzir();
    };

    recognition.onerror = () => {
        botaoMicrofone.style.backgroundColor = "";
        resultado.innerText = "Erro ao usar o microfone. Verifique as permissões do navegador.";
    };

    recognition.onend = () => {
        botaoMicrofone.style.backgroundColor = "";
    };
} else {
    botaoMicrofone.addEventListener("click", () => {
        resultado.innerText = "Seu navegador não suporta reconhecimento de voz.";
    });
}
