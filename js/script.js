function calcTmb() {
    var peso = parseFloat(document.getElementById("peso").value);
    var altura = parseFloat(document.getElementById("altura").value);
    var idade = parseFloat(document.getElementById("idade").value);
    var generoInput = document.querySelector('input[name="genero"]:checked');
    var resultado = document.getElementById("resultado");

    if (!generoInput) {
        resultado.textContent = 'Dados incompletos.';
        resultado.style.color = 'red';
        return;
    }

    var genero = generoInput.value;
    var tmb;

    if (isNaN(peso) || isNaN(altura) || isNaN(idade) || peso <= 0 || altura <= 0 || idade <= 0) {
        resultado.textContent = 'Dados incompletos.';
        resultado.style.color = 'red';
        return;
    }

    if (peso >= 600 || altura >= 300 || idade >= 130) {
        resultado.textContent = 'Dados inválidos.';
        resultado.style.color = 'red';
        return;
    }

    if (genero === 'masculino') {
        tmb = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade);
    } else if (genero === 'feminino') {
        tmb = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade);
    } else {
        resultado.textContent = 'Por favor, selecione um gênero válido.';
        resultado.style.color = 'red';
        return;
    }

    resultado.textContent = `Sua Taxa Metabólica Basal (TMB) é: ${tmb.toFixed(2)} kcal.`;
    resultado.style.color = 'white';
}

function gastoCal() {
    var atividadeInput = document.querySelector('input[name="atividade"]:checked');
    var resultadoGasto = document.getElementById("resultado-gasto");

    if (!atividadeInput) {
        resultadoGasto.textContent = 'Por favor, selecione um nível de atividade.';
        resultadoGasto.style.color = 'red';
        return;
    }

    var atividade = atividadeInput.value;
    var tmbText = document.getElementById("resultado").textContent;
    var tmb = parseFloat(tmbText.match(/[\d.]+/g));

    if (isNaN(tmb)) {
        resultadoGasto.textContent = 'Calcule a TMB primeiro.';
        resultadoGasto.style.color = 'red';
        return;
    }

    var fator;

    switch (atividade) {
        case 'sedentario':
            fator = 1.2;
            break;
        case 'leve':
            fator = 1.375;
            break;
        case 'moderado':
            fator = 1.55;
            break;
        case 'intenso':
            fator = 1.725;
            break;
        case 'extremo':
            fator = 1.9;
            break;
        default:
            resultadoGasto.textContent = 'Nível de atividade inválido.';
            resultadoGasto.style.color = 'red';
            return;
    }

    var gasto = tmb * fator;

    resultadoGasto.textContent = `Seu gasto calórico diário é: ${gasto.toFixed(2)} kcal.`;
    resultadoGasto.style.color = 'white';
}

function calcDieta() {
    var objetivoInput = document.querySelector('input[name="objetivo"]:checked');
    var resultadoDieta = document.getElementById("resultado-dieta");

    if (!objetivoInput) {
        resultadoDieta.textContent = 'Selecione um objetivo.';
        resultadoDieta.style.color = 'red';
        return;
    }

    var objetivo = objetivoInput.value;
    var gcText = document.getElementById("resultado-gasto").textContent;
    var gc = parseFloat(gcText.match(/[\d.]+/g));

    if (isNaN(gc)) {
        resultadoDieta.textContent = 'Calcule os itens anteriores primeiro.';
        resultadoDieta.style.color = 'red';
        return;
    }

    var factor;

    switch (objetivo) {
        case 'emagrecer':
            factor = -400;
            break;
        case 'crescer':
            factor = 600;
            break;
        case 'manter':
            factor = 0;
            break;
        default:
            resultadoDieta.textContent = 'Objetivo inválido.';
            resultadoDieta.style.color = 'red';
            return;
    }

    var quantCalorias = gc + factor;

    resultadoDieta.textContent = `Sua ingestão calórica diária recomendada é: ${quantCalorias.toFixed(2)} kcal.`;
    resultadoDieta.style.color = 'white';
}

function calcMacros() {
    var quantCalorias = parseFloat(document.getElementById("resultado-dieta").textContent.match(/[\d.]+/g));

    if (isNaN(quantCalorias) || quantCalorias <= 0) {
        var resultadoMacros1 = document.getElementById("resultado-macros1");
        resultadoMacros1.textContent = 'Quantidade de calorias inválida.';
        resultadoMacros1.style.color = 'red';
        return;
    }

    var carbo = quantCalorias * 60 / 100;
    var prot = quantCalorias * 25 / 100;
    var lip = quantCalorias * 15 / 100;

    var resultadoMacros1 = document.getElementById("resultado-macros1");
    var resultadoMacros2 = document.getElementById("resultado-macros2");
    var resultadoMacros3 = document.getElementById("resultado-macros3");

    resultadoMacros1.textContent = 'Carboidratos: ' + carbo.toFixed(2) + ' kcal';
    resultadoMacros2.textContent = 'Proteínas: ' + prot.toFixed(2) + ' kcal';
    resultadoMacros3.textContent = 'Lipídios: ' + lip.toFixed(2) + ' kcal';
    
    resultadoMacros1.style.color = 'white';
    resultadoMacros2.style.color = 'white';
    resultadoMacros3.style.color = 'white';
}

function calcGramas() {
    // Obtendo os valores dos inputs e convertendo para números
    var resultadoMacros1 = parseFloat(document.getElementById("resultado-macros1").textContent.match(/[\d.]+/g));
    var resultadoMacros2 = parseFloat(document.getElementById("resultado-macros2").textContent.match(/[\d.]+/g));
    var resultadoMacros3 = parseFloat(document.getElementById("resultado-macros3").textContent.match(/[\d.]+/g));

    // Verificando se algum valor é NaN
    if (isNaN(resultadoMacros1) || isNaN(resultadoMacros2) || isNaN(resultadoMacros3)) {
        var resultadoGramas1 = document.getElementById('resultado-gramas1');
        resultadoGramas1.textContent = "Calcule os dados anteriores primeiro.";
        resultadoGramas1.style.color = "red";
        return;
    }
    
    // Calculando as gramas
    var carbogm = resultadoMacros1 / 4;
    var protgm = resultadoMacros2 / 4;
    var lipgm = resultadoMacros3 / 9;

    // Exibindo os resultados
    var resultadoGramas1 = document.getElementById("resultado-gramas1");
    var resultadoGramas2 = document.getElementById("resultado-gramas2");
    var resultadoGramas3 = document.getElementById("resultado-gramas3");

    resultadoGramas1.textContent = 'Carboidratos: ' + carbogm.toFixed(2) + ' g';
    resultadoGramas2.textContent = 'Proteínas: ' + protgm.toFixed(2) + ' g';
    resultadoGramas3.textContent = 'Lipídios: ' + lipgm.toFixed(2) + ' g';
    
    resultadoGramas1.style.color = 'white';
    resultadoGramas2.style.color = 'white';
    resultadoGramas3.style.color = 'white';
}