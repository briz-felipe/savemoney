async function create_bank(data){
    ajaxFunction(
        'api/create',
        'POST',
        data
    ).then((response)=>{
        if(response.status){
            console.log(response.banks)
            get_banks()
            clearFormById("form-create-bank")
            $('#btn-close-create-bank').click()
            showAlert('Banco criado com sucesso!',true)
        }else{
            if('empty_fields' in response){
                formCheckByDict(response.empty_fields)
            }
            clearFormById("form-create-bank")
            $('#btn-close-create-bank').click()
            showAlert('Ocorreu um erro ao adicionar o banco!',false)
            
        }
    }).catch()
};

async function get_banks(){
    ajaxFunction(
        'api/banks',
        'GET',
    ).then((response)=>{
        if(response.status){
            console.log(response.data)
            create_table_by_repsonse(response.data.bancos)

        }
    })
};

function create_table_by_repsonse(data, empty = true) {
    const table = $("#bank_table")
    if (empty) {
        table.empty();
    }
    for (const bank in data) {
        console.log(data)

        const bank_active = data[bank]['is_active']

        table.append(
            `  
           <div class="col-md-4" style="display: ${bank_active ? 'block' : 'none'};">
    <div class="card p-2 mb-4 shadow-sm rounded">
        <div class="card-body">

            <!-- Cabeçalho do Card -->
            <!-- Botões de Ação -->
            <div class="d-flex justify-content-between mb-2">
                
                <!-- Ícone Dinâmico com Cor -->
                <i class="bi bi-circle-fill" 
                    style="color: ${data[bank]['color']}; font-size: 20px;">
                </i>
            
                <div class="btn-group btn-group-sm" role="group" aria-label="Voucher Actions">
                    <!-- Botão Ver -->
                    <a
                        id="view_voucher_btn"
                        type="button"
                        class="btn btn-outline-secondary"
                        title="Visualizar Voucher"
                        data-bs-toggle="modal"
                        data-bs-target="#view_voucher_modal"
                    >
                        <i class="bi bi-eye-fill"></i>
                    </a>

                    <!-- Botão Editar -->
                    <a
                        id="edit_voucher_btn"
                        type="button"
                        class="btn btn-outline-secondary"
                        title="Editar Voucher"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_voucher_modal"
                    >
                        <i class="bi bi-pencil-fill"></i>
                    </a>

                    <!-- Botão Deletar -->
                    <a
                        id="delete_voucher_btn"
                        type="button"
                        class="btn btn-outline-danger"
                        title="Deletar Voucher"
                        onclick="deleteVoucher(${data[bank]['id']})"
                    >
                        <i class="bi bi-trash-fill"></i>
                    </a>
                </div>
            </div>
            <div class="d-flex justify-content-start mb-4">
            
                <!-- Título do Card -->
                <h3 class="mb-0">${data[bank]['name']}</h3>

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

$(document).ready(()=>{
    var btn_create_bank = $('#btn-create-bank')
    
    get_banks()

    btn_create_bank.click(e=>{
        e.preventDefault();
        const data = collectFormData("form-create-bank")
        create_bank(data).then((response)=>{

        });

    });
});