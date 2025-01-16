function collectFormData(formId) {
    var formData = {};
    
    // Itera sobre todos os elementos do formulário
    $("#" + formId).find("input, textarea").each(function() {
        var inputType = $(this).attr("type");
        var inputName = $(this).attr("name");

        // Pega o valor dependendo do tipo do campo
        if (inputType === "color") {
            formData[inputName] = $(this).val();  // Cor selecionada
        } else if (inputType === "checkbox" || inputType === "radio") {
            formData[inputName] = $(this).is(":checked");  // Se estiver checado
        } else {
            formData[inputName] = $(this).val();  // Para outros tipos (text, number, textarea)
        }
    });
    
    return formData;
}



function getCsfrToken() {
    var csrf_token = $('input[name="csrfmiddlewaretoken"]').val();
    return csrf_token
}

async function ajaxFunction(url, type, data = false) {
    const ajaxOptions = {
        url: url,
        type: type,
        dataType: 'json',
    };

    if (data) {
        ajaxOptions.data = data;
    }

    return $.ajax(ajaxOptions);
}

function formCheckByDict(data) {
    // Preciso enviar um dict com chave com o mesmo valor do id do input que será validado
    let invalidCount = 0;

    $.each(data, (key, value) => {
        const input = $("#" + key);
        const feedback = input.next('.invalid-feedback');

        if (value === "") {
            input.addClass("is-invalid");

            if (feedback.length === 0) {
                input.after('<div class="invalid-feedback">Por favor, preencha este campo.</div>');
            }
            invalidCount++;
        } else {
            input.removeClass("is-invalid");
            if (feedback.length > 0) {
                feedback.remove();
            }
        }
    });

    return invalidCount > 0 ? false : true;
}

function clearFormById(form_id) {
    var form = $('#' + form_id);

    // Limpar campos de texto e e-mail dentro do formulário
    form.find('input[type="text"], input[type="email"]').val('');

    // Limpar selects dentro do formulário
    form.find('select').prop('selectedIndex', 0);

    // Desmarcar todos os checkboxes dentro do formulário
    form.find('input[type="checkbox"]').prop('checked', false);
}


function fillForm(data,formId) {
    const form = $('#' + formId);
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = form.find('#' + key);
            if (element.length) {
                const type = element.attr('type');
                if (type === 'checkbox') {
                    element.prop('checked', data[key]);
                } else {
                    element.val(data[key]);
                }
            }
        }
    }
}

function valueToClipboard(value, element) {
    // Cria um elemento de texto temporário
    var $temp = $("<input>");
    $("body").append($temp);
    // Define o valor do elemento temporário como o valor a ser copiado
    $temp.val(value).select();
    // Executa o comando de cópia
    document.execCommand("copy");
    // Remove o elemento temporário
    $temp.remove();
    
    // Define o texto do tooltip
    $(element).attr('data-original-title', 'Copiado!').tooltip('show');
    
    // Define um timer para esconder o tooltip após 2 segundos
    setTimeout(function() {
        $(element).tooltip('hide');
    }, 2000);
}


function addOrUpdateUrlParameter(paramName, paramValue) {
    var baseUrl = window.location.href; // Obtém a URL atual
    var url = new URL(baseUrl);
    var params = new URLSearchParams(url.search);

    // Verifica se paramValue é um objeto ou array e converte para string JSON
    if (typeof paramValue === 'object') {
        paramValue = JSON.stringify(paramValue);
    }

    // Codifica o valor do parâmetro
    paramValue = encodeURIComponent(paramValue);

    // Adiciona ou atualiza o parâmetro na URL
    params.set(paramName, paramValue);

    // Atualiza a URL sem recarregar a página
    url.search = params.toString();
    window.history.pushState({ path: url.href }, '', url.href);
    return url.search

}

function removeUrlParameter(paramName) {
    var baseUrl = window.location.href; // Obtém a URL atual
    var url = new URL(baseUrl);
    var params = new URLSearchParams(url.search);

    // Remove o parâmetro especificado
    params.delete(paramName);

    // Atualiza a URL sem recarregar a página
    url.search = params.toString();
    window.history.pushState({ path: url.href }, '', url.href);

    return url.search; // Retorna a nova string de consulta da URL
}


function get_parameter(){
    var baseUrl = window.location.href;
    var url = new URL(baseUrl);
    var params = new URLSearchParams(url.search);
    return params.toString()
}


function paramsToDict(queryString){
    
    const params = new URLSearchParams(queryString);

    const paramsObj = {};
    params.forEach((value, key) => {
    paramsObj[key] = value !== 'null' ? value : null;
    });

    return paramsObj
}