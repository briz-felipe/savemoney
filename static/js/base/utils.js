function collectFormData(formId) {
    var formData = {};
    const csrf = getCsfrToken();
    formData['csrfmiddlewaretoken'] = csrf;

    // Itera sobre todos os elementos do formulário
    $("#" + formId).find("input, textarea, select").each(function() { // Inclui select
        var inputType = $(this).attr("type");
        var inputName = $(this).attr("name");

        // Pega o valor dependendo do tipo do campo
        if ($(this).is("select")) {
            formData[inputName] = $(this).val();  // Valor selecionado no select
        } else if (inputType === "color") {
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
    console.log(data)
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

    // Certifique-se de que o form é encontrado
    if (form.length === 0) {
        console.error(`Formulário com ID "${form_id}" não encontrado.`);
        return;
    }

    // Limpar campos de texto, e-mail e textarea dentro do formulário
    form.find('input[type="text"], input[type="email"], textarea,input[type="number"]').val('');

    // Limpar selects dentro do formulário
    form.find('select').prop('selectedIndex', 0);

    // Desmarcar todos os checkboxes dentro do formulário
    form.find('input[type="checkbox"]').prop('checked', false);

    console.log(`Formulário com ID "${form_id}" foi limpo.`);
}




function fillForm(data, formId) {
    const form = $('#' + formId);
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = form.find('#' + key);
            if (element.length) {
                const type = element.attr('type');
                if (type === 'checkbox') {
                    element.prop('checked', data[key]);
                } else if (type === 'color') {
                    element.val(data[key] || "#FFFFFF"); // Define valor padrão se não fornecido
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


function showAlert(msg,status){
    const toastAlert = status ? '#successToast' : '#errorToast'
    const toastElement = $(toastAlert)
    const toastMsg = `#${status?'success':'error'}-toast-msg`
    const msgElement = $(toastMsg)
    
    msgElement.html(msg)
    const toast = new bootstrap.Toast(toastElement[0]); // Inicializa o Toast com Bootstrap
    toastElement.show(); // Exibe o elemento Toast
    toast.show(); // Mostra o Toast com Bootstrap
}

// Define o evento no botão dinamicamente
function setEventById(elementId, functionName, data) {
    const element = $("#" + elementId);

    // Montar os parâmetros para a função
    const params = Object.values(data)
        .map((value) => JSON.stringify(value)) // Garantir formatação
        .join(", ");

    // Remover qualquer evento 'click' anterior
    element.off("click");

    // Adicionar o evento 'click'
    element.on("click", function () {
        window[functionName](...Object.values(data));
    });
}

async function get_banks(){
    ajaxFunction(
        'api/banks',
        'GET',
    ).then((response)=>{
        if(response.status){
            create_bank_table(response.data.bancos)

        }
    })
};

function table_card(data,empty){
    const table = $("#cards-tables")
    if (empty) {
        table.empty();
    }
    for (const card in data) {
        table.append(`
        <div class="col-md-4">
            <div class="card p-2 mb-4 shadow-sm rounded">
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-3">
                        
                        <h3 class="mb-0">${data[card]['type']}</h3>
                        <a
                            id="delete_card_btn_${data[card]['id']}"
                            type="button"
                            class="btn btn-outline-danger text-center"
                            title="Deletar bank"
                        >
                            <i class="bi bi-trash-fill"></i>
                        </a>
                    </div>
                    <hr>
                    <div>
                    <small class="text-muted" >${data[card]['name']}</small>
                    </div>
                </div>
            </div>
        </div>    
        `)

    }
    
}

function create_bank_table(data, empty = true) {
    const table = $("#bank_table")
    if (empty) {
        table.empty();
    }
    for (const bank in data) {

        const bank_active = data[bank]['is_active']

        table.append(
            `  
           <div class="col-md-4" style="display: ${bank_active ? 'block' : 'none'};">
    <div class="card p-2 mb-4 shadow-sm rounded">
        <div class="card-body">

            <!-- Cabeçalho do Card -->
            <!-- Botões de Ação -->
            <div class="d-flex justify-content-between mb-3">
                
                <!-- Ícone Dinâmico com Cor -->
                <i class="bi bi-circle-fill" 
                    style="color: ${data[bank]['color']}; font-size: 20px;">
                </i>
            
                <div class="btn-group btn-group-sm" role="group" aria-label="Voucher Actions">
                    <!-- Botão Ver -->
                    <a
                        id="view_bank_${data[bank]['id']}"
                        type="button"
                        class="btn btn-outline-secondary"
                        title="Visualizar banco"
                    >
                        <i class="bi bi-eye-fill"></i>
                    </a>

                    <!-- Botão add card -->
                    <a
                        id="add_card_${data[bank]['id']}"
                        type="button"
                        class="btn btn-outline-secondary icon-circle"
                        title="add cartao"
                    >
                        <!-- <span class="badge">10</span> -->
                        <i class="bi bi-credit-card-2-back-fill"></i>
                    </a>
                    

                    <!-- Botão Editar -->
                    <a
                        id="update_bank_btn_${data[bank]['id']}"
                        type="button"
                        class="btn btn-outline-secondary"
                        title="Editar banco"
                    >
                        <i class="bi bi-pencil-fill"></i>
                    </a>

                    <!-- Botão Deletar -->
                    <a
                        id="delete_bank_btn_${data[bank]['id']}"
                        type="button"
                        class="btn btn-outline-danger"
                        title="Deletar bank"
                    >
                        <i class="bi bi-trash-fill"></i>
                    </a>
                </div>
            </div>
            <div class="d-flex justify-content-between mb-4">

                <!-- Título do Card -->
                <h3 class="mb-0">${data[bank]['name']}</h3>

               <!--  <div class="icon-circle">
                  <i class="bi bi-credit-card-2-back-fill"></i>
                </div> -->
            
            </div>

            <hr>

            <!-- Descrição do Voucher -->
            <div class="mt-3">
                <p class="text-muted">${data[bank]['description']}</p>
            </div>
        </div>
    </div>
</div>
        `
        )
    };

}

async function getCards(bankId){
    const response = await ajaxFunction(
        '/cards/api/'+bankId,
        'POST',
    )
    return response

}

async function createCard(bankId){
    const data = collectFormData("form-create-card")
    const response = await ajaxFunction(
        '/cards/api/create/'+bankId,
        'POST',
        data
    )
    const status = response.status
    if(!status && 'empty_fields' in response){
        formCheckByDict(response.empty_fields)
        return
    }

    clearFormById("form-create-card")
    $('#btn-close-create-card').click()
    showAlert(response.message,status)
    
    return response
}

async function updateBank(bankId){
    const data = collectFormData("form-create-bank")
    const response = await ajaxFunction(
        'api/update/'+bankId,
        'POST',
        data
    )
    const status = response.status
    if(response.status){
        get_banks()
    }

    clearFormById("form-create-bank")
    $('#btn-close-create-bank').click()
    showAlert(response.message,status)
    
    return response
}


async function deleteBank(bankId){
    const csrf_token = getCsfrToken()
    data = {
        "csrfmiddlewaretoken":csrf_token
    }
    const response = await ajaxFunction(
        'api/delete/'+bankId,
        'POST',
        data
    )

    if(response.status){
        get_banks()
        $('#btn-close-delete-bank').click()
        showAlert(response.message,true)
    }
    return response
}

