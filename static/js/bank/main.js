async function create_bank(data){
    ajaxFunction(
        'api/create',
        'POST',
        data
    ).then((response)=>{
        console.log(response)
        if(response.status){
            get_banks()
            clearFormById("form-create-bank")
            $('#btn-close-create-bank').click()
            showAlert('Banco criado com sucesso!',true)
        }else{
           
            if('empty_fields' in response){
                formCheckByDict(response.empty_fields)
            }else{
                clearFormById("form-create-bank")
                $('#btn-close-create-bank').click()
                showAlert(response.error,false)
            }
            
        }
    }).catch()
};

$(document).ready(()=>{
    var btn_create_bank = $('#btn-create-bank')
    
    get_banks()

    $(document).on("click", "[id^='delete_bank_btn_']", function () {
        // Pegar o ID do botão clicado
        const buttonId = $(this).attr("id");

        // Extrair o 'bankid' do final do ID do botão
        const bankId = buttonId.split("_").pop();

        console.log("Botão clicado com bankId:", bankId);

        // Configurar o botão 'btn-delet-bank' dentro da modal com o evento correto
        setEventById("btn-delet-bank", "deleteBank", { id: bankId });

        // Abrir a modal (opcional se não for gerenciado pelo atributo data-bs-toggle)
        $("#deleteBankModal").modal("show");
    });


    $(document).on("click", "[id^='update_bank_btn_']", function () {
        // Pegar o ID do botão clicado
        const buttonId = $(this).attr("id");

        // Extrair o 'bankid' do final do ID do botão
        const bankId = buttonId.split("_").pop();

        // Configurar o botão 'btn-delet-bank' dentro da modal com o evento correto
        setEventById("btn-create-bank", "updateBank", { id: bankId });
        $("#btn-create-bank").html("Atualizar")

        ajaxFunction(
            'api/get/'+bankId,
            'GET',
        ).then(response => {
            console.log(response)
            fillForm(response.data['banco'],'form-create-bank')
        })

        // Abrir a modal (opcional se não for gerenciado pelo atributo data-bs-toggle)
        $("#model-create-bank").modal("show");
    });

    
    

    btn_create_bank.click(e=>{
        e.preventDefault();
        const data = collectFormData("form-create-bank")
        create_bank(data).then((response)=>{

        });

    });
});